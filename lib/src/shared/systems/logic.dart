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
