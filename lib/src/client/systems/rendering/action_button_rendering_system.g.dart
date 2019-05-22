// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'action_button_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ActionButtonRenderingSystem extends EntityProcessingSystem {
  Mapper<Controller> controllerMapper;
  Mapper<Booster> boosterMapper;
  Mapper<BlackHoleCannon> blackHoleCannonMapper;
  CameraManager cameraManager;
  _$ActionButtonRenderingSystem()
      : super(Aspect.empty()..allOf([Controller, Booster, BlackHoleCannon]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
    boosterMapper = Mapper<Booster>(world);
    blackHoleCannonMapper = Mapper<BlackHoleCannon>(world);
    cameraManager = world.getManager<CameraManager>();
  }
}
