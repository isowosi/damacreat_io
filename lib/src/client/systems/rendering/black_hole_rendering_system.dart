import 'dart:typed_data';
import 'dart:web_gl';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

part 'black_hole_rendering_system.g.dart';

@Generate(
  WebGlRenderingSystem,
  allOf: [
    Position,
    Size,
    BlackHole,
    OnScreen,
  ],
  manager: [
    ViewProjectionMatrixManager,
    TagManager,
    CameraManager,
  ],
)
class BlackHoleRenderingSystem extends _$BlackHoleRenderingSystem {
  static const List<Attrib> attributes = [
    Attrib('aPosition', 2),
    Attrib('aSize', 1),
  ];
  Float32List values;
  Uint16List indices;

  BlackHoleRenderingSystem(RenderingContext gl) : super(gl);

  @override
  void processEntity(int index, Entity entity) {
    final position = positionMapper[entity];
    final size = sizeMapper[entity];
    final radius = size.radius;

    var offset = index * 3;
    values[offset++] = position.x;
    values[offset++] = position.y;
    values[offset++] = 2 *
        blackHoleGravityWellRadiusFactor *
        radius /
        cameraManager.scalingFactor;

    indices[index] = index;
  }

  @override
  void render(int length) {
    final texture = gl.createTexture();
    final uBackground = gl.getUniformLocation(program, 'uBackground');

    gl
      ..activeTexture(WebGL.TEXTURE1)
      ..pixelStorei(WebGL.UNPACK_FLIP_Y_WEBGL, 1)
      ..bindTexture(WebGL.TEXTURE_2D, texture)
      ..texParameteri(
          WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.CLAMP_TO_EDGE)
      ..texParameteri(
          WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_T, WebGL.CLAMP_TO_EDGE)
      ..texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.LINEAR)
      ..texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, WebGL.RGBA,
          WebGL.UNSIGNED_BYTE, gl.canvas)
      ..uniform1i(uBackground, 1)
      ..uniform2f(gl.getUniformLocation(program, 'uSize'), gl.canvas.width,
          gl.canvas.height);

    bufferElements(attributes, values, indices);

    gl
      ..uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
          false, create2dViewProjectionMatrix().storage)
      ..drawElements(WebGL.POINTS, length, WebGL.UNSIGNED_SHORT, 0);
  }

  Matrix4 create2dViewProjectionMatrix() => viewProjectionMatrixManager
      .create2dViewProjectionMatrix(tagManager.getEntity(cameraTag));

  @override
  void updateLength(int length) {
    values = Float32List(length * 3);
    indices = Uint16List(length);
  }

  @override
  String get vShaderFile => 'BlackHoleRenderingSystem';

  @override
  String get fShaderFile => 'BlackHoleRenderingSystem';
}
