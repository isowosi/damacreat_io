import 'dart:typed_data';
import 'dart:web_gl';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

part 'rendering.g.dart';

@Generate(
  CircleRenderingSystem,
  allOf: [
    Player,
    CellWall,
  ],
)
class PlayerRenderingSystem extends _$PlayerRenderingSystem {
  final int trianglePerFragment = 3;

  PlayerRenderingSystem(RenderingContext2 gl) : super(gl);

  @override
  int get verticeCount => circleFragments * 2;

  @override
  void processEntity(int index, Entity entity) {
    final p = positionMapper[entity];
    final s = sizeMapper[entity];
    final c = colorMapper[entity];
    final o = orientationMapper[entity];
    final w = wobbleMapper[entity];
    final cw = cellWallMapper[entity];

    final itemOffset = index * (verticeCount + 1);
    final offset = index * (verticeCount + 1) * valuesPerItem;
    final indicesOffset = index * verticeCount * 3 * trianglePerFragment;

    items[offset] = p.x;
    items[offset + 1] = p.y;
    items[offset + 2] = c.r;
    items[offset + 3] = c.g;
    items[offset + 4] = c.b;
    items[offset + 5] = c.a / 2;
    for (var i = 0; i < circleFragments; i++) {
      var baseOffset = offset + valuesPerItem + valuesPerItem * i;
      var radius = (s.radius - cw.baseStrength * cw.strengthFactor[i]) *
          w.wobbleFactor[i];
      final angle = o.angle + 2 * pi * i / circleFragments;
      createCircleVertex(
          baseOffset, p, radius, angle, c, i, indicesOffset, itemOffset);
      items[baseOffset + 5] /= w.wobbleFactor[i];

      // inner triangle
      indices[indicesOffset + i * 9] = itemOffset;
      indices[indicesOffset + i * 9 + 1] = itemOffset + 1 + i;
      indices[indicesOffset + i * 9 + 2] = itemOffset + 2 + i;

      baseOffset = offset +
          valuesPerItem +
          valuesPerItem * i +
          circleFragments * valuesPerItem;
      radius = s.radius * w.wobbleFactor[i];
      createCircleVertex(
          baseOffset, p, radius, angle, c, i, indicesOffset, itemOffset);
      items[baseOffset + 5] = 1.0 * cw.strengthFactor[i];

      // triangle 1 of cell wall
      indices[indicesOffset + i * 9 + 3] = itemOffset + 1 + i;
      indices[indicesOffset + i * 9 + 4] = itemOffset + circleFragments + 1 + i;
      indices[indicesOffset + i * 9 + 5] = itemOffset + circleFragments + 2 + i;
      // triangle 2 of cell wall
      indices[indicesOffset + i * 9 + 6] = itemOffset + 1 + i;
      indices[indicesOffset + i * 9 + 7] = itemOffset + 2 + i;
      indices[indicesOffset + i * 9 + 8] = itemOffset + circleFragments + 2 + i;
    }
    createThrusters(offset, s, w, cw, o, p);

    indices[indicesOffset + circleFragments * 9 - 1] =
        itemOffset + circleFragments + 1;
    indices[indicesOffset + circleFragments * 9 - 2] = itemOffset + 1;
    indices[indicesOffset + circleFragments * 9 - 4] =
        itemOffset + circleFragments + 1;
    indices[indicesOffset + circleFragments * 9 - 7] = itemOffset + 1;
  }

  void createThrusters(
      int offset, Size s, Wobble w, CellWall cw, Orientation o, Position p) {
    var i = (3 / 8 * circleFragments).truncate();
    createThruster(offset, i, s, w, cw, o, p);
    i = (5 / 8 * circleFragments).truncate();
    createThruster(offset, i, s, w, cw, o, p);
  }

  void createThruster(int offset, int i, Size s, Wobble w, CellWall cw,
      Orientation o, Position p) {
    var baseOffset = offset + valuesPerItem + valuesPerItem * i;
    var radius =
        (s.radius - cw.baseStrength * cw.strengthFactor[i]) * w.wobbleFactor[i];
    final angle = o.angle + 2 * pi * i / circleFragments;
    items[baseOffset] = p.x + radius * 1.1 * cos(angle);
    items[baseOffset + 1] = p.y + radius * 1.1 * sin(angle);

    baseOffset = offset +
        valuesPerItem +
        valuesPerItem * i +
        circleFragments * valuesPerItem;
    radius = s.radius * w.wobbleFactor[i];
    items[baseOffset] = p.x + radius * 1.1 * cos(angle);
    items[baseOffset + 1] = p.y + radius * 1.1 * sin(angle);
  }

