// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'debug.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$DebugSystem extends VoidEntitySystem {
  Mapper<Food> foodMapper;
  Mapper<Position> positionMapper;
  QuadTreeManager quadTreeManager;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  CameraManager cameraManager;
  SettingsManager settingsManager;
  TagManager tagManager;
  GroupManager groupManager;
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    positionMapper = Mapper<Position>(world);
    quadTreeManager = world.getManager<QuadTreeManager>();
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    cameraManager = world.getManager<CameraManager>();
    settingsManager = world.getManager<SettingsManager>();
    tagManager = world.getManager<TagManager>();
    groupManager = world.getManager<GroupManager>();
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
