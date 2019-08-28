import 'dart:convert';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/client/managers/analytics_manager.dart';
import 'package:damacreat_io/src/shared/managers/black_hole_owner_manager.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
import 'package:damacreat_io/src/shared/components.dart';

part 'web_socket_listening_system.g.dart';

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
    Booster,
    QuadTreeCandidate,
    Color,
  ],
  manager: [
    TagManager,
    IdManager,
    QuadTreeManager,
    DigestionManager,
    GameStateManager,
    AnalyticsManager,
    BlackHoleOwnerManager,
  ],
)
class WebSocketListeningSystem extends _$WebSocketListeningSystem {
  final _messages = <Message>[];
  final WebSocketHandler _webSocketHandler;
  int playerId;
  SpriteSheet sheet;

  WebSocketListeningSystem(this._webSocketHandler, this.sheet);

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
        _initFood(reader, growing: true);
        break;
      case MessageToClient.initBlackHole:
        _initBlackHole(reader);
        break;
      case MessageToClient.initOwnedBlackHole:
        _initBlackHole(reader, owned: true);
        break;
      case MessageToClient.initGrowingBlackHole:
        _initBlackHole(reader, growing: true);
        break;
      case MessageToClient.initOwnedGrowingBlackHole:
        _initBlackHole(reader, owned: true, growing: true);
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
      final entity = idManager.getEntity(id);
      if (id == playerId) {
        gameStateManager.state = GameState.menu;
        final position = positionMapper[entity];
        final camera = world.createEntity([
          Position(position.x, position.y),
          Camera(zoom: initialGameZoom),
        ]);
        tagManager
          ..unregister(cameraTag)
          ..register(camera, cameraTag);
        analyticsManager.deathCount++;
      }
      if (!idManager.deleteEntity(id)) {
        // entities that have been added and deleted in the same frame
        // should no longer be a problem
        // print('tried to delete $id but failed');
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
          world
            ..removeComponent<Velocity>(entity)
            ..removeComponent<ConstantVelocity>(entity);
          final radius = sizeMapper[entity].radius;
          final diameter = radius * 2;
          quadTreeManager.update(
              entity, x - radius, y - radius, diameter, diameter);
        } else if (velocityMapper.has(entity)) {
          // the player
          final dist = sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY));
          final velocity = dist / world.delta;
          velocityMapper[entity]
            ..angle = atan2(y - oldY, x - oldX)
            ..value = velocity
            ..rotational = 0;
          _updateBooster(entity, velocity);
        }
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
          world
            ..removeComponent<Velocity>(entity)
            ..removeComponent<ConstantVelocity>(entity);
          final diameter = radius * 2;
          quadTreeManager.update(
              entity, x - radius, y - radius, diameter, diameter);
        } else if (velocityMapper.has(entity)) {
          // the player
          final dist = sqrt((x - oldX) * (x - oldX) + (y - oldY) * (y - oldY));
          final velocity = dist / world.delta;
          velocityMapper[entity]
            ..angle = atan2(y - oldY, x - oldX)
            ..value = velocity
            ..rotational = 0;
          _updateBooster(entity, velocity);
        }
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
        final velocity = dist / world.delta;
        velocityMapper[entity]
          ..angle = atan2(y - oldY, x - oldX)
          ..value = velocity
          ..rotational = (orientation.angle - oldOrientation) / world.delta;
        _updateBooster(entity, velocity);
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
        final velocity = dist / world.delta;
        velocityMapper[entity]
          ..angle = atan2(y - oldY, x - oldX)
          ..value = velocity
          ..rotational = (orientation.angle - oldOrientation) / world.delta;
        _updateBooster(entity, velocity);
      }
    }
  }

  void _initFood(Uint8ListReader reader, {bool growing = false}) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final radius = reader.readUint8() / foodSizeFactor;
      final entity = world.createEntity([
        Id(id),
        Position(x, y),
        Size(radius),
        if (growing)
          Growing(reader.readUint8() / foodSizeFactor,
              minFoodGrowthSpeed * reader.readUint8() / foodGrowthSpeedFactor),
        Color.fromHsl(0.35, 0.4, 0.4, 1),
        Food(random.nextDouble() * tau, random.nextDouble() * tau,
            random.nextDouble() * tau),
        Renderable(sheet, 'food', scale: 1 / foodSpriteRadius),
        Orientation(0),
        QuadTreeCandidate(),
      ]);
      idManager.add(entity);
    }
  }

  void _initBlackHole(Uint8ListReader reader,
      {bool owned = false, bool growing = false}) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      var ownerId = -1;
      int owner;
      Color color;
      if (owned) {
        ownerId = reader.readUint16();
        owner = idManager.getEntity(ownerId);
        final ownerColor = colorMapper[owner];
        color = Color(ownerColor.r, ownerColor.g, ownerColor.b, 1);
      } else {
        color = Color.fromHsl(0.35, 0.4, 0.4, 1);
      }
      final velocity =
          ByteUtils.byteToSpeed(reader.readUint16()) * blackHoleSpeedMultiplier;
      final angle = ByteUtils.byteToAngle(reader.readUint16());
      final radius = reader.readUint8() / blackHoleSizeFactor;
      final blackHole = world.createEntity([
        Id(id),
        Position(x, y),
        Velocity(velocity, angle, 0),
        ConstantVelocity(),
        Size(radius),
        if (growing)
          Growing(
              reader.readUint8() / blackHoleSizeFactor,
              minBlackHoleGrowthSpeed *
                  reader.readUint8() /
                  blackHoleGrowthSpeedFactor),
        if (owned) BlackHoleOwner(),
        color,
        BlackHole(),
        QuadTreeCandidate(),
      ]);
      idManager.add(blackHole);
      if (owned) {
        world.addComponent(owner, WhiteHole(radius));
        blackHoleOwnerManager.blackHoleFired(owner, blackHole);
      }
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
        Size(playerRadius),
        Color.fromHsl(hue, 0.9, 0.6, 0.4),
        Orientation(orientationAngle),
        Wobble(),
        CellWall(5),
        Thruster(),
        Velocity(0, 0, 0),
        Booster(boosterMaxStartPower),
        BlackHoleCannon(1),
        Player(nickname),
        QuadTreeCandidate(),
      ];
      if (playerId == id) {
        playerComponents..add(Controller())..add(Camera());
        final camera = tagManager.getEntity(cameraTag);
        tagManager.unregister(cameraTag);
        world.deleteEntity(camera);
      }
      final entity = world.createEntity(playerComponents);
      if (playerId == id) {
        tagManager.register(entity, cameraTag);
      }
      idManager.add(entity);
    }
  }

  void _initPlayerId(Uint8ListReader reader) {
    playerId = reader.readUint16();
    final posX = ByteUtils.byteToPosition(reader.readUint16());
    final posY = ByteUtils.byteToPosition(reader.readUint16());
    final camera = world.createEntity([
      Position(posX, posY),
      Camera(zoom: initialGameZoom),
    ]);
    tagManager.register(camera, cameraTag);
  }

  void _updateVelocity(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final speedByte = reader.readUint16();
      final angleByte = reader.readUint16();
      final entity = idManager.getEntity(id);
      if (entity != null) {
        final value = ByteUtils.byteToSpeed(speedByte);
        final angle = ByteUtils.byteToAngle(angleByte);
        if (digestedByMapper.has(entity)) {
          digestionManager.removeReference(entity);
        }
        // no constant velocity for players
        if (foodMapper.has(entity)) {
          world
            ..addComponent(
                entity, Velocity(value * foodSpeedMultiplier, angle, 0))
            ..addComponent(entity, ConstantVelocity());
        } else {
          _updateBooster(
              entity,
              value *
                  playerSpeedMultiplier *
                  getVelocityFactor(sizeMapper[entity]));
        }
      }
    }
  }

  void _updateBooster(int entity, double value) {
    if (boosterMapper.has(entity)) {
      boosterMapper[entity].inUse = value >
          1.25 * playerSpeedMultiplier * getVelocityFactor(sizeMapper[entity]);
    }
  }

  void _startDigestion(Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final digesterId = reader.readUint16();
      final food = idManager.getEntity(id);
      final digester = idManager.getEntity(digesterId);
      if (food != null && digester != null) {
        digestionManager.setReference(food, digester);
        world.removeComponent<Growing>(food);
      }
    }
  }

  @override
  bool checkProcessing() => true;
}
