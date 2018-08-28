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
          ..exclude([DigestedBy]));
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

abstract class _$DigestiveSystem extends BaseDigestiveSystem {
  Mapper<Position> positionMapper;
  Mapper<Color> colorMapper;
  DigestionManager digestionManager;
  _$DigestiveSystem()
      : super(Aspect.empty()
          ..allOf([Position])
          ..exclude([DigestionComplete]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    colorMapper = Mapper<Color>(world);
    digestionManager = world.getManager<DigestionManager>();
  }
}

abstract class _$ExpirationSystem extends EntityProcessingSystem {
  Mapper<Lifetime> lifetimeMapper;
  _$ExpirationSystem() : super(Aspect.empty()..allOf([Lifetime]));
  @override
  void initialize() {
    super.initialize();
    lifetimeMapper = Mapper<Lifetime>(world);
  }
}
