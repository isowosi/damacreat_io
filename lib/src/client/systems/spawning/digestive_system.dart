import 'package:damacreat_io/shared.dart';
import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/client/managers/analytics_manager.dart';
import 'package:damacreat_io/src/shared/managers/attracted_by_manager.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart'
    hide Velocity, Acceleration;

part 'digestive_system.g.dart';

@Generate(
  BaseDigestiveSystem,
  manager: [
    AttractedByManager,
    AnalyticsManager,
  ],
  systems: [
    OnScreenTagSystem,
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
  SpriteSheet sheet;

  DigestiveSystem(this.sheet);

  @override
  void processEntity(int entity) {
    if (onScreenTagSystem[entity]) {
      super.processEntity(entity);
    }
  }

  @override
  void onDigestionComplete(int digester, int food) {
    world.addComponent(food, DigestionComplete());
  }

  @override
  void onDigestionInProgress(int digester, int food) {
    final foodPosition = positionMapper[food];
    final foodSize = sizeMapper[food];
    final digesterColor = colorMapper[digester];
    final foodColor = colorMapper[food];
    final foodRadius = foodSize.radius;
    for (var i = 0; i < foodRadius / 2; i++) {
      final angle = random.nextDouble() * tau;
      final entity = world.createEntity([
        Renderable(sheet, 'digestion'),
        Position(foodPosition.x + foodRadius * cos(angle),
            foodPosition.y + foodRadius * sin(angle)),
        Velocity(foodRadius, angle, 0),
        Orientation(angle),
        Acceleration(0, 0),
        Size(max(0.2, min(1, foodRadius / 10))),
        Color(foodColor.r, foodColor.g, foodColor.b, foodColor.a),
        ColorChanger(foodColor.r, foodColor.g, foodColor.b, foodColor.a,
            digesterColor.r, digesterColor.g, digesterColor.b, digesterColor.a),
        Lifetime(0.5)
      ]);
      attractedByManager.setReference(entity, digester);
    }
  }

  @override
  void onNaN(
      double foodRadiusBefore,
      double foodRadiusAfter,
      double digesterRadiusBefore,
      double digesterRadiusAfter,
      double consumedArea) {
    analyticsManager.clientError('''
calculated NaN in DigestiveSystem: $foodRadiusBefore, $foodRadiusAfter, $digesterRadiusBefore, $digesterRadiusAfter, $consumedArea''');
  }
}
