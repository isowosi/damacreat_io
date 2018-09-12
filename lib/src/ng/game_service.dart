import 'dart:html';

import 'package:damacreat_io/app_component.dart';
import 'package:damacreat_io/client.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';

class GameService {
  Game _game;
  bool menuVisible = true;

  void startGame() {
    final webSocket = WebSocket('ws://localhost:8081');
    webSocket.onOpen.listen((openEvent) {
      final webSocketHandler = WebSocketHandler(webSocket, debug: debug);
      _game = Game(webSocketHandler)..start();
      window.onBeforeUnload.listen((_) {
        webSocket.close();
      });
    });
  }

  void joinGame(String nickname) {
    _game.joinGame(nickname);
    menuVisible = false;
  }
}
