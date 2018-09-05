// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'events.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ControllerSystem extends GenericInputHandlingSystem {
  Mapper<Controller> controllerMapper;
  _$ControllerSystem() : super(Aspect.empty()..allOf([Controller]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
  }
}

abstract class _$WebSocketListeningSystem extends VoidEntitySystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<ConstantVelocity> constantVelocityMapper;
  Mapper<DigestedBy> digestedByMapper;
  Mapper<Velocity> velocityMapper;
  TagManager tagManager;
  IdManager idManager;
  QuadTreeManager quadTreeManager;
  DigestionManager digestionManager;
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    orientationMapper = Mapper<Orientation>(world);
    constantVelocityMapper = Mapper<ConstantVelocity>(world);
    digestedByMapper = Mapper<DigestedBy>(world);
    velocityMapper = Mapper<Velocity>(world);
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    digestionManager = world.getManager<DigestionManager>();
  }
}
