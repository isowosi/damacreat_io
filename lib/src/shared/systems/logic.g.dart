// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'logic.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$OnScreenTagSystem extends EntitySystem {
  Mapper<Camera> cameraMapper;
  Mapper<Position> positionMapper;
  CameraManager cameraManager;
  QuadTreeManager quadTreeManager;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  TagManager tagManager;
  _$OnScreenTagSystem() : super(Aspect.empty()..allOf([Camera, Position]));
  @override
  void initialize() {
    super.initialize();
    cameraMapper = Mapper<Camera>(world);
    positionMapper = Mapper<Position>(world);
    cameraManager = world.getManager<CameraManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    tagManager = world.getManager<TagManager>();
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
  _$CellWallSystem()
      : super(Aspect.empty()
          ..allOf([CellWall])
          ..exclude([DigestedBy]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
  }
}

abstract class _$CellWallDigestedBySystem extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  Mapper<DigestedBy> digestedByMapper;
  _$CellWallDigestedBySystem()
      : super(Aspect.empty()..allOf([CellWall, DigestedBy]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
    digestedByMapper = Mapper<DigestedBy>(world);
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

abstract class _$ThrusterCellWallWeakeningSystem
    extends EntityProcessingSystem {
  Mapper<CellWall> cellWallMapper;
  Mapper<Thruster> thrusterMapper;
  OnScreenTagSystem onScreenTagSystem;
  _$ThrusterCellWallWeakeningSystem()
      : super(Aspect.empty()..allOf([CellWall, Thruster]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
    thrusterMapper = Mapper<Thruster>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
  }
}

abstract class _$FoodColoringSystem extends EntityProcessingSystem {
  Mapper<Food> foodMapper;
  Mapper<Color> colorMapper;
  OnScreenTagSystem onScreenTagSystem;
  _$FoodColoringSystem() : super(Aspect.empty()..allOf([Food, Color]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    colorMapper = Mapper<Color>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
  }
}

abstract class _$MovementSystemWithoutQuadTree extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$MovementSystemWithoutQuadTree()
      : super(Aspect.empty()
          ..allOf([Position, Velocity])
          ..exclude([QuadTreeCandidate]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
  }
}

abstract class _$ColorChangeOverLifetimeSystem extends EntityProcessingSystem {
  Mapper<Color> colorMapper;
  Mapper<ColorChanger> colorChangerMapper;
  Mapper<Lifetime> lifetimeMapper;
  _$ColorChangeOverLifetimeSystem()
      : super(Aspect.empty()..allOf([Color, ColorChanger, Lifetime]));
  @override
  void initialize() {
    super.initialize();
    colorMapper = Mapper<Color>(world);
    colorChangerMapper = Mapper<ColorChanger>(world);
    lifetimeMapper = Mapper<Lifetime>(world);
  }
}

abstract class _$AttractionAccelerationSystem extends EntityProcessingSystem {
  Mapper<Acceleration> accelerationMapper;
  Mapper<AttractedBy> attractedByMapper;
  Mapper<Position> positionMapper;
  AttractedByManager attractedByManager;
  _$AttractionAccelerationSystem()
      : super(Aspect.empty()..allOf([Acceleration, AttractedBy, Position]));
  @override
  void initialize() {
    super.initialize();
    accelerationMapper = Mapper<Acceleration>(world);
    attractedByMapper = Mapper<AttractedBy>(world);
    positionMapper = Mapper<Position>(world);
    attractedByManager = world.getManager<AttractedByManager>();
  }
}

abstract class _$AccelerationSystem extends EntityProcessingSystem {
  Mapper<Acceleration> accelerationMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Orientation> orientationMapper;
  _$AccelerationSystem()
      : super(Aspect.empty()..allOf([Acceleration, Velocity, Orientation]));
  @override
  void initialize() {
    super.initialize();
    accelerationMapper = Mapper<Acceleration>(world);
    velocityMapper = Mapper<Velocity>(world);
    orientationMapper = Mapper<Orientation>(world);
  }
}
