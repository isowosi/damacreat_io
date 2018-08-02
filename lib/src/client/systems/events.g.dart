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
  TagManager tagManager;
  IdManager idManager;
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
  }
}
