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

abstract class _$EntityInteractionSystem extends BaseEntityInteractionSystem {
  Mapper<Wobble> wobbleMapper;
  Mapper<CellWall> cellWallMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<OnScreen> onScreenMapper;
  TagManager tagManager;
  _$EntityInteractionSystem()
      : super(Aspect.empty()..allOf([Wobble, CellWall, Orientation, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    wobbleMapper = Mapper<Wobble>(world);
    cellWallMapper = Mapper<CellWall>(world);
    orientationMapper = Mapper<Orientation>(world);
    onScreenMapper = Mapper<OnScreen>(world);
    tagManager = world.getManager<TagManager>();
  }
}

abstract class _$WobbleSystem extends EntityProcessingSystem {
  Mapper<Wobble> wobbleMapper;
  _$WobbleSystem() : super(Aspect.empty()..allOf([Wobble]));
  @override
  void initialize() {
    super.initialize();
    wobbleMapper = Mapper<Wobble>(world);
  }
}

abstract class _$CellWallSystem extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  _$CellWallSystem() : super(Aspect.empty()..allOf([CellWall]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
  }
}

abstract class _$ThrusterParticleEmissionSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<ChangedPosition> changedPositionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Wobble> wobbleMapper;
  Mapper<OnScreen> onScreenMapper;
  _$ThrusterParticleEmissionSystem()
      : super(Aspect.empty()
          ..allOf([
            Position,
            ChangedPosition,
            Orientation,
            Thruster,
            Velocity,
            Size,
            Color,
            Wobble,
            OnScreen
          ]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    changedPositionMapper = Mapper<ChangedPosition>(world);
    orientationMapper = Mapper<Orientation>(world);
    thrusterMapper = Mapper<Thruster>(world);
    velocityMapper = Mapper<Velocity>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    wobbleMapper = Mapper<Wobble>(world);
    onScreenMapper = Mapper<OnScreen>(world);
  }
}

abstract class _$ThrusterParticleColorModificationSystem
    extends EntityProcessingSystem {
  Mapper<ThrusterParticle> thrusterParticleMapper;
  Mapper<Color> colorMapper;
  Mapper<Lifetime> lifetimeMapper;
  _$ThrusterParticleColorModificationSystem()
      : super(Aspect.empty()..allOf([ThrusterParticle, Color, Lifetime]));
  @override
  void initialize() {
    super.initialize();
    thrusterParticleMapper = Mapper<ThrusterParticle>(world);
    colorMapper = Mapper<Color>(world);
    lifetimeMapper = Mapper<Lifetime>(world);
  }
}

abstract class _$CameraZoomCalculatingSystem extends EntityProcessingSystem {
  Mapper<Controller> controllerMapper;
  Mapper<Size> sizeMapper;
  CameraManager cameraManager;
  _$CameraZoomCalculatingSystem()
      : super(Aspect.empty()..allOf([Controller, Size]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
    sizeMapper = Mapper<Size>(world);
    cameraManager = world.getManager<CameraManager>();
  }
}

abstract class _$CameraPositionSystem extends EntityProcessingSystem {
  Mapper<Controller> controllerMapper;
  Mapper<Position> positionMapper;
  TagManager tagManager;
  _$CameraPositionSystem()
      : super(Aspect.empty()..allOf([Controller, Position]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
    positionMapper = Mapper<Position>(world);
    tagManager = world.getManager<TagManager>();
  }
}
