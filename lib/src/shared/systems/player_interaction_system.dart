import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';

part 'player_interaction_system.g.dart';

@Generate(
  BasePlayerInteractionSystem,
  allOf: [
    Wobble,
    CellWall,
    Orientation,
  ],
  manager: [
    TagManager,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class PlayerInteractionSystem extends _$PlayerInteractionSystem {
  double angleToSegmentFactor = playerCircleFragments / (2 * pi);

  @override
  void processEntity(Entity entity) {
    if (onScreenTagSystem[entity]) {
      super.processEntity(entity);
    }
  }

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
