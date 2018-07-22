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

  Game() : super.noAssets('damacreat_io', '#game', webgl: true) {
    container = querySelector('#gamecontainer');
    hudCanvas = querySelector('#hud');
    hudCtx = hudCanvas.context2D;
    _configureHud();
  }

  @override
  void createEntities() {
    final tagManager = TagManager();
    world.addManager(tagManager);
    world.addManager(WebGlViewProjectionMatrixManager());
    addEntity([
      Controller(),
      Position(0.0, 0.0),
      Acceleration(0.0, 0.0),
      Velocity(0.0, 0.0),
      Mass(),
    ]);

    final player = addEntity([Position(0.0, 0.0)]);
    tagManager.register(player, playerTag);
  }

  @override
  Map<int, List<EntitySystem>> getSystems() {
    return {
      GameBase.rendering: [
        ControllerSystem(),
        ResetAccelerationSystem(),
        ControllerToActionSystem(),
        SimpleGravitySystem(),
        SimpleAccelerationSystem(),
        SimpleMovementSystem(),
        WebGlCanvasCleaningSystem(gl),
        PositionRenderingSystem(gl),
        CanvasCleaningSystem(hudCanvas),
        FpsRenderingSystem(hudCtx, fillStyle: 'white'),
      ],
      GameBase.physics: [
        // add at least one
      ]
    };
  }

  @override
  void handleResize(int width, int height) {
    width = max(800, width);
    height = max(450, height);
    if (width / height > 16 / 9) {
      width = (16 * height) ~/ 9;
    } else if (width / height < 16 / 9) {
      height = (9 * width) ~/ 16;
    }
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
}
