import 'dart:convert';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/managers/digestion_manager.dart';
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
    BlackHole,
    Player,
  ],
  manager: [
    TagManager,
    IdManager,
    QuadTreeManager,
    ClientDigestionManager,
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

    if (isMessage(type, messageInit)) {
      _initEntities(type, reader);
    } else if (isMessage(type, messageDelete)) {
      _deleteEntities(reader);
    } else {
      _updateEntities(type, reader);
    }
  }

  void _updateEntities(int type, Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final entity = idManager.getEntity(id);

      if (isMessage(type, messagePosition)) {
        final x = ByteUtils.byteToPosition(reader.readUint16());
        final y = ByteUtils.byteToPosition(reader.readUint16());

        positionMapper[entity]
          ..x = x
          ..y = y;
      }

      if (isMessage(type, messageSize)) {
        final radius = ByteUtils.byteToPlayerRadius(reader.readUint16());

        sizeMapper[entity].radius = radius;
      }

      if (isMessage(type, messageOrientation)) {
        final angle = ByteUtils.byteToAngle(reader.readUint16());

        orientationMapper[entity].angle = angle;
      }

      if (isMessage(type, messageVelocity)) {
        final speed = ByteUtils.byteToSpeed(reader.readUint16());
        final angle = ByteUtils.byteToAngle(reader.readUint16());

        final isPlayer = playerMapper.has(entity);
        final speedMultiplier = foodMapper.has(entity)
            ? foodSpeedMultiplier
            : isPlayer
                ? playerSpeedMultiplier
                : blackHoleSpeedMultiplier;

        if (velocityMapper.has(entity)) {
          velocityMapper[entity]
            ..value = speed * speedMultiplier
            ..angle = angle;

          if (isPlayer) {
            if (isMessage(type, messageBoost)) {
              boosterMapper[entity].inUse = true;
            } else {
              boosterMapper[entity].inUse = false;
            }
          }
        } else {
          addComponent(entity, Velocity(speed * speedMultiplier, angle, 0));
        }
      }

      if (isMessage(type, messageReference)) {
        final referenceId = reader.readUint16();
        if (referenceId == noReference) {
          if (foodMapper.has(entity)) {
            removeComponent<DigestedBy>(entity);
            addComponent(entity, ConstantVelocity());
            if (clientDigestionManager.refersTo(entity) != null) {
              clientDigestionManager.removeReference(entity);
            }
          } else if (blackHoleMapper.has(entity)) {
            removeComponent<BlackHoleOwner>(entity);
            if (blackHoleOwnerManager.refersTo(entity) != null) {
              blackHoleOwnerManager.removeReference(entity);
            }
          } else {
            removeComponent<DigestedBy>(entity);
            if (clientDigestionManager.refersTo(entity) != null) {
              clientDigestionManager.removeReference(entity);
            }
          }
        } else {
          final reference = idManager.getEntity(referenceId);
          if (foodMapper.has(entity)) {
            addComponent(entity, DigestedBy());
            removeComponent<ConstantVelocity>(entity);
            removeComponent<Growing>(entity);
            clientDigestionManager.setReference(entity, reference);
          } else {
            addComponent(entity, DigestedBy());
            clientDigestionManager.setReference(entity, reference);
          }
        }
      }
    }
  }

  void _initEntities(int type, Uint8ListReader reader) {
    while (reader.hasNext) {
      final id = reader.readUint16();
      final x = ByteUtils.byteToPosition(reader.readUint16());
      final y = ByteUtils.byteToPosition(reader.readUint16());
      final initType = reader.readUint8();

      if (initType == messageInitTypeSpectator) {
        playerId = id;
        _initSpectator(x, y);
      } else {
        final components = [Id(id), Position(x, y), QuadTreeCandidate()];
        double radius;
        if (initType == messageInitTypePlayer) {
          components.addAll([
            Wobble(),
            CellWall(5),
            Thruster(),
            Velocity(0, 0, 0),
            Booster(boosterMaxStartPower),
            BlackHoleCannon(1),
          ]);

          final hue = ByteUtils.byteToHue(reader.readUint8());
          components.add(Color.fromHsl(hue, 0.9, 0.6, 0.4));

          final utf8nickname = reader.readUint8List();
          final nickname = utf8.decode(utf8nickname);
          components.add(Player(nickname));

          final orientationAngle = ByteUtils.byteToAngle(reader.readUint16());
          components.add(Orientation(orientationAngle));

          radius = ByteUtils.byteToPlayerRadius(reader.readUint16());
          components.add(Size(radius));

          if (playerId == id) {
            components..add(Controller())..add(Camera());
            final camera = tagManager.getEntity(cameraTag);
            tagManager.unregister(cameraTag);
            world.deleteEntity(camera);
          }
        } else if (initType == messageInitTypeFood) {
          radius = reader.readUint8() / foodSizeFactor;

          components.addAll([
            Renderable(sheet, 'food', scale: 1 / foodSpriteRadius),
            Orientation(0),
            Color.fromHsl(0.35, 0.4, 0.4, 1),
            Food(random.nextDouble() * tau, random.nextDouble() * tau,
                random.nextDouble() * tau),
            Size(radius),
          ]);
        } else if (initType == messageInitTypeBlackHole) {
          radius = reader.readUint8() / blackHoleSizeFactor;
          components.addAll([
            BlackHole(),
            Size(radius),
          ]);
        }

        if (isMessage(type, messageVelocity)) {
          final speedMultiplier = initType == messageInitTypeFood
              ? foodSpeedMultiplier
              : blackHoleSpeedMultiplier;
          final velocity =
              ByteUtils.byteToSpeed(reader.readUint16()) * speedMultiplier;
          final angle = ByteUtils.byteToAngle(reader.readUint16());
          components.addAll([
            Velocity(velocity, angle, 0),
            ConstantVelocity(),
          ]);
        }

        int reference;
        if (isMessage(type, messageReference)) {
          final referenceId = reader.readUint16();
          reference = idManager.getEntity(referenceId);
          if (initType == messageInitTypeFood ||
              initType == messageInitTypePlayer) {
            components.add(DigestedBy());
          } else if (initType == messageInitTypeBlackHole) {
            final ownerColor = colorMapper[reference];
            components.addAll([
              Color(ownerColor.r, ownerColor.g, ownerColor.b, 1),
              BlackHoleOwner(),
            ]);
          }
        } else if (initType == messageInitTypeBlackHole) {
          components.add(Color.fromHsl(0.35, 0.4, 0.4, 1));
        }

        if (isMessage(type, messageInitGrowspeed)) {
          if (initType == messageInitTypeFood) {
            components.add(Growing(
                reader.readUint8() / foodSizeFactor,
                minFoodGrowthSpeed *
                    reader.readUint8() /
                    foodGrowthSpeedFactor));
          } else if (initType == messageInitTypeBlackHole) {
            components.add(Growing(
                reader.readUint8() / blackHoleSizeFactor,
                minBlackHoleGrowthSpeed *
                    reader.readUint8() /
                    blackHoleGrowthSpeedFactor));
          }
        }

        final entity = world.createEntity(components);

        idManager.add(entity);

        if (playerId == id) {
          tagManager.register(entity, cameraTag);
        }
        if (isMessage(type, messageReference)) {
          if (initType == messageInitTypeBlackHole) {
            world.addComponent(reference, WhiteHole(radius));
            blackHoleOwnerManager.blackHoleFired(reference, entity);
          } else {
            clientDigestionManager.setReference(entity, reference);
          }
        }
      }
    }
  }

  void _deleteEntities(Uint8ListReader reader) {
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

  void _initSpectator(double posX, double posY) {
    final camera = world.createEntity([
      Position(posX, posY),
      Camera(zoom: initialGameZoom),
    ]);
    tagManager.register(camera, cameraTag);
  }

  @override
  bool checkProcessing() => true;
}
