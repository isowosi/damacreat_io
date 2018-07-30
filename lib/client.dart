library client;

import 'dart:html';
import 'package:damacreat_io/shared.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';

import 'src/client/systems/events.dart';
import 'src/client/systems/rendering.dart';

class Game extends GameBase {
  CanvasElement hudCanvas;
  CanvasRenderingContext2D hudCtx;
  DivElement container;
  final bool debug;

  Game({this.debug}) : super.noAssets('damacreat_io', '#game', webgl: true) {
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
      ..addManager(WebGlViewProjectionMatrixManager());

    final player = addEntity([Position(0.0, 0.0)]);
    tagManager.register(player, playerTag);
  }

  @override
  Map<int, List<EntitySystem>> getSystems() => {
        GameBase.rendering: [
          WebSocketListeningSystem(debug: debug),
          ControllerSystem(),
          ResetAccelerationSystem(),
          ControllerToActionSystem(),
          SimpleGravitySystem(),
          SimpleAccelerationSystem(),
          MovementSystem(),
          WebGlCanvasCleaningSystem(gl),
          PositionRenderingSystem(gl),
          CanvasCleaningSystem(hudCanvas),
          FpsRenderingSystem(hudCtx, fillStyle: 'white'),
        ],
        GameBase.physics: [
          // add at least one
        ]
      };

  @override
  void handleResize(int width, int height) {
    var calcWidth = max(800, width);
    var calcHeight = max(450, height);
    if (calcWidth / calcHeight > 16 / 9) {
      calcWidth = (16 * calcHeight) ~/ 9;
    } else if (calcWidth / calcHeight < 16 / 9) {
      calcHeight = (9 * calcWidth) ~/ 16;
    }
    container.style
      ..width = '${calcWidth}px'
      ..height = '${calcHeight}px';
    resizeCanvas(hudCanvas, calcWidth, calcHeight);
    _configureHud();
    super.handleResize(calcWidth, calcHeight);
  }

  void _configureHud() {
    hudCtx
      ..textBaseline = 'top'
      ..font = '16px Verdana';
  }
}
