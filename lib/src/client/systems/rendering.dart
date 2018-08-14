import 'dart:typed_data';
import 'dart:web_gl';

import 'package:gamedev_helpers/gamedev_helpers.dart';

part 'rendering.g.dart';

@Generate(
  WebGlRenderingSystem,
  allOf: [
    Position,
  ],
  manager: [
    CameraManager,
    WebGlViewProjectionMatrixManager,
  ],
)
class PositionRenderingSystem extends _$PositionRenderingSystem {
  List<Attrib> attributes;

  Float32List items;
  Uint16List indices;

  PositionRenderingSystem(RenderingContext2 gl) : super(gl) {
    attributes = const [Attrib('pos', 2)];
  }

  @override
  void processEntity(int index, Entity entity) {
    final position = positionMapper[entity];
    final itemOffset = index * 2 * 4;
    final indexOffset = index * 3 * 2;
    final vertexOffset = index * 4;

    items[itemOffset] = position.x;
    items[itemOffset + 1] = position.y;
    items[itemOffset + 2] = position.x + 0.01 * cameraManager.width;
    items[itemOffset + 3] = position.y;
    items[itemOffset + 4] = position.x;
    items[itemOffset + 5] = position.y + 0.01 * cameraManager.height;
    items[itemOffset + 6] = position.x + 0.01 * cameraManager.width;
    items[itemOffset + 7] = position.y + 0.01 * cameraManager.height;

    indices[indexOffset] = vertexOffset;
    indices[indexOffset + 1] = vertexOffset + 1;
    indices[indexOffset + 2] = vertexOffset + 2;
    indices[indexOffset + 3] = vertexOffset + 1;
    indices[indexOffset + 4] = vertexOffset + 3;
    indices[indexOffset + 5] = vertexOffset + 2;
  }

  @override
  void render(int length) {
    gl.uniformMatrix4fv(
        gl.getUniformLocation(program, 'viewProjectionMatrix'),
        false,
        webGlViewProjectionMatrixManager
            .create2dViewProjectionMatrix()
            .storage);

    drawTriangles(attributes, items, indices);
  }

  @override
  void updateLength(int length) {
    items = Float32List(length * 2 * 4);
    indices = Uint16List(length * 3 * 2);
  }

  @override
  String get vShaderFile => 'PositionRenderingSystem';
  @override
  String get fShaderFile => 'PositionRenderingSystem';
}

@Generate(
  VoidWebGlRenderingSystem,
  manager: [
    WebGlViewProjectionMatrixManager,
    TagManager,
    CameraManager,
  ],
  mapper: [
    Position,
  ],
)
class BackgroundRenderingSystemBase extends _$BackgroundRenderingSystemBase {
  double offsetX = -500000 + random.nextDouble() * 1000000.0;
  double offsetY = -500000 + random.nextDouble() * 1000000.0;
  Float32List rgb = new Float32List.fromList([0.0, 0.0, 0.0]);
  double parallaxFactor = 1.0;

  BackgroundRenderingSystemBase(RenderingContext2 gl) : super(gl);

  @override
  void render() {
    final p = positionMapper[tagManager.getEntity(playerTag)];
    final zoom = 1.0;
    final size = max(cameraManager.width, cameraManager.height) / zoom;
    final px = p.x * parallaxFactor;
    final py = p.y * parallaxFactor;
    final background = Float32List.fromList([
      -size / 2 + px + offsetX,
      -size / 2 + py + offsetY,
      -size / 2 + px + offsetX,
      size / 2 + py + offsetY,
      size / 2 + px + offsetX,
      size / 2 + py + offsetY,
      size / 2 + px + offsetX,
      -size / 2 + py + offsetY
    ]);
    final viewProjectionMatrix = webGlViewProjectionMatrixManager
        .create2dViewProjectionMatrixForPosition(px, py)
          ..translate(px, py)
          ..scale(zoom, zoom)
          ..translate(-px, -py)
          ..translate(-offsetX, -offsetY);

    gl
      ..uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
          false, viewProjectionMatrix.storage)
      ..uniform4f(
          gl.getUniformLocation(program, 'uDimension'),
          cameraManager.width.toDouble(),
          cameraManager.height.toDouble(),
          0.0,
          0.0)
      ..uniform4f(
          gl.getUniformLocation(program, 'uPosition'), p.x, p.y, 0.0, 0.0)
      ..uniform3fv(gl.getUniformLocation(program, 'uRgb'), rgb)
      ..uniform1f(gl.getUniformLocation(program, 'uTime'), time);
    buffer('aPosition', background, 2);
    gl.drawArrays(WebGL.TRIANGLE_FAN, 0, 4);
  }

  @override
  String get vShaderFile => 'BackgroundRenderingSystem';
  @override
  String get fShaderFile => 'BackgroundRenderingSystem';
}

class BackgroundRenderingSystemLayer0 extends BackgroundRenderingSystemBase {
  BackgroundRenderingSystemLayer0(RenderingContext2 gl) : super(gl) {
    rgb[0] = random.nextDouble();
    rgb[1] = random.nextDouble();
    rgb[2] = random.nextDouble();
    parallaxFactor = 0.4;
  }
}
