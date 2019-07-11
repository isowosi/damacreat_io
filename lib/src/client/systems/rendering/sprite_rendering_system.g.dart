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
  ViewProjectionMatrixManager viewProjectionMatrixManager;
  _$SpriteRenderingSystem(RenderingContext gl, Aspect aspect)
      : super(gl,
            aspect..allOf([Position, Orientation, Color, Size, Renderable]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    colorMapper = Mapper<Color>(world);
    sizeMapper = Mapper<Size>(world);
    renderableMapper = Mapper<Renderable>(world);
    tagManager = world.getManager<TagManager>();
    viewProjectionMatrixManager =
        world.getManager<ViewProjectionMatrixManager>();
  }
}

abstract class _$QuadTreeCandidateSpriteRenderingSystem
    extends SpriteRenderingSystem {
  Mapper<QuadTreeCandidate> quadTreeCandidateMapper;
  OnScreenTagSystem onScreenTagSystem;
  _$QuadTreeCandidateSpriteRenderingSystem(
      RenderingContext gl, SpriteSheet sheet)
      : super(gl, sheet, Aspect.empty()..allOf([QuadTreeCandidate]));
  @override
  void initialize() {
    super.initialize();
    quadTreeCandidateMapper = Mapper<QuadTreeCandidate>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
  }
}

abstract class _$ParticleSpriteRenderingSystem extends SpriteRenderingSystem {
  _$ParticleSpriteRenderingSystem(RenderingContext gl, SpriteSheet sheet)
      : super(gl, sheet, Aspect.empty()..exclude([QuadTreeCandidate]));
}
