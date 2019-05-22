// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'controller_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$KeyboardControllerSystem extends GenericInputHandlingSystem {
  Mapper<Camera> cameraMapper;
  SettingsManager settingsManager;
  _$KeyboardControllerSystem(List<Element> ignoreInputFromElements)
      : super(Aspect.empty()..allOf([Camera]), ignoreInputFromElements);
  @override
  void initialize() {
    super.initialize();
    cameraMapper = Mapper<Camera>(world);
    settingsManager = world.getManager<SettingsManager>();
  }
}

abstract class _$ControllerSystem extends EntityProcessingSystem {
  Mapper<Booster> boosterMapper;
  Mapper<BlackHoleCannon> blackHoleCannonMapper;
  Mapper<Controller> controllerMapper;
  GameStateManager gameStateManager;
  CameraManager cameraManager;
  ControllerManager controllerManager;
  SettingsManager settingsManager;
  _$ControllerSystem()
      : super(Aspect.empty()..allOf([Booster, BlackHoleCannon, Controller]));
  @override
  void initialize() {
    super.initialize();
    boosterMapper = Mapper<Booster>(world);
    blackHoleCannonMapper = Mapper<BlackHoleCannon>(world);
    controllerMapper = Mapper<Controller>(world);
    gameStateManager = world.getManager<GameStateManager>();
    cameraManager = world.getManager<CameraManager>();
    controllerManager = world.getManager<ControllerManager>();
    settingsManager = world.getManager<SettingsManager>();
  }
}
