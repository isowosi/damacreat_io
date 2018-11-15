import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart' hide Velocity;

part 'logic.g.dart';

@Generate(
  VoidEntitySystem,
  manager: [
    CameraManager,
    QuadTreeManager,
    WebGlViewProjectionMatrixManager,
  ],
)
class OnScreenTagSystem extends _$OnScreenTagSystem {
  @override
  void processSystem() {
    final inverse = webGlViewProjectionMatrixManager
        .create2dViewProjectionMatrix()
          ..invert();
    final leftTop = inverse.transformed(Vector4(-1.0, -1.0, 0.0, 1.0));
    final rightBottom = inverse.transformed(Vector4(1.0, 1.0, 0.0, 1.0));
    quadTreeManager
        .getCollisionCandidates(leftTop.x, leftTop.y,
            width: rightBottom.x - leftTop.x, height: rightBottom.y - leftTop.y)
        .forEach(_tag);
  }

  void _tag(Entity entity) {
    entity
      ..addComponent(OnScreen())
      ..changedInWorld();
  }
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
    DigestionManager,
  ],
  allOf: [
    Position,
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
    final hsl = rgbToHsl(digesterColor.r, digesterColor.g, digesterColor.b);
    for (var i = 0; i < foodSize.radius; i++) {
      final angle = random.nextDouble() * 2 * pi;
      world.createAndAddEntity([
        Particle(),
        Position(foodPosition.x + foodSize.radius * cos(angle),
            foodPosition.y + foodSize.radius * sin(angle)),
        Color.fromHsl(hsl[0], hsl[1] + 0.1, hsl[2] + 0.1, 1.0),
        Lifetime(0.1)
      ]);
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
    if (l.timeLeft <= 0.0) {
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
          1.0 +
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
          1.0 -
              sizeRelation *
                  distRelation *
                  (1 - indexSq * indexSq / fragmentRangePow4));
      colliderCellWall.strengthFactor[fragmentIndex] = 1.0 -
          distRelation * (1 - (indexSq * index).abs() / fragmentRangePow3);
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
      final enveloped = max(old,
          1.0 + additionalDistRelation * (1 - indexSq / fragmentRangePow2));
      final pressing = min(
          old,
          1.0 -
              sizeRelation *
                  distRelation *
                  (1 - indexSq * indexSq / fragmentRangePow4));

      colliderWobble.wobbleFactor[fragmentIndex] =
          pressingEnvelopedRatio * enveloped +
              (1.0 - pressingEnvelopedRatio) * pressing;
      colliderCellWall.strengthFactor[fragmentIndex] = 1.0 -
          distRelation * (1 - (indexSq * index).abs() / fragmentRangePow3);
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
          1.0 +
              additionalDistRelation *
                  (1 - indexPow3.abs() / fragmentRangePow3));
      colliderCellWall.strengthFactor[fragmentIndex] = 1.0 -
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
)
class CellWallSystem extends _$CellWallSystem {
  @override
  void processEntity(Entity entity) {
    final cw = cellWallMapper[entity];

    final strengthFactor = cw.strengthFactor;
    for (var i = 0; i < strengthFactor.length; i++) {
      strengthFactor[i] =
          1.0 + (strengthFactor[i] - 1.0) * (1 - 0.999 * world.delta);
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
    final thrusterSpeed = 1.1 * velocity.rotational * size.radius;
    final vx = velocity.value * cos(velocity.angle) -
        50.0 * cos(orientation.angle) +
        thrusterSpeed * cos(thrusterAngle + pi / 2);
    final vy = velocity.value * sin(velocity.angle) -
        50.0 * sin(orientation.angle) +
        thrusterSpeed * sin(thrusterAngle + pi / 2);

    final velocityAngle = atan2(vy, vx);
    final speed = vx / cos(velocityAngle);
    final hsl = rgbToHsl(color.r, color.g, color.b);
    hsl[1] += 0.1;
    hsl[2] += 0.1;
    final rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    for (var i = 0; i < sqrt(size.radius) * boosterFactor; i++) {
      final posFactor = random.nextDouble();
      final posFactorTime = random.nextDouble();
      final x = x1 + posFactor * (x2 - x1);
      final y = y1 + posFactor * (y2 - y1);
      final oldX = oldX1 + posFactor * (oldX2 - oldX1);
      final oldY = oldY1 + posFactor * (oldY2 - oldY1);
      world.createAndAddEntity([
        Position(
            x + posFactorTime * (oldX - x), y + posFactorTime * (oldY - y)),
//        Particle(),
        ThrusterParticle(),
        Color(rgb[0], rgb[1], rgb[2], 1.0),
        Lifetime(boosterFactor * (0.5 + 1.0 * random.nextDouble())),
        Velocity(speed * 0.1 + random.nextDouble() * 0.2,
            velocityAngle - pi / 64 + random.nextDouble() * pi / 32, 0.0),
        Orientation(velocityAngle),
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
    hsl[0] = hsl[0] - 0.1 * (1.0 - lifetimePercentage);
    hsl[1] = hsl[1] * lifetimePercentage;
    hsl[2] = hsl[2] * lifetimePercentage;
    renderable.scale +=
        3.0 * world.delta * renderable.scale * lifetimePercentage;
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
    Size,
  ],
  manager: [
    CameraManager,
  ],
)
class CameraZoomCalculatingSystem extends _$CameraZoomCalculatingSystem {
  @override
  void processEntity(Entity entity) {
    final size = sizeMapper[entity];
    cameraManager.gameZoom = initialGameZoom + sqrt(size.radius / 300.0);
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
    Size,
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
