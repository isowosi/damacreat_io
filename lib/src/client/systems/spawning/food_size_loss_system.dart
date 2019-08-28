import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;

part 'food_size_loss_system.g.dart';

@Generate(
  BaseFoodSizeLossSystem,
  allOf: [
    Color,
    Position,
    Velocity,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class FoodSizeLossSystem extends _$FoodSizeLossSystem {
  SpriteSheet sheet;

  FoodSizeLossSystem(this.sheet);

  @override
  void onFoodSizeBelowMinimum(int entity) {}

  @override
  void onFoodSizeLoss(int entity, double foodRadius) {
    if (onScreenTagSystem[entity]) {
      final position = positionMapper[entity];
      final velocity = velocityMapper[entity];
      final foodColor = colorMapper[entity];
      final angle = velocity.angle - pi - pi / 4 + random.nextDouble() * pi / 2;
      world.createEntity([
        Renderable(sheet, 'digestion'),
        Position(position.x + foodRadius * cos(angle),
            position.y + foodRadius * sin(angle)),
        Velocity(foodRadius, angle, 0),
        Orientation(angle),
        Size(max(0.2, min(1, foodRadius / 10))),
        Color(foodColor.r, foodColor.g, foodColor.b, foodColor.a),
        ColorChanger(foodColor.r, foodColor.g, foodColor.b, foodColor.a,
            foodColor.r, foodColor.g, foodColor.b, 0.1),
        Lifetime(0.5)
      ]);
    }
  }
}
