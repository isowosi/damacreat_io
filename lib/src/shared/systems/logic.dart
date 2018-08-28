import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';

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
