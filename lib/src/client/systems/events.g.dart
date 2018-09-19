// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'events.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ControllerSystem extends EntityProcessingSystem {
  Mapper<Controller> controllerMapper;
  GameStateManager gameStateManager;
  _$ControllerSystem() : super(Aspect.empty()..allOf([Controller]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
    gameStateManager = world.getManager<GameStateManager>();
  }
}

abstract class _$WebSocketListeningSystem extends VoidEntitySystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<ConstantVelocity> constantVelocityMapper;
  Mapper<DigestedBy> digestedByMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Food> foodMapper;
  TagManager tagManager;
  IdManager idManager;
  QuadTreeManager quadTreeManager;
  DigestionManager digestionManager;
  GameStateManager gameStateManager;
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    orientationMapper = Mapper<Orientation>(world);
    constantVelocityMapper = Mapper<ConstantVelocity>(world);
    digestedByMapper = Mapper<DigestedBy>(world);
    velocityMapper = Mapper<Velocity>(world);
    foodMapper = Mapper<Food>(world);
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    digestionManager = world.getManager<DigestionManager>();
    gameStateManager = world.getManager<GameStateManager>();
  }
}
