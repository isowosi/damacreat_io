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
    ComponentManager,
  ],
)
class OnScreenTagSystem extends _$OnScreenTagSystem {
  @override
  void processEntities(Iterable<Entity> entities) {
    if (entities.isNotEmpty) {
      final cameraEntity = entities.first;
      final inverse = viewProjectionMatrixManager
          .create2dViewProjectionMatrix(cameraEntity)
            ..invert();
      final leftTop = inverse.transformed(Vector4(-1, -1, 0, 1));
      final rightBottom = inverse.transformed(Vector4(1, 1, 0, 1));

      quadTreeManager
          .getCollisionCandidates(leftTop.x, leftTop.y,
              width: rightBottom.x - leftTop.x,
              height: rightBottom.y - leftTop.y)
          .forEach(_tag);
    }
  }

  void _tag(Entity entity) {
    entity
      ..addComponent(OnScreen())
      ..changedInWorld();
  }

  @override
  bool checkProcessing() => true;
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Food,
    Size,
    Growing,
  ],
  exclude: [
    DigestedBy,
  ],
)
class FoodGrowingSystem extends _$FoodGrowingSystem {
  @override
  void processEntity(Entity entity) {
    final s = sizeMapper[entity];
    final g = growingMapper[entity];

    s.radius += g.speed * world.delta;

    if (s.radius >= g.targetRadius) {
      s.radius = g.targetRadius;
      entity
        ..removeComponent<Growing>()
        ..changedInWorld();
    }
  }
}

@Generate(
  EntityProcessingSystem,
  oneOf: [
    ChangedPosition,
    OnScreen,
  ],
)
class RemoveTemporaryComponentsSystem
    extends _$RemoveTemporaryComponentsSystem {
  @override
  void processEntity(Entity entity) {
    entity
      ..removeComponent<ChangedPosition>()
      ..removeComponent<OnScreen>()
      ..changedInWorld();
  }
}

@Generate(
  BaseDigestiveSystem,
  manager: [
    AttractedByManager,
  ],
  allOf: [
    Position,
    OnScreen,
  ],
  mapper: [
    Color,
  ],
  exclude: [
    DigestionComplete,
  ],
)
class DigestiveSystem extends _$DigestiveSystem {
  @override
  void onDigestionComplete(Entity digester, Entity food) {
    food
      ..addComponent(DigestionComplete())
      ..changedInWorld();
  }

  @override
  void onDigestionInProgress(Entity digester, Entity food) {
    final foodPosition = positionMapper[food];
    final foodSize = sizeMapper[food];
    final digesterColor = colorMapper[digester];
    final foodColor = colorMapper[food];
    final foodRadius = foodSize.radius;
    for (var i = 0; i < foodRadius / 2; i++) {
      final angle = random.nextDouble() * tau;
      final entity = world.createAndAddEntity([
        Renderable('digestion'),
        Position(foodPosition.x + foodRadius * cos(angle),
            foodPosition.y + foodRadius * sin(angle)),
        Velocity(foodRadius, angle, 0),
        Orientation(angle),
        Acceleration(0, 0),
        Size(min(1.5, foodRadius / 10)),
        Color(foodColor.r, foodColor.g, foodColor.b, foodColor.a),
        ColorChanger(foodColor.r, foodColor.g, foodColor.b, foodColor.a,
            digesterColor.r, digesterColor.g, digesterColor.b, digesterColor.a),
        Lifetime(0.5)
      ]);
      attractedByManager.setReference(entity, digester);
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Lifetime,
  ],
)
class ExpirationSystem extends _$ExpirationSystem {
  @override
  void processEntity(Entity entity) {
    final l = lifetimeMapper[entity]..timeLeft -= world.delta;
    if (l.timeLeft <= 0) {
      entity.deleteFromWorld();
    }
  }
}

@Generate(
  BaseEntityInteractionSystem,
  allOf: [
    Wobble,
    CellWall,
    Orientation,
    OnScreen,
  ],
  manager: [
    TagManager,
  ],
)
class EntityInteractionSystem extends _$EntityInteractionSystem {
  double angleToSegmentFactor = playerCircleFragments / (2 * pi);

