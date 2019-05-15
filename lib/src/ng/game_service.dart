import 'dart:async';
import 'dart:html';
import 'dart:math';

import 'package:damacreat_io/app_component.dart';
import 'package:damacreat_io/client.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/analytics_manager.dart';
import 'package:damacreat_io/src/shared/managers/controller_manager.dart';
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
  String nickname = '';
  int hue = 0;
  final Set<int> gamepadIndices = <int>{};
  final Random random = Random();

  final SettingsManager settings;
  final GameStateManager gameStateManager;
  final ControllerManager controllerManager;
  final AnalyticsManager analyticsManager;
  GameService(this.settings, this.gameStateManager, this.controllerManager,
      this.analyticsManager);

  Future<void> init() async {
    hue = random.nextInt(256);
    await settings.init();
  }

  bool get menuVisible => gameStateManager.state == GameState.menu;

  void startGame() {
    runZoned(() {
      final webSocket = WebSocket('ws://localhost:8081');
      webSocket.onOpen.listen((openEvent) {
        connectionState = ServerConnectionState.connected;
        final webSocketHandler = WebSocketHandler(webSocket, debug: debug);
        _game = Game(webSocketHandler, settings, gameStateManager,
            controllerManager, analyticsManager)
          ..start();
        window.onBeforeUnload.listen((_) {
          webSocket.close();
        });
      });
      webSocket.onError.listen((errorEvent) {
        connectionState = ServerConnectionState.error;
        analyticsManager.serverDown();
      });
      webSocket.onClose.listen((_) {
        analyticsManager.connectionLost();
      });

      if (window.navigator.getGamepads != null) {
        final connectedGamepads = window.navigator.getGamepads();
        for (var i = 0; i < connectedGamepads.length; i++) {
          if (connectedGamepads[i] != null) {
            gamepadIndices.add(i);
          }
        }
      }
      window.on['gamepadconnected'].cast<GamepadEvent>().listen((event) {
        gamepadIndices.add(event.gamepad.index);
      });
      window.on['gamepaddisconnected'].cast<GamepadEvent>().listen((event) {
        gamepadIndices.remove(event.gamepad.index);
      });
      _handleGamepads();
    }, onError: (errorMessage, stackTrace) {
      error = true;
      this.errorMessage = errorMessage;
      // ignore: avoid_as
      this.stackTrace = stackTrace as StackTrace;
      analyticsManager.clientError(errorMessage.toString());
    });
  }

  void _handleGamepads([_]) {
    if (gameStateManager.state == GameState.menu && gamepadIndices.isNotEmpty) {
      // window.navigator.getGamepads() needs to be used because otherwise
      // pressed buttons will not be recogniced in chrome after a page refresh
      final gamepads = window.navigator.getGamepads();
      for (final index in gamepadIndices) {
        final gamepad = gamepads[index];
        if (gamepad.buttons[9].pressed) {
          joinGame(gamepad: gamepad);
          break;
        }
      }
    }
    window.requestAnimationFrame(_handleGamepads);
  }

  void joinGame({Gamepad gamepad}) {
    if (!error && menuVisible) {
      if (gamepad != null) {
        controllerManager
          ..type = ControllerType.gamepad
          ..gamepadIndex = gamepad.index;
      } else if (controllerManager.type == ControllerType.gamepad) {
        controllerManager.type = ControllerType.mouse;
      }
      _game.joinGame(hue ?? random.nextInt(256), nickname);
      gameStateManager.state = GameState.playing;
      analyticsManager.joinGame(defaultNickname: nickname.isEmpty);
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

  void setPlayerHue(String hueString) {
    hue = int.tryParse(hueString) ?? random.nextInt(256);
  }
}

enum ServerConnectionState { connecting, connected, error }
