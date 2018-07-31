import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';

part 'logic.g.dart';

/// Move every [Entity] with both a [Position] and a [Velocity].
@Generate(
  EntityProcessingSystem,
  allOf: [
    Position,
    Velocity,
  ],
)
class MovementSystem extends _$MovementSystem {
  @override
  void processEntity(Entity entity) {
    final position = positionMapper[entity];
    final velocity = velocityMapper[entity];

    position
      ..x += velocity.x * world.delta
      ..y += velocity.y * world.delta;
  }
}