  @override
  void startDigestion(Entity player, Entity food, double dist, double distX,
      double distY, double playerRadius, double foodRadius) {
    final colliderOrientation = orientationMapper[player];
    final angle = atan2(distY, distX) - colliderOrientation.angle;
    final fragment = (angle * angleToSegmentFactor).round();
    final sizeRelation = foodRadius / playerRadius;
    final fragmentRange = getFragmentRange(sizeRelation);
    final colliderWobble = wobbleMapper[player];
    final additionalDistRelation =
        (dist + foodRadius - playerRadius) / playerRadius;
    for (var i = -fragmentRange + 1; i <= fragmentRange; i++) {
      final fragmentIndex = (fragment + i) % playerCircleFragments;
      final old = colliderWobble.wobbleFactor[fragmentIndex];
      colliderWobble.wobbleFactor[fragmentIndex] = max(
          old,
          1 +
              additionalDistRelation *
                  (1 - i * i / (fragmentRange * fragmentRange)));
    }
  }

  int getFragmentRange(double sizeRelation) =>
      (sizeRelation * playerCircleFragments ~/ 4).round();

  @override
  void touch(Entity player, Entity food, double dist, double distX,
      double distY, double playerRadius, double foodRadius) {
    final colliderOrientation = orientationMapper[player];
    final angle = atan2(distY, distX) - colliderOrientation.angle;
    final fragment = (angle * angleToSegmentFactor).round();
    final sizeRelation = foodRadius / playerRadius;
    final fragmentRange = getFragmentRange(sizeRelation);
    final colliderWobble = wobbleMapper[player];
    final distRelation = (playerRadius + foodRadius - dist) / foodRadius;
    final colliderCellWall = cellWallMapper[player];
    final fragmentRangePow3 = fragmentRange * fragmentRange * fragmentRange;
    final fragmentRangePow4 = fragmentRangePow3 * fragmentRange;
    for (var index = -fragmentRange + 1; index <= fragmentRange; index++) {
      final fragmentIndex = (fragment + index) % playerCircleFragments;
      final old = colliderWobble.wobbleFactor[fragmentIndex];
      final indexSq = index * index;
      colliderWobble.wobbleFactor[fragmentIndex] = min(
          old,
          1 -
              sizeRelation *
                  distRelation *
                  (1 - indexSq * indexSq / fragmentRangePow4));
      colliderCellWall.strengthFactor[fragmentIndex] =
          1 - distRelation * (1 - (indexSq * index).abs() / fragmentRangePow3);
    }
  }

  @override
  void almostDigestion(Entity player, Entity food, double dist, double distX,
      double distY, double playerRadius, double foodRadius) {
    final colliderOrientation = orientationMapper[player];
    final angle = atan2(distY, distX) - colliderOrientation.angle;
    final fragment = (angle * angleToSegmentFactor).round();
    final sizeRelation = foodRadius / playerRadius;
    final fragmentRange = getFragmentRange(sizeRelation);
    final colliderWobble = wobbleMapper[player];
    final distRelation = (playerRadius + foodRadius - dist) / foodRadius;
    final colliderCellWall = cellWallMapper[player];
    final additionalDistRelation =
        (dist + foodRadius - playerRadius) / playerRadius;
    final fragmentRangePow2 = fragmentRange * fragmentRange;
    final fragmentRangePow3 = fragmentRangePow2 * fragmentRange;
    final fragmentRangePow4 = fragmentRangePow3 * fragmentRange;
    var pressingEnvelopedRatio =
        (playerRadius + foodRadius - dist - foodRadius / 2) / (foodRadius / 2);
    pressingEnvelopedRatio *= pressingEnvelopedRatio;
    for (var index = -fragmentRange + 1; index <= fragmentRange; index++) {
      final fragmentIndex = (fragment + index) % playerCircleFragments;
      final old = colliderWobble.wobbleFactor[fragmentIndex];
      final indexSq = index * index;
      final enveloped = max(
          old, 1 + additionalDistRelation * (1 - indexSq / fragmentRangePow2));
      final pressing = min(
          old,
          1 -
              sizeRelation *
                  distRelation *
                  (1 - indexSq * indexSq / fragmentRangePow4));

      colliderWobble.wobbleFactor[fragmentIndex] =
          pressingEnvelopedRatio * enveloped +
              (1 - pressingEnvelopedRatio) * pressing;
      colliderCellWall.strengthFactor[fragmentIndex] =
          1 - distRelation * (1 - (indexSq * index).abs() / fragmentRangePow3);
    }
  }

