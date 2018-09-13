// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'debug.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$DebugSystem extends VoidEntitySystem {
  Mapper<Food> foodMapper;
  Mapper<Position> positionMapper;
  QuadTreeManager quadTreeManager;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  CameraManager cameraManager;
  SettingsManager settingsManager;
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    positionMapper = Mapper<Position>(world);
    quadTreeManager = world.getManager<QuadTreeManager>();
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
    cameraManager = world.getManager<CameraManager>();
    settingsManager = world.getManager<SettingsManager>();
  }
}

abstract class _$DamacreatFpsRenderingSystem extends FpsRenderingSystem {
  SettingsManager settingsManager;
  _$DamacreatFpsRenderingSystem(CanvasRenderingContext2D ctx, String fillStyle)
      : super(ctx, fillStyle);
  @override
  void initialize() {
    super.initialize();
    settingsManager = world.getManager<SettingsManager>();
  }
}
