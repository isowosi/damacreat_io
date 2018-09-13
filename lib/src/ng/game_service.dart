import 'dart:async';
import 'dart:html';

import 'package:damacreat_io/app_component.dart';
import 'package:damacreat_io/client.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';

class GameService {
  Game _game;
  bool menuVisible = true;
  bool error = false;
  bool showPrivacyPolicy = false;
  Object errorMessage;
  StackTrace stackTrace;
  final SettingsManager settings;
  GameService(this.settings);

  void startGame() {
    runZoned(() {
      final webSocket = WebSocket('ws://localhost:8081');
      webSocket.onOpen.listen((openEvent) {
        final webSocketHandler = WebSocketHandler(webSocket, debug: debug);
        _game = Game(webSocketHandler, settings)..start();
        window.onBeforeUnload.listen((_) {
          webSocket.close();
        });
      });
    }, onError: (errorMessage, stackTrace) {
      error = true;
      this.errorMessage = errorMessage;
      this.stackTrace = stackTrace;
    });
  }

  void joinGame(String nickname) {
    if (!error) {
      _game.joinGame(nickname);
      menuVisible = false;
    }
  }

  void togglePrivacyPolicy() {
    showPrivacyPolicy = !showPrivacyPolicy;
  }
}
