import 'package:bit_array/bit_array.dart';
import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/shared/managers/attracted_by_manager.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart'
    hide Velocity, Acceleration;

part 'logic.g.dart';

@Generate(
  EntitySystem,
  allOf: [
    Camera,
    Position,
  ],
  manager: [
    CameraManager,
    QuadTreeManager,
    ViewProjectionMatrixManager,
    TagManager,
  ],
)
class OnScreenTagSystem extends _$OnScreenTagSystem {
  BitArray _onScreenEntityIds = BitArray(4096);

  @override
  void begin() {
    if (world.entityManager.activeEntityCount > _onScreenEntityIds.length) {
      _onScreenEntityIds = BitArray(world.entityManager.activeEntityCount);
    } else {
      _onScreenEntityIds.clearAll();
    }
  }

  @override
  void processEntities(Iterable<int> entities) {
    if (entities.isNotEmpty) {
      final cameraEntity = entities.first;
      final inverse = viewProjectionMatrixManager
          .create2dViewProjectionMatrix(cameraEntity)
            ..invert();
      final leftTop = inverse.transformed(Vector4(-1.1, -1.1, 0, 1));
      final rightBottom = inverse.transformed(Vector4(1.1, 1.1, 0, 1));

      quadTreeManager
          .getCollisionCandidates(leftTop.x, leftTop.y,
              width: rightBottom.x - leftTop.x,
              height: rightBottom.y - leftTop.y)
          .forEach(_tag);
    }
  }

  void _tag(int entity) {
    _onScreenEntityIds[entity] = true;
  }

  int get onScreenCount => _onScreenEntityIds.cardinality;

  @override
  bool checkProcessing() => true;

