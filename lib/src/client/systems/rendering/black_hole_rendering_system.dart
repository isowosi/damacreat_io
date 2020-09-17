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
  ],
  manager: [
    ViewProjectionMatrixManager,
    TagManager,
    CameraManager,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class BlackHoleRenderingSystem extends _$BlackHoleRenderingSystem {
  static const List<Attrib> attributes = [
    Attrib('aPosition', 2),
    Attrib('aSize', 1),
  ];
  Float32List values;
  Uint16List indices;

  final Texture texture;

  UniformLocation uViewProjectionLocation;
  UniformLocation uSizeLocation;
  UniformLocation uBackgroundLocation;

  BlackHoleRenderingSystem(RenderingContext gl)
      : texture = gl.createTexture(),
        super(gl);

  @override
  void initialize() {
    super.initialize();

    const textureUnit = 1;
    gl
      ..pixelStorei(WebGL.UNPACK_FLIP_Y_WEBGL, 1)
      ..activeTexture(WebGL.TEXTURE0 + textureUnit)
      ..bindTexture(WebGL.TEXTURE_2D, texture)
      ..texParameteri(
          WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.CLAMP_TO_EDGE)
      ..texParameteri(
          WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_T, WebGL.CLAMP_TO_EDGE)
      ..texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.NEAREST)
      ..texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MAG_FILTER, WebGL.NEAREST)
      ..useProgram(program)
      ..uniform1i(uBackgroundLocation, textureUnit);
  }

  @override
  bool processEntity(int index, int entity) {
    if (!onScreenTagSystem[entity]) {
      return false;
    }
    final position = positionMapper[entity];
    final size = sizeMapper[entity];
    final radius = size.radius;

    var offset = index * 3;
    values[offset++] = position.x;
    values[offset++] = position.y;
    values[offset++] = 1.2 *
        blackHoleGravityWellRadiusFactor *
        radius /
        cameraManager.scalingFactor;

    indices[index] = index;
    return true;
  }

  @override
  void render(int length) {
    bufferElements(attributes, values, indices);
    gl
      ..activeTexture(WebGL.TEXTURE0 + 1)
      ..bindTexture(WebGL.TEXTURE_2D, texture)
      ..uniform2f(uSizeLocation, gl.canvas.width, gl.canvas.height)
      ..uniformMatrix4fv(uViewProjectionLocation, false,
          create2dViewProjectionMatrix().storage);

    for (var i = 0; i < length; i++) {
      gl
        ..copyTexImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, 0, 0, gl.canvas.width,
            gl.canvas.height, 0)
        ..drawElements(WebGL.POINTS, 1, WebGL.UNSIGNED_SHORT, i * 2);
    }
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

  @override
  void initUniformLocations() {
    uViewProjectionLocation = getUniformLocation('uViewProjection');
    uSizeLocation = getUniformLocation('uSize');
    uBackgroundLocation = getUniformLocation('uBackground');
  }
}
