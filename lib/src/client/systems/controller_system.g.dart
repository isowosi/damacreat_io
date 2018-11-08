// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'controller_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ControllerSystem extends EntityProcessingSystem {
  Mapper<Booster> boosterMapper;
  Mapper<Controller> controllerMapper;
  GameStateManager gameStateManager;
  CameraManager cameraManager;
  ControllerManager controllerManager;
  _$ControllerSystem() : super(Aspect.empty()..allOf([Booster, Controller]));
  @override
  void initialize() {
    super.initialize();
    boosterMapper = Mapper<Booster>(world);
    controllerMapper = Mapper<Controller>(world);
    gameStateManager = world.getManager<GameStateManager>();
    cameraManager = world.getManager<CameraManager>();
    controllerManager = world.getManager<ControllerManager>();
  }
}
