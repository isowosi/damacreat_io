import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:dartemis/dartemis.dart';

part 'debug.g.dart';

@Generate(
  VoidEntitySystem,
  mapper: [
    Food,
  ],
)
class DebugSystem extends _$DebugSystem {
  final CanvasRenderingContext2D ctx;
  final WebSocketHandler webSocketHandler;
  int byteCount = 0;
  double totalDelta = 0.0;
  double lastPingTime = 0.0;
  double ping;
  DebugSystem(this.ctx, this.webSocketHandler) {
    MessageToClient.values.forEach(_countBytes);
  }

  void _countBytes(MessageToClient message) {
    webSocketHandler.on(message).listen((reader) {
      byteCount += reader.length;
      if (message == MessageToClient.pong) {
        ping = window.performance.now() - lastPingTime;
      }
    });
    webSocketHandler
        .sendData(Uint8ListWriter.clientToServer(MessageToServer.ping));
  }

  @override
  void processSystem() {
    final renderedCircles = world.componentManager
        .getComponentsByType(ComponentTypeManager.getTypeFor(OnScreen))
        .where((component) => component != null)
        .length;
    final movingThings = world.componentManager
        .getComponentsByType(ComponentTypeManager.getTypeFor(ChangedPosition))
        .where((component) => component != null)
        .length;
    final totalDeltaBefore = totalDelta;
    totalDelta += world.delta;
    if (totalDeltaBefore.toInt() % 5 == 4 && totalDelta.toInt() % 5 == 0) {
      lastPingTime = window.performance.now();
      webSocketHandler
          .sendData(Uint8ListWriter.clientToServer(MessageToServer.ping));
    }

    ctx
      ..save()
      ..font = '20px Verdana'
      ..textBaseline = 'top'
      ..fillStyle = 'white'
      ..fillText('Rendered circles: $renderedCircles', 5, 45)
      ..fillText('Moving entities: $movingThings', 5, 65)
      ..fillText('Received: ${(byteCount / 1024).toStringAsFixed(3)}kB', 5, 85)
      ..fillText(
          'Rate: ${(byteCount / 1024 / totalDelta).toStringAsFixed(3)}kB/s (${(8 * byteCount / 1024 / 1024 / totalDelta).toStringAsFixed(3)}Mbit/s)',
          5,
          105)
      ..fillText('Ping: ${ping ?? 'unknown'}', 5, 125)
      ..fillText('Version: 0.1.0-secret-pre-pre-pre-alpha', 5, 145)
      ..restore();
  }
}
