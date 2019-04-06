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
  ComponentManager componentManager;
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
    componentManager = world.getManager<ComponentManager>();
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
  Mapper<OnScreen> onScreenMapper;
  Mapper<Color> colorMapper;
  AttractedByManager attractedByManager;
  _$DigestiveSystem()
      : super(Aspect.empty()
          ..allOf([Position, OnScreen])
          ..exclude([DigestionComplete]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    onScreenMapper = Mapper<OnScreen>(world);
    colorMapper = Mapper<Color>(world);
    attractedByManager = world.getManager<AttractedByManager>();
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
  Mapper<ChangedPosition> changedPositionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Wobble> wobbleMapper;
  Mapper<OnScreen> onScreenMapper;
  Mapper<Booster> boosterMapper;
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
            OnScreen,
            Booster
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
    boosterMapper = Mapper<Booster>(world);
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
  Mapper<OnScreen> onScreenMapper;
  _$ThrusterCellWallWeakeningSystem()
      : super(Aspect.empty()..allOf([CellWall, Thruster, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    cellWallMapper = Mapper<CellWall>(world);
    thrusterMapper = Mapper<Thruster>(world);
    onScreenMapper = Mapper<OnScreen>(world);
  }
}

abstract class _$FoodColoringSystem extends EntityProcessingSystem {
  Mapper<Food> foodMapper;
  Mapper<Color> colorMapper;
  Mapper<OnScreen> onScreenMapper;
  _$FoodColoringSystem()
      : super(Aspect.empty()..allOf([Food, Color, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    colorMapper = Mapper<Color>(world);
    onScreenMapper = Mapper<OnScreen>(world);
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
