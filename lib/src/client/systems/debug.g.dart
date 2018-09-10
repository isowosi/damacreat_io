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
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    positionMapper = Mapper<Position>(world);
    quadTreeManager = world.getManager<QuadTreeManager>();
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}