  bool operator [](int entity) => _onScreenEntityIds[entity];
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Lifetime,
  ],
)
class ExpirationSystem extends _$ExpirationSystem {
  @override
  void processEntity(int entity) {
    final l = lifetimeMapper[entity]..timeLeft -= world.delta;
    if (l.timeLeft <= 0) {
      deleteFromWorld(entity);
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Wobble,
  ],
)
class WobbleSystem extends _$WobbleSystem {
  @override
  void processEntity(int entity) {
    final w = wobbleMapper[entity];

    final wobbleFactor = w.wobbleFactor;
    for (var i = 0; i < wobbleFactor.length; i++) {
      wobbleFactor[i] = 0.2 + 0.8 * wobbleFactor[i];
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    CellWall,
  ],
  exclude: [
    DigestedBy,
  ],
)
class CellWallSystem extends _$CellWallSystem {
  @override
  void processEntity(int entity) {
    final cw = cellWallMapper[entity];

    final strengthFactor = cw.strengthFactor;
    for (var i = 0; i < strengthFactor.length; i++) {
      strengthFactor[i] =
          1 + (strengthFactor[i] - 1) * (1 - 0.999 * world.delta);
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    CellWall,
    DigestedBy,
  ],
)
class CellWallDigestedBySystem extends _$CellWallDigestedBySystem {
  @override
  void processEntity(int entity) {
    final cw = cellWallMapper[entity];

    final strengthFactor = cw.strengthFactor;
    for (var i = 0; i < strengthFactor.length; i++) {
      strengthFactor[i] = max(
          0.01, 1.0 + (strengthFactor[i] - 1.1) * (1.0 - 0.999 * world.delta));
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Controller,
    Position,
  ],
  manager: [
    TagManager,
  ],
)
class CameraPositionSystem extends _$CameraPositionSystem {
  @override
  void processEntity(int entity) {
    final position = positionMapper[entity];
    positionMapper[tagManager.getEntity(cameraTag)]
      ..x = position.x
      ..y = position.y;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    CellWall,
    Thruster,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class ThrusterCellWallWeakeningSystem
    extends _$ThrusterCellWallWeakeningSystem {
  @override
  void processEntity(int entity) {
    if (!onScreenTagSystem[entity]) {
      return;
    }
    final leftThrusterIndex = (3 / 8 * playerCircleFragments).truncate();
    final rightThrusterIndex = (5 / 8 * playerCircleFragments).truncate();
    cellWallMapper[entity]
      ..strengthFactor[leftThrusterIndex] = 0.3
      ..strengthFactor[leftThrusterIndex + 1] = 0.3
      ..strengthFactor[rightThrusterIndex] = 0.3
      ..strengthFactor[rightThrusterIndex - 1] = 0.3;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Food,
    Color,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class FoodColoringSystem extends _$FoodColoringSystem {
  @override
  void processEntity(int entity) {
    if (!onScreenTagSystem[entity]) {
      return;
    }
    final food = foodMapper[entity];
    colorMapper[entity]
      ..r = 0.4 + 0.4 * sin(time + food.r)
      ..g = 0.8 + 0.2 * sin(time + food.g)
      ..b = 0.4 + 0.4 * sin(time + food.b);
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Position,
    Velocity,
  ],
  exclude: [
    QuadTreeCandidate,
  ],
)
class MovementSystemWithoutQuadTree extends _$MovementSystemWithoutQuadTree {
  @override
  void processEntity(int entity) {
    final position = positionMapper[entity];
    final velocity = velocityMapper[entity];

    final velocityTimesDelta = velocity.value * world.delta;
    position
      ..x = position.x + velocityTimesDelta * cos(velocity.angle)
      ..y = position.y + velocityTimesDelta * sin(velocity.angle);
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Color,
    ColorChanger,
    Lifetime,
  ],
)
class ColorChangeOverLifetimeSystem extends _$ColorChangeOverLifetimeSystem {
  @override
  void processEntity(int entity) {
    final color = colorMapper[entity];
    final colorChanger = colorChangerMapper[entity];
    final lifeTime = lifetimeMapper[entity];
    final percentLeft = sqrt(lifeTime.timeLeft / lifeTime.timeMax);
    final percentGone = 1 - percentLeft;
    color
      ..r = colorChanger.rStart * percentLeft + colorChanger.rEnd * percentGone
      ..g = colorChanger.gStart * percentLeft + colorChanger.gEnd * percentGone
      ..b = colorChanger.bStart * percentLeft + colorChanger.bEnd * percentGone
      ..a = colorChanger.aStart * percentLeft + colorChanger.aEnd * percentGone;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Acceleration,
    AttractedBy,
    Position,
  ],
  manager: [
    AttractedByManager,
  ],
)
class AttractionAccelerationSystem extends _$AttractionAccelerationSystem {
  @override
  void processEntity(int entity) {
    final attractor = attractedByManager.refersTo(entity);
    final attractorPosition = positionMapper[attractor];
    final position = positionMapper[entity];
    final xDiff = attractorPosition.x - position.x;
    final yDiff = attractorPosition.y - position.y;
    accelerationMapper[entity]
      ..angle = atan2(yDiff, xDiff)
      ..value = 250;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Acceleration,
    Velocity,
    Orientation,
  ],
)
class AccelerationSystem extends _$AccelerationSystem {
  @override
  void processEntity(int entity) {
    final acceleration = accelerationMapper[entity];
    final velocity = velocityMapper[entity];

    final velX = velocity.value * cos(velocity.angle);
    final velY = velocity.value * sin(velocity.angle);
    final velXAcc = acceleration.value * cos(acceleration.angle) * world.delta;
    final velYAcc = acceleration.value * sin(acceleration.angle) * world.delta;
    final velXTotal = velX + velXAcc;
    final velYTotal = velY + velYAcc;

    final angle = atan2(velYTotal, velXTotal);

    velocity
      ..angle = angle
      ..value = sqrt(velXTotal * velXTotal + velYTotal * velYTotal);
    orientationMapper[entity].angle = angle;
  }
}
