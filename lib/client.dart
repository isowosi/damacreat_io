library client;

import 'dart:convert';
import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/systems/debug.dart';
import 'package:damacreat_io/src/client/systems/rendering/boost_button_rendering_system.dart';
import 'package:damacreat_io/src/client/systems/rendering/minimap_rendering_system.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/client_id_pool.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:damacreat_io/src/shared/systems/booster_handling_system.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

import 'src/client/systems/events.dart';
import 'src/client/systems/rendering.dart';

class Game extends GameBase {
  CanvasElement hudCanvas;
  CanvasRenderingContext2D hudCtx;
  DivElement container;
  final WebSocketHandler webSocketHandler;
  final SettingsManager settingsManager;
  final GameStateManager gameStateManager;

  Game(this.webSocketHandler, this.settingsManager, this.gameStateManager)
      : super.noAssets('damacreat_io', '#game',
            webgl: true, depthTest: false, useMaxDelta: false) {
    container = querySelector('#gamecontainer');
    hudCanvas = querySelector('#hud');
    hudCtx = hudCanvas.context2D;
    _configureHud();
  }

  @override
  void createEntities() {
    world.getManager<CameraManager>().gameZoom = initialGameZoom;
    final tagManager = TagManager();
    world
      ..addManager(tagManager)
      ..addManager(settingsManager)
      ..addManager(gameStateManager)
      ..addManager(WebGlViewProjectionMatrixManager(1000))
      ..addManager(DigestionManager())
      ..addManager(QuadTreeManager(
          const Rectangle<double>(0.0, 0.0, maxAreaSize, maxAreaSize), 16))
      ..addManager(IdManager(ClientIdPool()));

    final camera = addEntity([
      Position(
          maxAreaSize * random.nextDouble(), maxAreaSize * random.nextDouble())
    ]);
    tagManager.register(camera, cameraTag);
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
          CameraPositionSystem(),
          CameraZoomCalculatingSystem(),
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
          PlayerNameRenderingSystem(hudCtx),
          RankingRenderingSystem(hudCtx),
          DamacreatFpsRenderingSystem(hudCtx, 'grey'),
          DebugSystem(hudCtx, webSocketHandler),
          MinimapRenderingSystem(hudCtx),
          BoostButtonRenderingSystem(hudCtx),
          // cleanup
          BoosterHandlingSystem(),
          ExpirationSystem(),
          RemoveTemporaryComponentsSystem(),
        ],
        GameBase.physics: [
          // add at least one
        ]
      };

  @override
  void handleResize() {
    final camera = world.getManager<CameraManager>();
    container.style
      ..width = '${camera.clientWidth}px'
      ..height = '${camera.clientHeight}px';
    resizeCanvas(hudCanvas, useClientSize: true);
    _configureHud();
    super.handleResize();
  }

  void _configureHud() {
    hudCtx
      ..textBaseline = 'top'
      ..font = '${fontSize}px Roboto'
      ..globalCompositeOperation = 'source-over';
  }

  void joinGame(String nickname) {
    final utf8nickname = utf8
        .encode(nickname.substring(0, min(maxLengthNickname, nickname.length)));
    webSocketHandler.sendData(Uint8ListWriter.clientToServer(
        MessageToServer.joinGame,
        additionalDynamicLength: 1 + utf8nickname.length)
      ..writeUint8List(utf8nickname));
  }
}
