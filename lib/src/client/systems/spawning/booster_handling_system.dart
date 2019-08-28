import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:damacreat/damacreat.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;

part 'booster_handling_system.g.dart';

@Generate(
  BaseBoosterHandlingSystem,
  allOf: [
    Player,
    Position,
    Orientation,
    Velocity,
    Size,
    Controller,
  ],
)
class BoosterHandlingSystem extends _$BoosterHandlingSystem {
  SpriteSheet sheet;

  BoosterHandlingSystem(this.sheet);

  @override
  void onBoost(int entity, double powerusage) {
    final booster = boosterMapper[entity];
    final position = positionMapper[entity];
    final orientation = orientationMapper[entity];
    final velocity = velocityMapper[entity];
    final distance =
        sizeMapper[entity].radius * 1.15 + random.nextDouble() * 200;
    world
      ..createEntity([
        Position(
            position.x +
                cos(velocity.angle) * 500 +
                cos(velocity.angle + pi / 2) * distance,
            position.y +
                sin(velocity.angle) * 500 +
                sin(velocity.angle + pi / 2) * distance),
        Size(1),
        Renderable(sheet, 'boost'),
        Lifetime(booster.maxPower),
        Color(1, 1, 1, booster.power / booster.maxPower),
        Orientation(orientation.angle),
        Velocity(velocity.value * distance / 3, velocity.angle - pi, 0),
        ConstantVelocity(),
      ])
      ..createEntity([
        Position(
            position.x +
                cos(velocity.angle) * 500 +
                cos(velocity.angle - pi / 2) * distance,
            position.y +
                sin(velocity.angle) * 500 +
                sin(velocity.angle - pi / 2) * distance),
        Size(1),
        Renderable(sheet, 'boost'),
        Lifetime(booster.maxPower),
        Color(1, 1, 1, booster.power / booster.maxPower),
        Orientation(orientation.angle),
        Velocity(velocity.value * distance / 3, velocity.angle - pi, 0),
        ConstantVelocity(),
      ]);
  }
}
