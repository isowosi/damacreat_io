import 'dart:typed_data';
import 'dart:web_gl';

import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

part 'sprite_rendering_system.g.dart';

@Generate(WebGlRenderingSystem,
    allOf: [Position, Orientation, Color, Renderable],
    manager: [TagManager, WebGlViewProjectionMatrixManager])
class SpriteRenderingSystem extends _$SpriteRenderingSystem {
  SpriteSheet sheet;

  static const List<Attrib> attributes = [
    Attrib('aPosition', 2),
    Attrib('aTexCoord', 2),
    Attrib('aColor', 4),
  ];
  Float32List values;
  Uint16List indices;

  SpriteRenderingSystem(RenderingContext gl, this.sheet) : super(gl);

  @override
  void initialize() {
    super.initialize();

    final texture = gl.createTexture();
    final uTexture = gl.getUniformLocation(program, 'uTexture');

    gl
      ..useProgram(program)
      ..pixelStorei(WebGL.UNPACK_FLIP_Y_WEBGL, 0)
      ..activeTexture(WebGL.TEXTURE0)
      ..bindTexture(WebGL.TEXTURE_2D, texture)
      ..texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.LINEAR)
      ..texParameteri(
          WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.CLAMP_TO_EDGE)
      ..texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, WebGL.RGBA,
          WebGL.UNSIGNED_BYTE, sheet.image)
      ..uniform1i(uTexture, 0)
      ..uniform2f(gl.getUniformLocation(program, 'uSize'), sheet.image.width,
          sheet.image.height);
  }

  @override
  void processEntity(int index, Entity entity) {
    final p = getPosition(entity);
    final o = orientationMapper[entity];
    final r = renderableMapper[entity];
    final color = colorMapper[entity];
    final sprite = sheet.sprites[r.spriteName];
    final dst = sprite.dst;
    final src = sprite.src;
    final left = src.left.toDouble() + 1.0;
    final right = src.right.toDouble() - 1.0;
    final dstLeft = (dst.left * r.scale).toInt();
    final dstRight = (dst.right * r.scale).toInt();
    final dstTop = (dst.top * r.scale).toInt();
    final dstBottom = (dst.bottom * r.scale).toInt();

    final bottom = src.bottom.toDouble();
    final top = src.top.toDouble();

    final bottomLeftAngle = atan2(dstBottom, dstLeft);
    var valueOffset = index * 32;
    values[valueOffset++] =
        p.x + dstLeft * cos(o.angle + bottomLeftAngle) / cos(bottomLeftAngle);
    values[valueOffset++] =
        p.y + dstBottom * sin(o.angle + bottomLeftAngle) / sin(bottomLeftAngle);
    values[valueOffset++] = left;
    values[valueOffset++] = bottom;
    values[valueOffset++] = color.r;
    values[valueOffset++] = color.g;
    values[valueOffset++] = color.b;
    values[valueOffset++] = color.a;

    final bottomRightAngle = atan2(dstBottom, dstRight);
    values[valueOffset++] = p.x +
        dstRight * cos(o.angle + bottomRightAngle) / cos(bottomRightAngle);
    values[valueOffset++] = p.y +
        dstBottom * sin(o.angle + bottomRightAngle) / sin(bottomRightAngle);
    values[valueOffset++] = right;
    values[valueOffset++] = bottom;
    values[valueOffset++] = color.r;
    values[valueOffset++] = color.g;
    values[valueOffset++] = color.b;
    values[valueOffset++] = color.a;

    final topLeftAngle = atan2(dstTop, dstLeft);
    values[valueOffset++] =
        p.x + dstLeft * cos(o.angle + topLeftAngle) / cos(topLeftAngle);
    values[valueOffset++] =
        p.y + dstTop * sin(o.angle + topLeftAngle) / sin(topLeftAngle);
    values[valueOffset++] = left;
    values[valueOffset++] = top;
    values[valueOffset++] = color.r;
    values[valueOffset++] = color.g;
    values[valueOffset++] = color.b;
    values[valueOffset++] = color.a;

    final topRightAngle = atan2(dstTop, dstRight);
    values[valueOffset++] =
        p.x + dstRight * cos(o.angle + topRightAngle) / cos(topRightAngle);
    values[valueOffset++] =
        p.y + dstTop * sin(o.angle + topRightAngle) / sin(topRightAngle);
    values[valueOffset++] = right;
    values[valueOffset++] = top;
    values[valueOffset++] = color.r;
    values[valueOffset++] = color.g;
    values[valueOffset++] = color.b;
    values[valueOffset++] = color.a;

    var indicesOffset = index * 6;
    indices[indicesOffset++] = index * 4;
    indices[indicesOffset++] = index * 4 + 2;
    indices[indicesOffset++] = index * 4 + 3;
    indices[indicesOffset++] = index * 4;
    indices[indicesOffset++] = index * 4 + 3;
    indices[indicesOffset++] = index * 4 + 1;
  }

  Position getPosition(Entity entity) => positionMapper[entity];

  @override
  void render(int length) {
    bufferElements(attributes, values, indices);

    gl
      ..uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
          false, create2dViewProjectionMatrix().storage)
      ..drawElements(WebGL.TRIANGLES, length * 6, WebGL.UNSIGNED_SHORT, 0);
  }

  Matrix4 create2dViewProjectionMatrix() =>
      webGlViewProjectionMatrixManager.create2dViewProjectionMatrix();

  @override
  void updateLength(int length) {
    values = Float32List(length * 8 * 2 * 2);
    indices = Uint16List(length * 6);
  }

  @override
  String get vShaderFile => 'SpriteRenderingSystem';

  @override
  String get fShaderFile => 'SpriteRenderingSystem';
}
