// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'events.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$WebSocketListeningSystem extends VoidEntitySystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<ConstantVelocity> constantVelocityMapper;
  Mapper<DigestedBy> digestedByMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Food> foodMapper;
  Mapper<ChangedPosition> changedPositionMapper;
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
    changedPositionMapper = Mapper<ChangedPosition>(world);
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    digestionManager = world.getManager<DigestionManager>();
    gameStateManager = world.getManager<GameStateManager>();
  }
}
