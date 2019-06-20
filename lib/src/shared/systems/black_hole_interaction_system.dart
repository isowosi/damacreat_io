import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/shared/managers/attracted_by_manager.dart';
import 'package:dartemis/dartemis.dart';

part 'black_hole_interaction_system.g.dart';

@Generate(
  BaseBlackHoleInteractionSystem,
  mapper: [
    Color,
  ],
  manager: [
    AttractedByManager,
    GroupManager,
  ],
)
class BlackHoleInteractionSystem extends _$BlackHoleInteractionSystem {
  @override
  void processEntity(Entity entity) {
    if (groupManager.isInGroup(entity, groupOnScreen)) {
      super.processEntity(entity);
    }
  }

  @override
  void onBodyInsideBlackHole(Entity blackHole, Entity victim) {
    final foodRadius = sizeMapper[victim].radius;
    final foodPosition = positionMapper[victim];
    final foodColor = colorMapper[victim];
    final angle = random.nextDouble() * tau;
    _spawnParticles(3, foodRadius, foodPosition, angle, foodColor, blackHole);
  }

  @override
  void onBodyInsideBlackHoleGravityWell(Entity blackHole, Entity victim) {
    final foodRadius = sizeMapper[victim].radius;
    final foodPosition = positionMapper[victim];
    final foodColor = colorMapper[victim];
    final angle = random.nextDouble() * tau;
    _spawnParticles(1, foodRadius, foodPosition, angle, foodColor, blackHole);
  }

  void _spawnParticles(int particleMultiplier, double foodRadius,
      Position foodPosition, double angle, Color foodColor, Entity blackHole) {
    for (var i = 0; i <= particleMultiplier * foodRadius ~/ 10; i++) {
      final entity = world.createAndAddEntity([
        Renderable('digestion'),
        Position(foodPosition.x + foodRadius * cos(angle),
            foodPosition.y + foodRadius * sin(angle)),
        Velocity(foodRadius, angle, 0),
        Orientation(angle),
        Acceleration(0, 0),
        Size(max(0.2, min(1, foodRadius / 10))),
        Color(foodColor.r, foodColor.g, foodColor.b, foodColor.a),
        ColorChanger(foodColor.r, foodColor.g, foodColor.b, foodColor.a, 1,
            foodColor.g / 2, foodColor.b / 2, 0),
        Lifetime(1)
      ]);
      attractedByManager.setReference(entity, blackHole);
    }
  }

  @override
  void onCenterInsideBlackHole(Entity blackHole, Entity victim) {
    final foodRadius = sizeMapper[victim].radius;
    final foodPosition = positionMapper[victim];
    final foodColor = colorMapper[victim];
    final angle = random.nextDouble() * tau;
    _spawnParticles(4, foodRadius, foodPosition, angle, foodColor, blackHole);
  }

  @override
  void onCenterInsideBlackHoleGravityWell(Entity blackHole, Entity victim) {
    final foodRadius = sizeMapper[victim].radius;
    final foodPosition = positionMapper[victim];
    final foodColor = colorMapper[victim];
    final angle = random.nextDouble() * tau;
    _spawnParticles(2, foodRadius, foodPosition, angle, foodColor, blackHole);
  }
}
