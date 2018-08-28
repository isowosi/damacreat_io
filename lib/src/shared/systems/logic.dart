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
