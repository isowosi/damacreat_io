// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'white_hole_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$WhiteHoleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<WhiteHole> whiteHoleMapper;
  OnScreenTagSystem onScreenTagSystem;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  TagManager tagManager;
  CameraManager cameraManager;
  _$WhiteHoleRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.empty()..allOf([Position, WhiteHole]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    whiteHoleMapper = Mapper<WhiteHole>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}
