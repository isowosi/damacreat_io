import 'dart:convert';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
import 'package:damacreat_io/src/shared/components.dart';

part 'events.g.dart';

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
    ChangedPosition,
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
      case MessageToClient.updatePlayerPositionAndVelocity:
        _updatePlayerPositionAndVelocity(reader);
        break;
      case MessageToClient.updatePositionAndSize:
        _updatePositionAndSize(reader);
        break;
      case MessageToClient.updatePlayerPositionAndVelocityAndSize:
        _updatePlayerPositionAndVelocityAndSize(reader);
        break;
      case MessageToClient.initPlayerId:
        _initPlayerId(reader);
        break;
      case MessageToClient.removePlayers:
      case MessageToClient.deleteEntities:
        _deleteEntity(reader);
        break;
      case MessageToClient.addConstantVelocity:
        _addConstantVelocity(reader);
        break;
      case MessageToClient.vomit:
        _vomitFood(reader);
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
        print('tried to delete $id but failed');
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
        positionMapper[entity]
          ..x = x
          ..y = y;
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
        positionMapper[entity]
          ..x = x
          ..y = y;
      }
    }
  }

  void _updatePlayerPositionAndVelocity(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final velocityValue = ByteUtils.byteToPlayerSpeed(reader.readUint16());
      final velocityAngle = ByteUtils.byteToAngle(reader.readUint16());
      final entity = idManager.getEntity(id);
      if (entity != null) {
        final position = positionMapper[entity];
        final orientation = orientationMapper[entity];
        final velocity = velocityMapper[entity];
        position
          ..x = x
          ..y = y;
        velocity
          ..value = velocityValue
          ..angle = velocityAngle
          ..rotational = (velocityAngle - orientation.angle) / world.delta;
        orientation.angle = velocityAngle;
      }
    }
  }

  void _updatePlayerPositionAndVelocityAndSize(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final velocityValue = ByteUtils.byteToPlayerSpeed(reader.readUint16());
      final velocityAngle = ByteUtils.byteToAngle(reader.readUint16());
      final radius = ByteUtils.byteToPlayerRadius(reader.readUint16());
      final entity = idManager.getEntity(id);
      if (entity != null) {
        sizeMapper[entity].radius = radius;
        final position = positionMapper[entity];
        final orientation = orientationMapper[entity];
        final velocity = velocityMapper[entity];
        position
          ..x = x
          ..y = y;
        velocity
          ..value = velocityValue
          ..angle = velocityAngle
          ..rotational = (velocityAngle - orientation.angle) / world.delta;
        orientation.angle = velocityAngle;
      }
    }
  }

  void _initFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final radius = reader.readUint8() / foodSizeFactor;
      final entity = world.createAndAddEntity([
        Id(id),
        Position(x, y),
        Size(radius),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Food(random.nextDouble() * tau, random.nextDouble() * tau,
            random.nextDouble() * tau),
        Renderable('food', scale: 1 / foodSpriteRadius),
        Orientation(0.0),
        QuadTreeCandidate(),
      ]);
      idManager.add(entity);
    }
  }

  void _initGrowingFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final radius = reader.readUint8() / foodSizeFactor;
      final targetRadius = reader.readUint8() / foodSizeFactor;
      final entity = world.createAndAddEntity([
        Id(id),
        Position(x, y),
        Size(radius),
        Growing(targetRadius,
            minFoodGrowthSpeed * reader.readUint8() / foodGrowthSpeedFactor),
        Color.fromHsl(0.35, 0.4, 0.4, 1.0),
        Food(random.nextDouble() * tau, random.nextDouble() * tau,
            random.nextDouble() * tau),
        Renderable('food', scale: 1 / foodSpriteRadius),
        Orientation(0.0),
        QuadTreeCandidate(),
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
        Booster(boosterMaxStartPower),
        Player(nickname),
        QuadTreeCandidate(),
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

  void _addConstantVelocity(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final speedByte = reader.readUint16();
      final angleByte = reader.readUint16();
      final food = idManager.getEntity(id);
      if (food != null) {
        final value = ByteUtils.byteToFoodSpeed(speedByte);
        final angle = ByteUtils.byteToAngle(angleByte);
        food
          ..addComponent(Velocity(value, angle, 0.0))
          ..addComponent(ConstantVelocity())
          ..changedInWorld();
      }
    }
  }

  void _vomitFood(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final speedByte = reader.readUint16();
      final angleByte = reader.readUint16();
      final food = idManager.getEntity(id);
      if (food != null) {
        final value = ByteUtils.byteToFoodSpeed(speedByte);
        final angle = ByteUtils.byteToAngle(angleByte);
        positionMapper[food]
          ..x = x
          ..y = y;
        final digester = digestedByMapper[food].digester;
        digestionManager.vomit(digester, food, RuntimeEnvironment.client);
        food
          ..addComponent(Velocity(value, angle, 0.0))
          ..addComponent(ConstantVelocity())
          ..changedInWorld();
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
