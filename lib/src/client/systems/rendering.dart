import 'dart:html';
import 'dart:typed_data';
import 'dart:web_gl';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
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

  PlayerRenderingSystem(RenderingContext gl) : super(gl);

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
    final indicesOffset = index * indicesPerItem;

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
      items[baseOffset + 5] = cw.strengthFactor[i];

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
    indices = Uint16List(length * indicesPerItem);
  }

  @override
  int get indicesPerItem => circleFragments * 3 * trianglePerFragment;

  @override
  int get circleFragments => playerCircleFragments;
}

@Generate(
  WebGlRenderingSystem,
  allOf: [
    Position,
    Size,
    Color,
    Orientation,
    Wobble,
    OnScreen,
  ],
  manager: [
    WebGlViewProjectionMatrixManager,
    TagManager,
  ],
)
abstract class CircleRenderingSystem extends _$CircleRenderingSystem {
  Float32List items;
  Uint16List indices;
  final List<Attrib> attributes = const [
    Attrib('aPosition', 2),
    Attrib('aColor', 4)
  ];

  int verticeCount;
  final int valuesPerItem = 6;

  CircleRenderingSystem(RenderingContext gl, Aspect aspect)
      : super(gl, aspect) {
    verticeCount = circleFragments;
  }

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
            .create2dViewProjectionMatrix(tagManager.getEntity(cameraTag))
            .storage);

    bufferElements(attributes, items, indices);
    gl.drawElements(
        WebGL.TRIANGLES, length * indicesPerItem, WebGL.UNSIGNED_SHORT, 0);
  }

  @override
  void updateLength(int length) {
    items = Float32List(length * (verticeCount + 1) * valuesPerItem);
    indices = Uint16List(length * indicesPerItem);
  }

  int get indicesPerItem => verticeCount * 3;

  @override
  String get vShaderFile => 'PositionRenderingSystem';

  @override
  String get fShaderFile => 'PositionRenderingSystem';

  int get circleFragments;
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
    Camera,
  ],
)
class BackgroundRenderingSystemBase extends _$BackgroundRenderingSystemBase {
  double offsetX = -500000 + random.nextDouble() * 1000000;
  double offsetY = -500000 + random.nextDouble() * 1000000;
  Float32List rgb = Float32List.fromList([0, 0, 0]);
  double parallaxFactor = 1;

  BackgroundRenderingSystemBase(RenderingContext gl) : super(gl);

  @override
  void render() {
    final zoom = cameraManager.gameZoom;
    final cameraEntity = tagManager.getEntity(cameraTag);
    final position = positionMapper[cameraEntity];
    final camera = cameraMapper[cameraEntity];
    final width = cameraManager.width * zoom;
    final height = cameraManager.height * zoom;
    final px = position.x * parallaxFactor;
    final py = position.y * parallaxFactor;
    final background = Float32List.fromList([
      -width / 2 + px + offsetX,
      -height / 2 + py + offsetY,
      -width / 2 + px + offsetX,
      height / 2 + py + offsetY,
      width / 2 + px + offsetX,
      height / 2 + py + offsetY,
      width / 2 + px + offsetX,
      -height / 2 + py + offsetY
    ]);
    final viewProjectionMatrix = webGlViewProjectionMatrixManager
        .create2dViewProjectionMatrixForPosition(px, py, camera.zoom)
          ..translate(-offsetX, -offsetY);

    gl
      ..uniformMatrix4fv(gl.getUniformLocation(program, 'uViewProjection'),
          false, viewProjectionMatrix.storage)
      ..uniform4f(gl.getUniformLocation(program, 'uDimension'),
          cameraManager.width.toDouble(), cameraManager.height.toDouble(), 0, 0)
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
  BackgroundRenderingSystemLayer0(RenderingContext gl) : super(gl) {
    rgb[0] = random.nextDouble();
    rgb[1] = random.nextDouble();
    rgb[2] = random.nextDouble();
    parallaxFactor = 0.4;
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Player,
    Size,
    Position,
    OnScreen,
  ],
  manager: [
    WebGlViewProjectionMatrixManager,
    CameraManager,
    SettingsManager,
    TagManager,
  ],
)
class PlayerNameRenderingSystem extends _$PlayerNameRenderingSystem {
  CanvasRenderingContext2D ctx;
  PlayerNameRenderingSystem(this.ctx);

  @override
  void processEntity(Entity entity) {
    final cameraEntity = tagManager.getEntity(cameraTag);
    final nickname = playerMapper[entity].nickname;
    final radius = sizeMapper[entity].radius;
    final position = positionMapper[entity];

    final inverse = webGlViewProjectionMatrixManager
        .create2dViewProjectionMatrix(cameraEntity)
          ..invert();
    final leftTop = inverse.transformed(Vector4(-1, -1, 0, 1));
    final rightBottom = inverse.transformed(Vector4(1, 1, 0, 1));
    final scaling = cameraManager.clientWidth / (rightBottom.x - leftTop.x);
    ctx
      ..save()
      ..transform(scaling, 0, 0, scaling, -leftTop.x * scaling,
          (cameraManager.clientHeight / scaling + leftTop.y) * scaling)
      ..font = '${max(14, cameraManager.scalingFactor * radius / 3)}px Roboto'
      ..textBaseline = 'top'
      ..fillStyle = 'white';
    final nicknameWidth = ctx.measureText(nickname).width;
    ctx
      ..fillText(nickname, position.x - nicknameWidth / 2, -position.y)
      ..restore();
  }

  @override
  bool checkProcessing() => settingsManager.showNicknames;
}
