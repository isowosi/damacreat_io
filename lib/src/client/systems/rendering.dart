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

    items[itemOffset] = position.x * cameraManager.width;
    items[itemOffset + 1] = position.y * cameraManager.height;
    items[itemOffset + 2] = (position.x + 0.01) * cameraManager.width;
    items[itemOffset + 3] = position.y * cameraManager.height;
    items[itemOffset + 4] = position.x * cameraManager.width;
    items[itemOffset + 5] = (position.y + 0.01) * cameraManager.height;
    items[itemOffset + 6] = (position.x + 0.01) * cameraManager.width;
    items[itemOffset + 7] = (position.y + 0.01) * cameraManager.height;

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