  @override
  void onFleeingAttempt(Entity player, Entity food, double dist, double distX,
      double distY, double playerRadius, double foodRadius) {
    final colliderOrientation = orientationMapper[player];
    final angle = atan2(distY, distX) - colliderOrientation.angle;
    final fragment = (angle * angleToSegmentFactor).round();
    final sizeRelation = foodRadius / playerRadius;
    final fragmentRange = getFragmentRange(sizeRelation);
    final colliderWobble = wobbleMapper[player];
    final colliderCellWall = cellWallMapper[player];
    final additionalDistRelation =
        (dist + foodRadius - playerRadius) / playerRadius;
    final fragmentRangePow3 = fragmentRange * fragmentRange * fragmentRange;
    for (var index = -fragmentRange + 1; index <= fragmentRange; index++) {
      final fragmentIndex = (fragment + index) % playerCircleFragments;
      final old = colliderWobble.wobbleFactor[fragmentIndex];
      final indexPow3 = index * index * index;
      colliderWobble.wobbleFactor[fragmentIndex] = max(
          old,
          1 +
              additionalDistRelation *
                  (1 - indexPow3.abs() / fragmentRangePow3));
      colliderCellWall.strengthFactor[fragmentIndex] = 1 -
          additionalDistRelation * (1 - indexPow3.abs() / fragmentRangePow3);
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
  void processEntity(Entity entity) {
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
  void processEntity(Entity entity) {
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
  void processEntity(Entity entity) {
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
    Position,
    ChangedPosition,
    Orientation,
    Thruster,
    Velocity,
    Size,
    Color,
    Wobble,
    OnScreen,
    Booster,
  ],
)
class ThrusterParticleEmissionSystem extends _$ThrusterParticleEmissionSystem {
  @override
  void processEntity(Entity entity) {
    final p = positionMapper[entity];
    final op = changedPositionMapper[entity];
    final o = orientationMapper[entity];
    final v = velocityMapper[entity];
    final s = sizeMapper[entity];
    final c = colorMapper[entity];
    final w = wobbleMapper[entity];
    final boosterFactor = boosterMapper[entity].inUse ? 1.5 : 1.0;
    final oldAngle = o.angle - v.rotational * world.delta;

    final leftThrusterAngle = o.angle + 3 / 4 * pi;
    final rightThrusterAngle = o.angle - 3 / 4 * pi;
    final oldLeftThrusterAngle = oldAngle + 3 / 4 * pi;
    final oldRightThrusterAngle = oldAngle - 3 / 4 * pi;

    spawnThrusterParticles(p, op, s, v, c, leftThrusterAngle,
        oldLeftThrusterAngle, o, w, 1, boosterFactor);
    spawnThrusterParticles(p, op, s, v, c, rightThrusterAngle,
        oldRightThrusterAngle, o, w, -1, boosterFactor);
  }

  void spawnThrusterParticles(
      Position position,
      ChangedPosition oldPosition,
      Size size,
      Velocity velocity,
      Color color,
      double thrusterAngle,
      double oldThrusterAngle,
      Orientation orientation,
      Wobble wobble,
      int direction,
      double boosterFactor) {
    double w1, w2;
    if (direction == 1) {
      final leftThrusterIndex = (3 / 8 * playerCircleFragments).truncate();
      w1 = wobble.wobbleFactor[leftThrusterIndex];
      w2 = wobble.wobbleFactor[leftThrusterIndex + 1];
    } else {
      final rightThrusterIndex = (5 / 8 * playerCircleFragments).truncate();
      w1 = wobble.wobbleFactor[rightThrusterIndex];
      w2 = wobble.wobbleFactor[rightThrusterIndex - 1];
    }

    final x1 = position.x + size.radius * 1.1 * cos(thrusterAngle) * w1;
    final y1 = position.y + size.radius * 1.1 * sin(thrusterAngle) * w1;
    final oldX1 =
        oldPosition.oldX + size.radius * 1.1 * cos(oldThrusterAngle) * w1;
    final oldY1 =
        oldPosition.oldY + size.radius * 1.1 * sin(oldThrusterAngle) * w1;
    final x2 = position.x +
        size.radius *
            cos(thrusterAngle + direction / (playerCircleFragments ~/ 2) * pi) *
            w2;
    final y2 = position.y +
        size.radius *
            sin(thrusterAngle + direction / (playerCircleFragments ~/ 2) * pi) *
            w2;
    final oldX2 = oldPosition.oldX +
        size.radius *
            cos(oldThrusterAngle +
                direction / (playerCircleFragments ~/ 2) * pi) *
            w2;
    final oldY2 = oldPosition.oldY +
        size.radius *
            sin(oldThrusterAngle +
                direction / (playerCircleFragments ~/ 2) * pi) *
            w2;

    final hsl = rgbToHsl(color.r, color.g, color.b);
    hsl[1] += 0.1;
    hsl[2] += 0.1;
    final rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    for (var i = 0; i < 4 * boosterFactor; i++) {
      final posFactor = random.nextDouble();
      final posFactorTime = random.nextDouble();
      final x = x1 + posFactor * (x2 - x1);
      final y = y1 + posFactor * (y2 - y1);
      final oldX = oldX1 + posFactor * (oldX2 - oldX1);
      final oldY = oldY1 + posFactor * (oldY2 - oldY1);
      world.createAndAddEntity([
        Position(
            x + posFactorTime * (oldX - x), y + posFactorTime * (oldY - y)),
        ThrusterParticle(),
        Color(rgb[0], rgb[1], rgb[2], 1),
        Lifetime(boosterFactor * (0.5 + 1 * random.nextDouble())),
        Velocity(playerSpeedMultiplier * (0.05 + random.nextDouble() * 0.1),
            (velocity.angle - pi) - pi / 64 + random.nextDouble() * pi / 32, 0),
        Orientation(velocity.angle),
        Renderable('propulsion', scale: 1 / 80),
        Size(boosterFactor * size.radius / 10),
      ]);
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    ThrusterParticle,
    Color,
    Lifetime,
    Renderable,
  ],
)
class ThrusterParticleColorModificationSystem
    extends _$ThrusterParticleColorModificationSystem {
  @override
  void processEntity(Entity entity) {
    final color = colorMapper[entity];
    final lifetime = lifetimeMapper[entity];
    final renderable = renderableMapper[entity];

    final lifetimePercentage = lifetime.timeLeft / lifetime.timeMax;
    final hsl = rgbToHsl(color.realR, color.realG, color.realB);
    hsl[0] = hsl[0] - 0.1 * (1 - lifetimePercentage);
    hsl[1] = hsl[1] * lifetimePercentage;
    hsl[2] = hsl[2] * lifetimePercentage;
    renderable.scale += 3 * world.delta * renderable.scale * lifetimePercentage;
    final rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

    color
      ..r = rgb[0]
      ..g = rgb[1]
      ..b = rgb[2]
      ..a = lifetimePercentage;
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
  void processEntity(Entity entity) {
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
    OnScreen,
  ],
)
class ThrusterCellWallWeakeningSystem
    extends _$ThrusterCellWallWeakeningSystem {
  @override
  void processEntity(Entity entity) {
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
    OnScreen,
  ],
)
class FoodColoringSystem extends _$FoodColoringSystem {
  @override
  void processEntity(Entity entity) {
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
  void processEntity(Entity entity) {
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
  void processEntity(Entity entity) {
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
  void processEntity(Entity entity) {
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
  void processEntity(Entity entity) {
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
