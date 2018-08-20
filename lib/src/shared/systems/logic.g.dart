// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'logic.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$MovementSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$MovementSystem() : super(Aspect.empty()..allOf([Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
  }
}

abstract class _$OnScreenTagSystem extends VoidEntitySystem {
  CameraManager cameraManager;
  QuadTreeManager quadTreeManager;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  @override
  void initialize() {
    super.initialize();
    cameraManager = world.getManager<CameraManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
  }
}

abstract class _$OnScreenTagRemoveSystem extends EntityProcessingSystem {
  Mapper<OnScreen> onScreenMapper;
  _$OnScreenTagRemoveSystem() : super(Aspect.empty()..allOf([OnScreen]));
  @override
  void initialize() {
    super.initialize();
    onScreenMapper = Mapper<OnScreen>(world);
  }
}
