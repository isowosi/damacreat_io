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
  Mapper<Orientation> orientationMapper;
  TagManager tagManager;
  IdManager idManager;
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
  }
}
