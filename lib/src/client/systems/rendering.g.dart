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

abstract class _$CircleRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Wobble> wobbleMapper;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  TagManager tagManager;
  GroupManager groupManager;
  _$CircleRenderingSystem(RenderingContext gl, Aspect aspect)
      : super(gl, aspect..allOf([Position, Size, Color, Orientation, Wobble]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    orientationMapper = Mapper<Orientation>(world);
    wobbleMapper = Mapper<Wobble>(world);
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    tagManager = world.getManager<TagManager>();
    groupManager = world.getManager<GroupManager>();
  }
}

abstract class _$BackgroundRenderingSystemBase
    extends VoidWebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Camera> cameraMapper;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  TagManager tagManager;
  CameraManager cameraManager;
  _$BackgroundRenderingSystemBase(RenderingContext gl) : super(gl);
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    cameraMapper = Mapper<Camera>(world);
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    tagManager = world.getManager<TagManager>();
    cameraManager = world.getManager<CameraManager>();
  }
}

abstract class _$PlayerNameRenderingSystem extends EntityProcessingSystem {
  Mapper<Player> playerMapper;
  Mapper<Size> sizeMapper;
  Mapper<Position> positionMapper;
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  CameraManager cameraManager;
  SettingsManager settingsManager;
  TagManager tagManager;
  GroupManager groupManager;
  _$PlayerNameRenderingSystem()
      : super(Aspect.empty()..allOf([Player, Size, Position]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = Mapper<Player>(world);
    sizeMapper = Mapper<Size>(world);
    positionMapper = Mapper<Position>(world);
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
    cameraManager = world.getManager<CameraManager>();
    settingsManager = world.getManager<SettingsManager>();
    tagManager = world.getManager<TagManager>();
    groupManager = world.getManager<GroupManager>();
  }
}
