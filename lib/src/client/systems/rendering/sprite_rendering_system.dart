import 'dart:web_gl';

import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

part 'sprite_rendering_system.g.dart';

@Generate(WebGlSpriteRenderingSystem)
class SpriteRenderingSystem extends _$SpriteRenderingSystem {
  SpriteRenderingSystem(RenderingContext gl, SpriteSheet sheet)
      : super(gl, sheet);
}
