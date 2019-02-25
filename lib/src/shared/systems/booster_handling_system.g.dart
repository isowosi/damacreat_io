// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'booster_handling_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$BoosterHandlingSystem extends BaseBoosterHandlingSystem {
  Mapper<Player> playerMapper;
  Mapper<Position> positionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Size> sizeMapper;
  Mapper<Controller> controllerMapper;
  _$BoosterHandlingSystem()
      : super(Aspect.empty()
          ..allOf([Player, Position, Orientation, Velocity, Size, Controller]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = Mapper<Player>(world);
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    velocityMapper = Mapper<Velocity>(world);
    sizeMapper = Mapper<Size>(world);
    controllerMapper = Mapper<Controller>(world);
  }
}
