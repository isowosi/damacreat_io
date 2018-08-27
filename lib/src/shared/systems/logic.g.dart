// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'logic.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

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

abstract class _$FoodGrowingSystem extends EntityProcessingSystem {
  Mapper<Food> foodMapper;
  Mapper<Size> sizeMapper;
  Mapper<Growing> growingMapper;
  _$FoodGrowingSystem()
      : super(Aspect.empty()
          ..allOf([Food, Size, Growing])
          ..exclude([EatenBy]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    sizeMapper = Mapper<Size>(world);
    growingMapper = Mapper<Growing>(world);
  }
}

abstract class _$RemoveTemporaryComponentsSystem
    extends EntityProcessingSystem {
  Mapper<ChangedPosition> changedPositionMapper;
  Mapper<OnScreen> onScreenMapper;
  _$RemoveTemporaryComponentsSystem()
      : super(Aspect.empty()..oneOf([ChangedPosition, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    changedPositionMapper = Mapper<ChangedPosition>(world);
    onScreenMapper = Mapper<OnScreen>(world);
  }
}
