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
  GroupManager groupManager;
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
    groupManager = world.getManager<GroupManager>();
  }
}

abstract class _$RemoveTemporaryGroupSystem extends VoidEntitySystem {
  GroupManager groupManager;
  @override
  void initialize() {
    super.initialize();
    groupManager = world.getManager<GroupManager>();
  }
}

abstract class _$DigestiveSystem extends BaseDigestiveSystem {
  Mapper<Position> positionMapper;
  Mapper<Color> colorMapper;
  AttractedByManager attractedByManager;
  GroupManager groupManager;
  _$DigestiveSystem()
      : super(Aspect.empty()
          ..allOf([Position])
          ..exclude([DigestionComplete]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    colorMapper = Mapper<Color>(world);
    attractedByManager = world.getManager<AttractedByManager>();
    groupManager = world.getManager<GroupManager>();
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

abstract class _$ThrusterParticleEmissionSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Wobble> wobbleMapper;
  Mapper<Booster> boosterMapper;
  GroupManager groupManager;
  _$ThrusterParticleEmissionSystem()
      : super(Aspect.empty()
          ..allOf([
            Position,
            Orientation,
            Thruster,
            Velocity,
            Size,
            Color,
            Wobble,
            Booster
          ]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    thrusterMapper = Mapper<Thruster>(world);
    velocityMapper = Mapper<Velocity>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    wobbleMapper = Mapper<Wobble>(world);
    boosterMapper = Mapper<Booster>(world);
    groupManager = world.getManager<GroupManager>();
  }
}

abstract class _$ThrusterParticleColorModificationSystem
    extends EntityProcessingSystem {
  Mapper<ThrusterParticle> thrusterParticleMapper;
  Mapper<Color> colorMapper;
  Mapper<Lifetime> lifetimeMapper;
  Mapper<Renderable> renderableMapper;
  _$ThrusterParticleColorModificationSystem()
      : super(Aspect.empty()
          ..allOf([ThrusterParticle, Color, Lifetime, Renderable]));
  @override
  void initialize() {
    super.initialize();
    thrusterParticleMapper = Mapper<ThrusterParticle>(world);
    colorMapper = Mapper<Color>(world);
    lifetimeMapper = Mapper<Lifetime>(world);
    renderableMapper = Mapper<Renderable>(world);
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
  GroupManager groupManager;
  _$ThrusterCellWallWeakeningSystem()
      : super(Aspect.empty()..allOf([CellWall, Thruster]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
    thrusterMapper = Mapper<Thruster>(world);
    groupManager = world.getManager<GroupManager>();
  }
}

abstract class _$FoodColoringSystem extends EntityProcessingSystem {
  Mapper<Food> foodMapper;
  Mapper<Color> colorMapper;
  GroupManager groupManager;
  _$FoodColoringSystem() : super(Aspect.empty()..allOf([Food, Color]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    colorMapper = Mapper<Color>(world);
    groupManager = world.getManager<GroupManager>();
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

abstract class _$FoodSizeLossSystem extends BaseFoodSizeLossSystem {
  Mapper<Color> colorMapper;
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<ConstantVelocity> constantVelocityMapper;
  GroupManager groupManager;
  _$FoodSizeLossSystem()
      : super(Aspect.empty()
          ..allOf([Color, Position, Velocity, ConstantVelocity]));
  @override
  void initialize() {
    super.initialize();
    colorMapper = Mapper<Color>(world);
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
    constantVelocityMapper = Mapper<ConstantVelocity>(world);
    groupManager = world.getManager<GroupManager>();
  }
}
