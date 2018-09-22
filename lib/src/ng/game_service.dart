import 'dart:async';
import 'dart:html';

import 'package:damacreat_io/app_component.dart';
import 'package:damacreat_io/client.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';

class GameService {
  Game _game;
  ServerConnectionState connectionState = ServerConnectionState.connecting;
  bool error = false;
  bool showPrivacyPolicy = false;
  bool showChangelog = false;
  Object errorMessage;
  StackTrace stackTrace;
  String lastName = '';

  final SettingsManager settings;
  final GameStateManager gameStateManager;
  GameService(this.settings, this.gameStateManager);

  Future<void> init() async {
    await settings.init();
  }

  bool get menuVisible => gameStateManager.state == GameState.menu;

  void startGame() {
    runZoned(() {
      final webSocket = WebSocket('ws://localhost:8081');
      webSocket.onOpen.listen((openEvent) {
        connectionState = ServerConnectionState.connected;
        final webSocketHandler = WebSocketHandler(webSocket, debug: debug);
        _game = Game(webSocketHandler, settings, gameStateManager)..start();
        window.onBeforeUnload.listen((_) {
          webSocket.close();
        });
      });
      webSocket.onError.listen((errorEvent) {
        connectionState = ServerConnectionState.error;
      });
    }, onError: (errorMessage, stackTrace) {
      error = true;
      this.errorMessage = errorMessage;
      this.stackTrace = stackTrace;
    });
  }

  void joinGame(String nickname) {
    if (!error && menuVisible) {
      lastName = nickname;
      _game.joinGame(nickname);
      gameStateManager.state = GameState.playing;
    }
  }

  void togglePrivacyPolicy() {
    showPrivacyPolicy = !showPrivacyPolicy;
    if (showPrivacyPolicy) {
      showChangelog = false;
    }
  }

  void toggleChangelog() {
    showChangelog = !showChangelog;
    if (showChangelog) {
      showPrivacyPolicy = false;
    }
  }
}

enum ServerConnectionState { connecting, connected, error }
