// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'food_size_loss_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$FoodSizeLossSystem extends BaseFoodSizeLossSystem {
  Mapper<Color> colorMapper;
  Mapper<Position> positionMapper;
  Mapper<Velocity> velocityMapper;
  OnScreenTagSystem onScreenTagSystem;
  _$FoodSizeLossSystem()
      : super(Aspect.empty()..allOf([Color, Position, Velocity]));
  @override
  void initialize() {
    super.initialize();
    colorMapper = Mapper<Color>(world);
    positionMapper = Mapper<Position>(world);
    velocityMapper = Mapper<Velocity>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
  }
}