  @override
  void updateLength(int length) {
    items = Float32List(length * (verticeCount + 1) * valuesPerItem);
    indices = Uint16List(length * circleFragments * 3 * trianglePerFragment);
  }
}

@Generate(
  CircleRenderingSystem,
  allOf: [
    Food,
  ],
)
class FoodRenderingSystem extends _$FoodRenderingSystem {
  FoodRenderingSystem(RenderingContext2 gl) : super(gl);

  @override
  void processEntity(int index, Entity entity) {
    super.processEntity(index, entity);
    final offset = index * (verticeCount + 1) * valuesPerItem;
    final c = colorMapper[entity];
    items[offset + 5] = c.a;
  }
}

@Generate(
  WebGlRenderingSystem,
  allOf: [
    Position,
    Size,
    Color,
    Orientation,
    Wobble,
  ],
  manager: [
    WebGlViewProjectionMatrixManager,
  ],
)
class CircleRenderingSystem extends _$CircleRenderingSystem {
  Float32List items;
  Uint16List indices;
  final List<Attrib> attributes = const [
    Attrib('aPosition', 2),
    Attrib('aColor', 4)
  ];

  final int verticeCount = circleFragments;
  final int valuesPerItem = 6;

  CircleRenderingSystem(RenderingContext2 gl, Aspect aspect)
      : super(gl, aspect);

  @override
  void processEntity(int index, Entity entity) {
    final p = positionMapper[entity];
    final s = sizeMapper[entity];
    final c = colorMapper[entity];
    final o = orientationMapper[entity];
    final w = wobbleMapper[entity];

    final itemOffset = index * (verticeCount + 1);
    final offset = index * (verticeCount + 1) * valuesPerItem;
    final indicesOffset = index * verticeCount * 3;

    items[offset] = p.x;
    items[offset + 1] = p.y;
    items[offset + 2] = c.r;
    items[offset + 3] = c.g;
    items[offset + 4] = c.b;
    items[offset + 5] = c.a / 2;
    for (var i = 0; i < verticeCount; i++) {
      final baseOffset = offset + valuesPerItem + valuesPerItem * i;
      final radius = s.radius * w.wobbleFactor[i];
      final angle = o.angle + 2 * pi * i / verticeCount;
      createCircleVertex(
          baseOffset, p, radius, angle, c, i, indicesOffset, itemOffset);

      indices[indicesOffset + i * 3] = itemOffset;
      indices[indicesOffset + i * 3 + 1] = itemOffset + 1 + i;
      indices[indicesOffset + i * 3 + 2] = itemOffset + 2 + i;
    }

    indices[indicesOffset + verticeCount * 3 - 1] = itemOffset + 1;
  }

  void createCircleVertex(int baseOffset, Position p, double radius,
      double angle, Color c, int i, int indicesOffset, int itemOffset) {
    items[baseOffset] = p.x + radius * cos(angle);
    items[baseOffset + 1] = p.y + radius * sin(angle);
    items[baseOffset + 2] = c.r;
    items[baseOffset + 3] = c.g;
    items[baseOffset + 4] = c.b;
    final alphaFactor =
        (i - circleFragments ~/ 2).abs() / (circleFragments ~/ 2);
    items[baseOffset + 5] = c.a + 0.5 * alphaFactor * alphaFactor;
  }

  @override
  void render(int length) {
    gl.uniformMatrix4fv(
        gl.getUniformLocation(program, 'uViewProjection'),
        false,
        webGlViewProjectionMatrixManager
            .create2dViewProjectionMatrix()
            .storage);

    drawTriangles(attributes, items, indices);
  }

  @override
  void updateLength(int length) {
    items = Float32List(length * (verticeCount + 1) * valuesPerItem);
    indices = Uint16List(length * verticeCount * 3);
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
  Float32List rgb = Float32List.fromList([0.0, 0.0, 0.0]);
  double parallaxFactor = 1.0;

  BackgroundRenderingSystemBase(RenderingContext2 gl) : super(gl);

  @override
  void render() {
    const zoom = 1.0;
    final p = positionMapper[tagManager.getEntity(playerTag)];
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
