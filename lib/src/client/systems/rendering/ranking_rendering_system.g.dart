// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ranking_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$RankingRenderingSystem extends EntityProcessingSystem {
  Mapper<Player> playerMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Controller> controllerMapper;
  CameraManager cameraManager;
  _$RankingRenderingSystem()
      : super(Aspect.empty()..allOf([Player, Size, Color]));
  @override
  void initialize() {
    super.initialize();
    playerMapper = Mapper<Player>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    controllerMapper = Mapper<Controller>(world);
    cameraManager = world.getManager<CameraManager>();
  }
}
