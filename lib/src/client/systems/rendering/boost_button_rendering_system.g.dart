// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'boost_button_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$BoostButtonRenderingSystem extends EntityProcessingSystem {
  Mapper<Controller> controllerMapper;
  Mapper<Booster> boosterMapper;
  CameraManager cameraManager;
  _$BoostButtonRenderingSystem()
      : super(Aspect.empty()..allOf([Controller, Booster]));
  @override
  void initialize() {
    super.initialize();
    controllerMapper = Mapper<Controller>(world);
    boosterMapper = Mapper<Booster>(world);
    cameraManager = world.getManager<CameraManager>();
  }
}
