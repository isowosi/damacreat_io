// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rendering.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$FoodRenderingSystem extends CircleRenderingSystem {
  Mapper<Food> foodMapper;
  _$FoodRenderingSystem(RenderingContext2 gl)
      : super(gl, Aspect.empty()..allOf([Food]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
  }
}

abstract class _$CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Wobble> wobbleMapper;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  _$CircleRenderingSystem(RenderingContext2 gl, Aspect aspect)
      : super(gl, aspect..allOf([Position, Size, Color, Orientation, Wobble]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    orientationMapper = Mapper<Orientation>(world);
    wobbleMapper = Mapper<Wobble>(world);
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
