import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;

part 'debug.g.dart';

@Generate(
  VoidEntitySystem,
  mapper: [
    Food,
    Position,
  ],
  manager: [
    QuadTreeManager,
    ViewProjectionMatrixManager,
    CameraManager,
    SettingsManager,
    TagManager,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class DebugSystem extends _$DebugSystem {
  final CanvasRenderingContext2D ctx;
  final WebSocketHandler webSocketHandler;
  int byteCount = 0;
  double totalDelta = 0;
  double lastPingTime = 0;
  double ping;
  DebugSystem(this.ctx, this.webSocketHandler) {
    _countBytes();
  }

  void _countBytes() {
    webSocketHandler.on.listen((message) {
      byteCount += message.reader.length;
      if (message.type == messagePong) {
        ping = window.performance.now() - lastPingTime;
      }
    });
  }

  @override
  void processSystem() {
    final renderedCircles = onScreenTagSystem.onScreenCount;
    final movingThings = world.componentManager
        .getComponentsByType<Velocity>(
            ComponentTypeManager.getTypeFor(Velocity))
        .where((component) => component != null)
        .length;
    final totalDeltaBefore = totalDelta;
    totalDelta += world.delta;
    if (totalDeltaBefore.toInt() % 5 == 4 && totalDelta.toInt() % 5 == 0) {
      lastPingTime = window.performance.now();
      webSocketHandler
          .sendData(Uint8ListWriter.clientToServer(MessageToServer.ping));
    }
    final leaves = quadTreeManager.getLeaves().toList();

    final inverse = viewProjectionMatrixManager
        .create2dViewProjectionMatrix(tagManager.getEntity(cameraTag))
          ..invert();
    final leftTop = inverse.transformed(Vector4(-1, -1, 0, 1));
    final rightBottom = inverse.transformed(Vector4(1, 1, 0, 1));
    final visibleLeaves = leaves.where((leaf) => leaf.bounds.intersects(
        Rectangle(leftTop.x, leftTop.y, rightBottom.x - leftTop.x,
            rightBottom.y - leftTop.y)));
    final viewportWidth = cameraManager.clientWidth;
    final viewportHeight = cameraManager.clientHeight;
    ctx
      ..save()
      ..font = '10px Roboto'
      ..textBaseline = 'top'
      ..fillStyle = 'grey'
      ..strokeStyle = 'grey'
      ..fillText('Entities: ${world.entityManager.activeEntityCount}', 5, 15)
      ..fillText('Rendered circles: $renderedCircles', 5, 25)
      ..fillText('Moving entities: $movingThings', 5, 35)
      ..fillText('''
QuadTree leaves (visible/total): ${visibleLeaves.length}/${leaves.length}''', 5,
          45)
      ..fillText('Received: ${(byteCount / 1024).toStringAsFixed(3)}kB', 5, 55)
      ..fillText('''
Rate ${(byteCount / 1024 / totalDelta).toStringAsFixed(3)}kB/s (${(8 * byteCount / 1024 / 1024 / totalDelta).toStringAsFixed(3)}Mbit/s)''',
          5, 65)
      ..fillText('Ping: ${ping?.round() ?? 'unknown'}ms', 5, 75)
      ..fillText('Version: $packageVersion', 5, 85)
      ..fillText('Resolution: $viewportWidth:$viewportHeight', 5, 95)
      ..fillText('''
Visible Area: ${(rightBottom.x - leftTop.x).toInt()} * ${(rightBottom.y - leftTop.y).toInt()}''',
          5, 105);

    final scaling = viewportWidth / (rightBottom.x - leftTop.x);
    ctx.transform(scaling, 0, 0, -scaling, -leftTop.x * scaling,
        (viewportHeight / scaling + leftTop.y) * scaling);

    for (final leaf in visibleLeaves) {
      ctx.strokeRect(leaf.bounds.left, leaf.bounds.top, leaf.bounds.width,
          leaf.bounds.height);
    }

    ctx.restore();
  }

  @override
  bool checkProcessing() =>
      tagManager.isRegistered(cameraTag) && settingsManager.showDebug;
}

@Generate(
  FpsRenderingSystem,
  manager: [
    SettingsManager,
  ],
)
class DamacreatFpsRenderingSystem extends _$DamacreatFpsRenderingSystem {
  DamacreatFpsRenderingSystem(CanvasRenderingContext2D ctx, String fillStyle)
      : super(ctx, fillStyle);

  @override
  bool checkProcessing() => settingsManager.showFps;
}
