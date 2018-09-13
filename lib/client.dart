library client;

import 'dart:convert';
import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/systems/debug.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

import 'src/client/systems/events.dart';
import 'src/client/systems/rendering.dart';

class Game extends GameBase {
  CanvasElement hudCanvas;
  CanvasRenderingContext2D hudCtx;
  DivElement container;
  final WebSocketHandler webSocketHandler;
  final SettingsManager settingsManager;

  Game(this.webSocketHandler, this.settingsManager)
      : super.noAssets('damacreat_io', '#game',
            webgl: true, depthTest: false, useMaxDelta: false) {
    container = querySelector('#gamecontainer');
    hudCanvas = querySelector('#hud');
    hudCtx = hudCanvas.context2D;
    _configureHud();
  }

  @override
  void createEntities() {
    final tagManager = TagManager();
    world
      ..addManager(tagManager)
      ..addManager(settingsManager)
      ..addManager(WebGlViewProjectionMatrixManager())
      ..addManager(DigestionManager())
      ..addManager(QuadTreeManager(
          const Rectangle<double>(0.0, 0.0, maxAreaSize, maxAreaSize), 16))
      ..addManager(IdManager());

    final player = addEntity([
      Position(
          maxAreaSize * random.nextDouble(), maxAreaSize * random.nextDouble())
    ]);
    tagManager.register(player, playerTag);
  }

  @override
  Map<int, List<EntitySystem>> getSystems() => {
        GameBase.rendering: [
          // input
          WebSocketListeningSystem(webSocketHandler),
          ControllerSystem(hudCanvas, webSocketHandler),
          // logic
          FoodGrowingSystem(),
          ConstantMovementSystem(),
          PlayerSizeLossSystem(),
          DigestiveSystem(),
          QuadTreeUpdateChangedPositionSystem(),
          // pre-rendering
          OnScreenTagSystem(),
          // logic that changes visuals
          WobbleSystem(),
          CellWallSystem(),
          EntityInteractionSystem(),
          ThrusterParticleEmissionSystem(),
          ThrusterParticleColorModificationSystem(),
          // rendering
          WebGlCanvasCleaningSystem(gl),
          FoodRenderingSystem(gl),
          PlayerRenderingSystem(gl),
          BackgroundRenderingSystemLayer0(gl),
          ParticleRenderingSystem(gl),
          CanvasCleaningSystem(hudCanvas),
          RankingRenderingSystem(hudCtx),
          DamacreatFpsRenderingSystem(hudCtx, 'grey'),
          DebugSystem(hudCtx, webSocketHandler),
          // cleanup
          ExpirationSystem(),
          RemoveTemporaryComponentsSystem(),
        ],
        GameBase.physics: [
          // add at least one
        ]
      };

  @override
  void handleResize(int width, int height) {
    container.style
      ..width = '${width}px'
      ..height = '${height}px';
    resizeCanvas(hudCanvas, width, height);
    _configureHud();
    super.handleResize(width, height);
  }

  void _configureHud() {
    hudCtx
      ..textBaseline = 'top'
      ..font = '16px Verdana';
  }

  void joinGame(String nickname) {
    final utf8nickname = utf8
        .encode(nickname.substring(0, min(maxLengthNickname, nickname.length)));
    webSocketHandler.sendData(Uint8ListWriter.clientToServer(
        MessageToServer.joinGame,
        itemCount: utf8nickname.length)
      ..writeUint8List(utf8nickname));
  }
}
