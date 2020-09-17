import 'dart:typed_data';
import 'dart:web_gl';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

part 'sprite_rendering_system.g.dart';

@Generate(
  WebGlRenderingSystem,
  allOf: [
    Position,
    Orientation,
    Color,
    Size,
    Renderable,
  ],
  manager: [
    TagManager,
    ViewProjectionMatrixManager,
  ],
)
abstract class SpriteRenderingSystem extends _$SpriteRenderingSystem {
  SpriteSheet sheet;

  static const List<Attrib> attributes = [
    Attrib('aPosition', 2),
    Attrib('aTexCoord', 2),
    Attrib('aColor', 4),
  ];
  Float32List values;
  Uint16List indices;

  UniformLocation uViewProjectionLocation;
  UniformLocation uSizeLocation;
  UniformLocation uSheetLocation;

  SpriteRenderingSystem(RenderingContext gl, this.sheet, Aspect aspect)
      : super(gl, aspect);

  @override
  void initialize() {
    super.initialize();

    final texture = gl.createTexture();
    const textureUnit = 0;

    gl
      ..activeTexture(WebGL.TEXTURE0 + textureUnit)
      ..bindTexture(WebGL.TEXTURE_2D, texture)
      ..pixelStorei(WebGL.UNPACK_FLIP_Y_WEBGL, 0)
      ..texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.LINEAR)
      ..texParameteri(
          WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.CLAMP_TO_EDGE)
      ..texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, WebGL.RGBA,
          WebGL.UNSIGNED_BYTE, sheet.image)
      ..useProgram(program)
      ..uniform1i(uSheetLocation, textureUnit)
      ..uniform2f(uSizeLocation, sheet.image.width, sheet.image.height);
  }

  @override
  bool processEntity(int index, int entity) {
    final position = positionMapper[entity];
    final orientation = orientationMapper[entity];
    final renderable = renderableMapper[entity];
    final size = sizeMapper[entity];
    final color = colorMapper[entity];
    final sprite = renderable.sprite;
    final dst = sprite.dst;
    final src = sprite.src;
    final left = src.left.toDouble() + 1;
    final right = src.right.toDouble() - 1;
    final dstMult = renderable.scale * size.radius;
    final dstLeft = dst.left * dstMult;
    final dstRight = dst.right * dstMult;
    final dstTop = dst.top * dstMult;
    final dstBottom = dst.bottom * dstMult;

    final bottom = src.bottom.toDouble();
    final top = src.top.toDouble();

    final bottomLeftAngle = atan2(dstBottom, dstLeft);
    final red = color.r;
    final green = color.g;
    final blue = color.b;
    final alpha = color.a;
    final x = position.x;
    final y = position.y;
    final angle = orientation.angle;
    var valueOffset = index * 32;
    values[valueOffset++] =
        x + dstLeft * cos(angle + bottomLeftAngle) / cos(bottomLeftAngle);
    values[valueOffset++] =
        y + dstBottom * sin(angle + bottomLeftAngle) / sin(bottomLeftAngle);
    values[valueOffset++] = left;
    values[valueOffset++] = bottom;
    values[valueOffset++] = red;
    values[valueOffset++] = green;
    values[valueOffset++] = blue;
    values[valueOffset++] = alpha;

    final bottomRightAngle = atan2(dstBottom, dstRight);
    values[valueOffset++] =
        x + dstRight * cos(angle + bottomRightAngle) / cos(bottomRightAngle);
    values[valueOffset++] =
        y + dstBottom * sin(angle + bottomRightAngle) / sin(bottomRightAngle);
    values[valueOffset++] = right;
    values[valueOffset++] = bottom;
    values[valueOffset++] = red;
    values[valueOffset++] = green;
    values[valueOffset++] = blue;
    values[valueOffset++] = alpha;

    final topLeftAngle = atan2(dstTop, dstLeft);
    values[valueOffset++] =
        x + dstLeft * cos(angle + topLeftAngle) / cos(topLeftAngle);
    values[valueOffset++] =
        y + dstTop * sin(angle + topLeftAngle) / sin(topLeftAngle);
    values[valueOffset++] = left;
    values[valueOffset++] = top;
    values[valueOffset++] = red;
    values[valueOffset++] = green;
    values[valueOffset++] = blue;
    values[valueOffset++] = alpha;

    final topRightAngle = atan2(dstTop, dstRight);
    values[valueOffset++] =
        x + dstRight * cos(angle + topRightAngle) / cos(topRightAngle);
    values[valueOffset++] =
        y + dstTop * sin(angle + topRightAngle) / sin(topRightAngle);
    values[valueOffset++] = right;
    values[valueOffset++] = top;
    values[valueOffset++] = red;
    values[valueOffset++] = green;
    values[valueOffset++] = blue;
    values[valueOffset++] = alpha;

    var indicesOffset = index * 6;
    indices[indicesOffset++] = index * 4;
    indices[indicesOffset++] = index * 4 + 2;
    indices[indicesOffset++] = index * 4 + 3;
    indices[indicesOffset++] = index * 4;
    indices[indicesOffset++] = index * 4 + 3;
    indices[indicesOffset++] = index * 4 + 1;

    return true;
  }

  @override
  void render(int length) {
    bufferElements(attributes, values, indices);

    gl
      ..uniformMatrix4fv(uViewProjectionLocation, false,
          create2dViewProjectionMatrix().storage)
      ..drawElements(WebGL.TRIANGLES, length * 6, WebGL.UNSIGNED_SHORT, 0);
  }

  Matrix4 create2dViewProjectionMatrix() => viewProjectionMatrixManager
      .create2dViewProjectionMatrix(tagManager.getEntity(cameraTag));

  @override
  void updateLength(int length) {
    values = Float32List(length * 8 * 2 * 2);
    indices = Uint16List(length * 6);
  }

  @override
  String get vShaderFile => 'SpriteRenderingSystem';

  @override
  String get fShaderFile => 'SpriteRenderingSystem';

  @override
  void initUniformLocations() {
    uViewProjectionLocation = getUniformLocation('uViewProjection');
    uSizeLocation = getUniformLocation('uSize');
    uSheetLocation = getUniformLocation('uSheet');
  }
}

@Generate(
  SpriteRenderingSystem,
  allOf: [
    QuadTreeCandidate,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class QuadTreeCandidateSpriteRenderingSystem
    extends _$QuadTreeCandidateSpriteRenderingSystem {
  QuadTreeCandidateSpriteRenderingSystem(RenderingContext gl, SpriteSheet sheet)
      : super(gl, sheet);

  @override
  bool processEntity(int index, int entity) {
    if (onScreenTagSystem[entity]) {
      return super.processEntity(index, entity);
    }
    return false;
  }
}

@Generate(
  SpriteRenderingSystem,
  exclude: [
    QuadTreeCandidate,
  ],
)
class ParticleSpriteRenderingSystem extends _$ParticleSpriteRenderingSystem {
  ParticleSpriteRenderingSystem(RenderingContext gl, SpriteSheet sheet)
      : super(gl, sheet);
}
