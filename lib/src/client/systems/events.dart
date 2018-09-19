import 'dart:convert';
import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
import 'package:damacreat_io/src/shared/components.dart';

part 'events.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Controller,
  ],
  manager: [
    GameStateManager,
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
    canvas.onTouchMove.listen((event) {
      offset = event.touches.last.page;
    });
    canvas.onTouchStart.listen((event) {
      offset = event.touches.last.page;
      event.preventDefault();
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

  @override
  bool checkProcessing() => gameStateManager.state == GameState.playing;
}

@Generate(
  VoidEntitySystem,
  mapper: [
    Position,
    Size,
    Orientation,
    ConstantVelocity,
    DigestedBy,
    Velocity,
    Food,
  ],
  manager: [
    TagManager,
    IdManager,
    QuadTreeManager,
    DigestionManager,
    GameStateManager,
  ],
)
class WebSocketListeningSystem extends _$WebSocketListeningSystem {
  final _messages = <Message>[];
  final WebSocketHandler _webSocketHandler;
  int playerId;

  WebSocketListeningSystem(this._webSocketHandler);

  @override
  void initialize() {
    super.initialize();
    _webSocketHandler.on.listen(_messages.add);
    _webSocketHandler
        .sendData(Uint8ListWriter.clientToServer(MessageToServer.ping));
  }

  @override
  void processSystem() {
    _messages
      ..forEach(_handleMessage)
      ..clear();
  }

  void _handleMessage(Message message) {
    final type = message.type;
    final reader = message.reader;
    switch (type) {
      case MessageToClient.initFood:
        _initFood(reader);
        break;
      case MessageToClient.initGrowingFood:
        _initGrowingFood(reader);
        break;
      case MessageToClient.initPlayers:
        _initPlayers(reader);
        break;
      case MessageToClient.updatePosition:
        _updatePosition(reader);
        break;
      case MessageToClient.updatePositionAndOrientation:
        _updatePositionAndOrientation(reader);
        break;
      case MessageToClient.updatePositionAndSize:
        _updatePositionAndSize(reader);
        break;
      case MessageToClient.updatePositionAndOrientationAndSize:
        _updatePositionAndOrientationAndSize(reader);
        break;
      case MessageToClient.initPlayerId:
        _initPlayerId(reader);
        break;
      case MessageToClient.removePlayers:
      case MessageToClient.deleteEntities:
        _deleteEntity(reader);
        break;
      case MessageToClient.addConstantVelocity:
      case MessageToClient.vomit:
        _updateVelocity(reader);
        break;
      case MessageToClient.startDigestion:
        _startDigestion(reader);
        break;
      case MessageToClient.pong:
        break;
    }
  }

  void _deleteEntity(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      if (!idManager.deleteEntity(id, RuntimeEnvironment.client)) {
        // entities that have been added and deleted in the same frame
        // should no longer be a problem
        throw StateError('ErrorCode: 42 - existential crisis');
      }
      if (id == playerId) {
        gameStateManager.state = GameState.menu;
      }
    }
  }

  void _updatePosition(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final entity = idManager.getEntity(id);
      if (entity != null) {
        final position = positionMapper[entity];
        final oldX = position.x;
        final oldY = position.y;
        position
          ..x = x
          ..y = y;

        if (constantVelocityMapper.has(entity)) {
          // moving food that was caught by a player
          entity
            ..removeComponent<Velocity>()
            ..removeComponent<ConstantVelocity>();
        } else if (velocityMapper.has(entity)) {
          // the player
          final dist = sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY));
          velocityMapper[entity]
            ..angle = atan2(y - oldY, x - oldX)
            ..value = dist / world.delta
            ..rotational = 0.0;
        }
        entity
          ..addComponent(ChangedPosition(x, y))
          ..changedInWorld();
      }
    }
  }

  void _updatePositionAndSize(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final radius = ByteUtils.byteToPlayerRadius(reader.readUint16());
      final entity = idManager.getEntity(id);
      if (entity != null) {
        sizeMapper[entity].radius = radius;
        final position = positionMapper[entity];
        final oldX = position.x;
        final oldY = position.y;
        position
          ..x = x
          ..y = y;

        if (constantVelocityMapper.has(entity)) {
          // moving food that was caught by a player
          entity
            ..removeComponent<Velocity>()
            ..removeComponent<ConstantVelocity>();
        } else if (velocityMapper.has(entity)) {
          // the player
          final dist = sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY));
          velocityMapper[entity]
            ..angle = atan2(y - oldY, x - oldX)
            ..value = dist / world.delta
            ..rotational = 0.0;
        }
        entity
          ..addComponent(ChangedPosition(x, y))
          ..changedInWorld();
      }
    }
  }

  void _updatePositionAndOrientation(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final orientationAngle = ByteUtils.byteToAngle(reader.readUint16());
      final entity = idManager.getEntity(id);
      if (entity != null) {
        final position = positionMapper[entity];
        final orientation = orientationMapper[entity];
        final oldX = position.x;
        final oldY = position.y;
        final oldOrientation = orientation.angle;
        position
          ..x = x
          ..y = y;
        orientation.angle = orientationAngle;

        final dist = sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY));
        velocityMapper[entity]
          ..angle = atan2(y - oldY, x - oldX)
          ..value = dist / world.delta
          ..rotational = (orientation.angle - oldOrientation) / world.delta;
        entity
          ..addComponent(ChangedPosition(x, y))
          ..changedInWorld();
      }
    }
  }

  void _updatePositionAndOrientationAndSize(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final orientationAngle = ByteUtils.byteToAngle(reader.readUint16());
      final radius = ByteUtils.byteToPlayerRadius(reader.readUint16());
      final entity = idManager.getEntity(id);
      if (entity != null) {
        sizeMapper[entity].radius = radius;
        final position = positionMapper[entity];
        final orientation = orientationMapper[entity];
        final oldX = position.x;
        final oldY = position.y;
        final oldOrientation = orientation.angle;
        position
          ..x = x
          ..y = y;
        orientation.angle = orientationAngle;

        final dist = sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY));
        velocityMapper[entity]
          ..angle = atan2(y - oldY, x - oldX)
          ..value = dist / world.delta
          ..rotational = (orientation.angle - oldOrientation) / world.delta;
        entity
          ..addComponent(ChangedPosition(x, y))
          ..changedInWorld();
      }
    }
  }

  void _initFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final entity = world.createAndAddEntity([
        Id(id),
        Position(ByteUtils.byteToPosition(reader.readUint16()),
            ByteUtils.byteToPosition(reader.readUint16())),
        Size(reader.readUint8() / foodSizeFactor),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Food(random.nextDouble() * tau, random.nextDouble() * tau,
            random.nextDouble() * tau),
      ]);
      idManager.add(entity);
    }
  }

  void _initGrowingFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final entity = world.createAndAddEntity([
        Id(id),
        Position(ByteUtils.byteToPosition(reader.readUint16()),
            ByteUtils.byteToPosition(reader.readUint16())),
        Size(reader.readUint8() / foodSizeFactor),
        Growing(reader.readUint8() / foodSizeFactor,
            minFoodGrowthSpeed * reader.readUint8() / foodGrowthSpeedFactor),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Food(random.nextDouble() * tau, random.nextDouble() * tau,
            random.nextDouble() * tau),
      ]);

      idManager.add(entity);
    }
  }

  void _initPlayers(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final orientationAngle = ByteUtils.byteToAngle(reader.readUint16());
      final playerRadius = ByteUtils.byteToPlayerRadius(reader.readUint16());
      final hue = ByteUtils.byteToHue(reader.readUint8());
      final utf8nickname = reader.readUint8List();
      final nickname = utf8.decode(utf8nickname);
      final playerComponents = [
        Id(id),
        Position(x, y),
        ChangedPosition(x, y),
        Size(playerRadius),
        Color.fromHsl(hue, 0.9, 0.6, 0.4),
        Orientation(orientationAngle),
        Wobble(),
        CellWall(5.0),
        Thruster(),
        Velocity(0.0, 0.0, 0.0),
        Player(nickname),
      ];
      if (playerId == id) {
        playerComponents.add(Controller());
      }
      final entity = world.createAndAddEntity(playerComponents);
      idManager.add(entity);
    }
  }

  void _initPlayerId(Uint8ListReader reader) {
    playerId = reader.readUint16();
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
        if (digestedByMapper.has(food)) {
          final digester = digestedByMapper[food].digester;
          digestionManager.vomit(digester, food, RuntimeEnvironment.client);
        }
        // no constant velocity for players
        if (foodMapper.has(food)) {
          food
            ..addComponent(Velocity(value, angle, 0.0))
            ..addComponent(ConstantVelocity())
            ..changedInWorld();
        }
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
          ..removeComponent<Growing>()
          ..changedInWorld();
        digestionManager.startDigestion(digester, food);
      }
    }
  }

  @override
  bool checkProcessing() => true;
}
