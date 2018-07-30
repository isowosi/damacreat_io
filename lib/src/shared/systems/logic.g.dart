// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'logic.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ControllerToActionSystem extends EntityProcessingSystem {
  Mapper<Controller> controllerMapper;
  Mapper<Acceleration> accelerationMapper;
  _$ControllerToActionSystem()
      : super(Aspect.empty()..allOf([Controller, Acceleration]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
    accelerationMapper = Mapper<Acceleration>(world);
  }
}

abstract class _$MovementSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  _$MovementSystem() : super(Aspect.empty()..allOf([Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
  }
}
