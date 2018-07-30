import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';
import 'package:damacreat_io/src/shared/components.dart';

part 'logic.g.dart';

@Generate(EntityProcessingSystem, allOf: [Controller, Acceleration])
class ControllerToActionSystem extends _$ControllerToActionSystem {
  final _acc = 50.0;
  final _sqrttwo = 1.4142;

  @override
  void processEntity(Entity entity) {
    final controller = controllerMapper[entity];
    final acceleration = accelerationMapper[entity];
    if (controller.up) {
      acceleration.y += _acc * world.delta;
    } else if (controller.down) {
      acceleration.y -= _acc * world.delta;
    } else if (controller.left) {
      acceleration.x -= _acc * world.delta;
    } else if (controller.right) {
      acceleration.x += _acc * world.delta;
    } else if (controller.upleft) {
      acceleration
        ..y += _acc * world.delta / _sqrttwo
        ..x -= _acc * world.delta / _sqrttwo;
    } else if (controller.upright) {
      acceleration
        ..y += _acc * world.delta / _sqrttwo
        ..x += _acc * world.delta / _sqrttwo;
    } else if (controller.downleft) {
      acceleration
        ..y -= _acc * world.delta / _sqrttwo
        ..x -= _acc * world.delta / _sqrttwo;
    } else if (controller.downright) {
      acceleration
        ..y -= _acc * world.delta / _sqrttwo
        ..x += _acc * world.delta / _sqrttwo;
    }
  }
}

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
