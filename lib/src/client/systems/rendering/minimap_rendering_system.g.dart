// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'minimap_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$MinimapRenderingSystem extends EntityProcessingSystem {
  Mapper<Player> playerMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Controller> controllerMapper;
  CameraManager cameraManager;
  SettingsManager settingsManager;
  _$MinimapRenderingSystem()
      : super(Aspect.empty()..allOf([Player, Position, Size]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = Mapper<Player>(world);
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    controllerMapper = Mapper<Controller>(world);
    cameraManager = world.getManager<CameraManager>();
    settingsManager = world.getManager<SettingsManager>();
  }
}
