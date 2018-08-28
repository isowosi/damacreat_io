import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
import 'package:damacreat_io/src/shared/components.dart';

part 'events.g.dart';

@Generate(
  GenericInputHandlingSystem,
  allOf: [
    Controller,
  ],
)
class ControllerSystem extends _$ControllerSystem {
  WebSocketHandler _webSocketHandler;
  CanvasElement canvas;
  Point<num> offset;

  ControllerSystem(this.canvas, this._webSocketHandler);

  @override
  void initialize() {
    super.initialize();
    canvas.onMouseMove.listen((event) {
      offset = event.offset;
    });
  }

  @override
  void processEntity(Entity entity) {
    if (offset != null) {
      final center = Point<num>(canvas.width / 2, canvas.height / 2);
      final maxDistance = min(canvas.width / 3, canvas.height / 3);
      final distance = center.distanceTo(offset);
      final velocity =
          ByteUtils.speedToByte(100 * min(maxDistance, distance) / maxDistance);
      final angle = ByteUtils.angleToByte(
          tau + atan2(center.y - offset.y, offset.x - center.x));

      _webSocketHandler.sendData(
          Uint8ListWriter.clientToServer(MessageToServer.updateVelocity)
            ..writeUint16(velocity)
            ..writeUint16(angle));
    }
    offset = null;
  }
}

@Generate(
  VoidEntitySystem,
  mapper: [
    Position,
    Size,
    Orientation,
    ConstantVelocity,
  ],
  manager: [
    TagManager,
    IdManager,
    QuadTreeManager,
  ],
)
class WebSocketListeningSystem extends _$WebSocketListeningSystem {
  final _messages = <MessageToClient, List<Uint8ListReader>>{};
  final _undeleted = <int>[];
  final WebSocketHandler _webSocketHandler;
  int playerId;

  WebSocketListeningSystem(this._webSocketHandler) {
    MessageToClient.values.forEach(_storeMessages);
  }

  void _storeMessages(MessageToClient type) {
    _messages[type] = <Uint8ListReader>[];
    _webSocketHandler.on(type).listen((data) => _messages[type].add(data));
  }

  @override
  void processSystem() {
    _undeleted
      ..forEach(idManager.deleteEntity)
      ..clear();
    final messages = _messages.entries.where((entry) => entry.value.isNotEmpty);
    for (final entry in messages) {
      _handleMessages(entry.key, entry.value);
      entry.value.clear();
    }
  }

  void _handleMessages(MessageToClient type, List<Uint8ListReader> readers) {
    switch (type) {
      case MessageToClient.initFood:
        readers.forEach(_initFood);
        break;
      case MessageToClient.initGrowingFood:
        readers.forEach(_initGrowingFood);
        break;
      case MessageToClient.initPlayers:
        readers.forEach(_initPlayers);
        break;
      case MessageToClient.updatePosition:
        readers.forEach(_updatePosition);
        break;
      case MessageToClient.initPlayerId:
        readers.forEach(_initPlayerId);
        break;
      case MessageToClient.removePlayers:
      case MessageToClient.deleteEntities:
        for (final reader in readers) {
          while (reader.hasNext) {
            final id = reader.readUint16();
            if (!idManager.deleteEntity(id)) {
              //entities that have been added and deleted in the same frame
              _undeleted.add(id);
            }
          }
        }
        break;
      case MessageToClient.addConstantVelocity:
        readers.forEach(_updateVelocity);
        break;
      case MessageToClient.startDigestion:
        readers.forEach(_startDigestion);
        break;
    }
    readers.clear();
  }

  void _updatePosition(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = reader.readUint16() / positionFactor;
      final y = reader.readUint16() / positionFactor;
      final entity = idManager.getEntity(id);
      if (entity != null) {
        final position = positionMapper[entity];
        final oldX = position.x;
        final oldY = position.y;
        position
          ..x = x
          ..y = y;
        orientationMapper[entity].angle = atan2(y - oldY, x - oldX);

        if (constantVelocityMapper.has(entity)) {
          entity
            ..removeComponent<Velocity>()
            ..removeComponent<ConstantVelocity>();
        }
        entity
          ..addComponent(ChangedPosition(x, y))
          ..changedInWorld();
      }
    }
  }

  void _initFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final entity = world.createAndAddEntity([
        Id(reader.readUint16()),
        Position(reader.readUint16() / positionFactor,
            reader.readUint16() / positionFactor),
        Size(minFoodSize + reader.readUint8() / foodSizeFactor),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Orientation(0.0),
        Wobble(),
        Food(),
      ]);
      idManager.add(entity);
    }
  }

  void _initGrowingFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final entity = world.createAndAddEntity([
        Id(reader.readUint16()),
        Position(reader.readUint16() / positionFactor,
            reader.readUint16() / positionFactor),
        Size(minFoodSize + reader.readUint8() / foodSizeFactor),
        Growing(minFoodSize + reader.readUint8() / foodSizeFactor,
            minFoodGrowthSpeed * reader.readUint8() / foodGrowthSpeedFactor),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Orientation(0.0),
        Wobble(),
        Food(),
      ]);
      idManager.add(entity);
    }
  }

  void _initPlayers(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      if (id != playerId) {
        world.createAndAddEntity([
          Id(id),
          Position(reader.readUint16() / positionFactor,
              reader.readUint16() / positionFactor),
          Size(20.0),
          Color.fromHsl(random.nextDouble(), 0.9, 0.6, 0.4),
          Orientation(pi / 2),
          Wobble(),
          CellWall(5.0),
          Player(),
        ]);
      } else {
        // skipp position.x and position.y
        reader..readUint16()..readUint16();
      }
    }
  }

  void _initPlayerId(Uint8ListReader reader) {
    playerId = reader.readUint16();
    tagManager.getEntity(playerTag)
      ..addComponent(Id(playerId))
      ..addComponent(Controller())
      ..addComponent(Size(20.0))
      ..addComponent(Color.fromHsl(random.nextDouble(), 0.9, 0.6, 0.4))
      ..addComponent(Orientation(pi / 2))
      ..addComponent(Wobble())
      ..addComponent(CellWall(5.0))
      ..addComponent(Player())
      ..changedInWorld();
  }

  void _updateVelocity(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final speedByte = reader.readUint16();
      final angleByte = reader.readUint16();
      final food = idManager.getEntity(id);
      if (food != null) {
        final value = ByteUtils.byteToSpeed(speedByte);
        final angle = ByteUtils.byteToAngle(angleByte);
        food
          ..addComponent(Velocity(value, angle, 0.0))
          ..addComponent(ConstantVelocity())
          ..removeComponent<DigestedBy>()
          ..changedInWorld();
        print('stop digesting entity $food');
      }
    }
  }

  void _startDigestion(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final digesterId = reader.readUint16();
      final food = idManager.getEntity(id);
      final digester = idManager.getEntity(digesterId);
      if (food != null && digester != null) {
        food
          ..addComponent(DigestedBy(digester))
          ..changedInWorld();
        print('start digesting entity $food');
      }
    }
  }

  @override
  bool checkProcessing() => true;
}
