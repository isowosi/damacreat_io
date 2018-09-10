// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rendering.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$PlayerRenderingSystem extends CircleRenderingSystem {
  Mapper<Player> playerMapper;
  Mapper<CellWall> cellWallMapper;
  _$PlayerRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.empty()..allOf([Player, CellWall]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = Mapper<Player>(world);
    cellWallMapper = Mapper<CellWall>(world);
  }
}

abstract class _$FoodRenderingSystem extends WebGlRenderingSystem {
  Mapper<Food> foodMapper;
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<OnScreen> onScreenMapper;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  _$FoodRenderingSystem(RenderingContext gl)
      : super(gl, Aspect.empty()..allOf([Food, Position, Size, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    foodMapper = Mapper<Food>(world);
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    onScreenMapper = Mapper<OnScreen>(world);
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
  }
}

abstract class _$CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Wobble> wobbleMapper;
  Mapper<OnScreen> onScreenMapper;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  _$CircleRenderingSystem(RenderingContext gl, Aspect aspect)
      : super(
            gl,
            aspect
              ..allOf([Position, Size, Color, Orientation, Wobble, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    orientationMapper = Mapper<Orientation>(world);
    wobbleMapper = Mapper<Wobble>(world);
    onScreenMapper = Mapper<OnScreen>(world);
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
  _$BackgroundRenderingSystemBase(RenderingContext gl) : super(gl);
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

abstract class _$RankingRenderingSystem extends EntityProcessingSystem {
  Mapper<Player> playerMapper;
  Mapper<Size> sizeMapper;
  TagManager tagManager;
  CameraManager cameraManager;
  _$RankingRenderingSystem() : super(Aspect.empty()..allOf([Player, Size]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = Mapper<Player>(world);
    sizeMapper = Mapper<Size>(world);
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}
