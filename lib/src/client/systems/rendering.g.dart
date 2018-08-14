// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rendering.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$PositionRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  CameraManager cameraManager;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  _$PositionRenderingSystem(RenderingContext2 gl)
      : super(gl, Aspect.empty()..allOf([Position]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    cameraManager = world.getManager<CameraManager>();
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
  }
}

abstract class _$BackgroundRenderingSystemBase
    extends VoidWebGlRenderingSystem {
  Mapper<Position> positionMapper;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  TagManager tagManager;
  CameraManager cameraManager;
  _$BackgroundRenderingSystemBase(RenderingContext2 gl) : super(gl);
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}
