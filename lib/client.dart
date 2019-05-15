library client;

import 'dart:convert';
import 'dart:html';
import 'dart:typed_data';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/systems/controller_system.dart';
import 'package:damacreat_io/src/client/systems/debug.dart';
import 'package:damacreat_io/src/client/systems/rendering/boost_button_rendering_system.dart';
import 'package:damacreat_io/src/client/systems/rendering/minimap_rendering_system.dart';
import 'package:damacreat_io/src/client/systems/rendering/ranking_rendering_system.dart';
import 'package:damacreat_io/src/client/systems/rendering/sprite_rendering_system.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/client_id_pool.dart';
import 'package:damacreat_io/src/shared/managers/analytics_manager.dart';
import 'package:damacreat_io/src/shared/managers/attracted_by_manager.dart';
import 'package:damacreat_io/src/shared/managers/controller_manager.dart';
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
  double timeSinceStart = 0;
  bool fpsLogged = false;
  final WebSocketHandler webSocketHandler;
  final SettingsManager settingsManager;
  final GameStateManager gameStateManager;
  final ControllerManager controllerManager;
  final AnalyticsManager analyticsManager;

  Game(this.webSocketHandler, this.settingsManager, this.gameStateManager,
      this.controllerManager, this.analyticsManager)
      : super('damacreat_io', '#game',
            webgl: true,
            depthTest: false,
            useMaxDelta: false,
            bodyDefsName: null) {
    // ignore: avoid_as
    container = querySelector('#gamecontainer') as DivElement;
    // ignore: avoid_as
    hudCanvas = querySelector('#hud') as CanvasElement;
    hudCtx = hudCanvas.context2D;
    _configureHud();
  }

  @override
  void createEntities() {
    final tagManager = TagManager();
    world
      ..addManager(tagManager)
      ..addManager(settingsManager)
      ..addManager(gameStateManager)
      ..addManager(controllerManager)
      ..addManager(analyticsManager)
      ..addManager(ViewProjectionMatrixManager())
      ..addManager(DigestionManager(RuntimeEnvironment.client))
      ..addManager(AttractedByManager())
      ..addManager(QuadTreeManager(
          const Rectangle<double>(0, 0, maxAreaSize, maxAreaSize), 16))
      ..addManager(IdManager(ClientIdPool()));
  }

  @override
  Map<int, List<EntitySystem>> getSystems() => {
        GameBase.rendering: [
          // input
          WebSocketListeningSystem(webSocketHandler),
          MouseAndTouchControllerSystem(hudCanvas, webSocketHandler),
          GamepadControllerSystem(webSocketHandler),
          // logic
          FoodGrowingSystem(),
          ConstantMovementSystem(),
          MovementSystemWithoutQuadTree(),
          PlayerSizeLossSystem(),
          CameraPositionSystem(),
          CameraZoomCalculatingSystem(),
          QuadTreeUpdateChangedPositionSystem(),
          AttractionAccelerationSystem(),
          AccelerationSystem(),
          // pre-rendering
          OnScreenTagSystem(),
          // logic that changes visuals/spawns particles
          DigestiveSystem(),
          WobbleSystem(),
          CellWallSystem(),
          CellWallDigestedBySystem(),
          ThrusterCellWallWeakeningSystem(),
          EntityInteractionSystem(),
          ThrusterParticleEmissionSystem(),
          ThrusterParticleColorModificationSystem(),
          FoodColoringSystem(),
          ColorChangeOverLifetimeSystem(),
          // rendering
          WebGlCanvasCleaningSystem(gl),
          BackgroundRenderingSystemLayer0(gl),
          SpriteRenderingSystem(gl, spriteSheet),
          ParticleRenderingSystem(gl),
          PlayerRenderingSystem(gl),
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
    resizeCanvas(hudCanvas);
    _configureHud();
    super.handleResize();
  }

  void _configureHud() {
    hudCtx
      ..textBaseline = 'top'
      ..font = '${fontSize}px Roboto'
      ..globalCompositeOperation = 'source-over';
  }

  void joinGame(int color, String nickname) {
    final utf8nickname = Uint8List.fromList(utf8.encode(
        nickname.substring(0, min(maxLengthNickname, nickname.length))));
    webSocketHandler.sendData(Uint8ListWriter.clientToServer(
        MessageToServer.joinGame,
        additionalDynamicLength: 1 + utf8nickname.length)
      ..writeUint8(color)
      ..writeUint8List(utf8nickname));
  }

  @override
  void update({double time}) {
    super.update(time: time);
    if (!fpsLogged) {
      timeSinceStart += world.delta;
      if (timeSinceStart > 15) {
        analyticsManager.logFps(world.frame(0) ~/ timeSinceStart);
        fpsLogged = true;
      }
    }
  }
}
