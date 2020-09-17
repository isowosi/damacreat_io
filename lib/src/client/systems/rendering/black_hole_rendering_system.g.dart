// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'black_hole_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$BlackHoleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<BlackHole> blackHoleMapper;
  OnScreenTagSystem onScreenTagSystem;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  TagManager tagManager;
  CameraManager cameraManager;
  _$BlackHoleRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.empty()..allOf([Position, Size, BlackHole]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    blackHoleMapper = Mapper<BlackHole>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}
