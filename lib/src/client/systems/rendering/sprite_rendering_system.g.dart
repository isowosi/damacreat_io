// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sprite_rendering_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$SpriteRenderingSystem extends WebGlRenderingSystem {
  Mapper<Position> positionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Color> colorMapper;
  Mapper<Size> sizeMapper;
  Mapper<Renderable> renderableMapper;
  TagManager tagManager;
  WebGlViewProjectionMatrixManager webGlViewProjectionMatrixManager;
  _$SpriteRenderingSystem(RenderingContext gl)
      : super(
            gl,
            Aspect.empty()
              ..allOf([Position, Orientation, Color, Size, Renderable]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    colorMapper = Mapper<Color>(world);
    sizeMapper = Mapper<Size>(world);
    renderableMapper = Mapper<Renderable>(world);
    tagManager = world.getManager<TagManager>();
    webGlViewProjectionMatrixManager =
        world.getManager<WebGlViewProjectionMatrixManager>();
  }
}
