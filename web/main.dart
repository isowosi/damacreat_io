import 'dart:html';

import 'package:damacreat_io/client.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';

const bool debug = bool.fromEnvironment('debug', defaultValue: false);

void main() {
  final webSocket = WebSocket('wss://ws.damacreat.io/v0/');
  webSocket.onOpen.listen((openEvent) {
    final webSocketHandler = WebSocketHandler(webSocket, debug: debug);
    Game(webSocketHandler).start();
    window.onBeforeUnload.listen((_) {
      webSocket.close();
    });
  });
}
