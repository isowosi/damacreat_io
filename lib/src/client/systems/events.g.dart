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

abstract class _$WebSocketListeningSystem extends EntitySystem {
  Mapper<Id> idMapper;
  Mapper<Position> positionMapper;
  _$WebSocketListeningSystem() : super(Aspect.empty()..allOf([Id, Position]));
  @override
  void initialize() {
    super.initialize();
    idMapper = Mapper<Id>(world);
    positionMapper = Mapper<Position>(world);
  }
}
