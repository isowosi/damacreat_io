import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
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

  @override
  void end() {
    world.processEntityChanges();
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    OnScreen,
  ],
)
class OnScreenTagRemoveSystem extends _$OnScreenTagRemoveSystem {
  @override
  void processEntity(Entity entity) {
    entity
      ..removeComponent<OnScreen>()
      ..changedInWorld();
  }

  @override
  void end() {
    world.processEntityChanges();
  }
}
