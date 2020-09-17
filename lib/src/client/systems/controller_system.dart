import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/controller_manager.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
import 'package:damacreat_io/src/shared/components.dart';

part 'controller_system.g.dart';

@Generate(
  GenericInputHandlingSystem,
  allOf: [
    Camera,
  ],
  mapper: [
    Controller,
  ],
  manager: [
    SettingsManager,
    TagManager,
  ],
  systems: [
    MouseAndTouchControllerSystem,
  ],
)
class KeyboardControllerSystem extends _$KeyboardControllerSystem {
  bool useBooster = false;
  KeyboardControllerSystem({List<Element> ignoreInputFromElements = const []})
      : super(ignoreInputFromElements);

  @override
  void processEntity(int entity) {
    if (isPressed(KeyCode.M)) {
      settingsManager.showMinimap = !settingsManager.showMinimap;
      unpress[KeyCode.M] = true;
    }
    if (isPressed(KeyCode.L)) {
      settingsManager.showLeaderboard = !settingsManager.showLeaderboard;
      unpress[KeyCode.L] = true;
    }
    if (isPressed(KeyCode.N)) {
      settingsManager.showNicknames = !settingsManager.showNicknames;
      unpress[KeyCode.N] = true;
    }
    if (isPressed(KeyCode.F)) {
      settingsManager.showFps = !settingsManager.showFps;
      unpress[KeyCode.F] = true;
    }
    if (isPressed(KeyCode.I)) {
      settingsManager.showDebug = !settingsManager.showDebug;
      unpress[KeyCode.I] = true;
    }
    if (mouseAndTouchControllerSystem != null &&
        controllerMapper.has(tagManager.getEntity(cameraTag))) {
      if (isPressed(KeyCode.SPACE)) {
        mouseAndTouchControllerSystem.useBooster = true;
        useBooster = true;
      } else if (!isPressed(KeyCode.SPACE) && useBooster) {
        mouseAndTouchControllerSystem.useBooster = false;
        useBooster = false;
      } else if (isPressed(KeyCode.W)) {
        mouseAndTouchControllerSystem.fireBlackHole = true;
        unpress[KeyCode.W] = true;
      }
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    Booster,
    BlackHoleCannon,
    Controller,
  ],
  manager: [
    GameStateManager,
    CameraManager,
    ControllerManager,
    SettingsManager,
  ],
)
abstract class ControllerSystem extends _$ControllerSystem {
  final WebSocketHandler _webSocketHandler;
  bool useBooster = false;
  bool fireBlackHole = false;
  double velocityStrength;
  double velocityAngle;

  ControllerSystem(this._webSocketHandler);

  @override
  void processEntity(int entity) {
    useBooster = useBooster && boosterMapper[entity].power > 0;
    fireBlackHole = !useBooster && fireBlackHole;
    boosterMapper[entity].inUse = useBooster;
    blackHoleCannonMapper[entity].fire = fireBlackHole;
    if (velocityStrength != null && velocityAngle != null) {
      final velocity = ByteUtils.speedToByte(velocityStrength);
      final angle = ByteUtils.angleToByte(velocityAngle);

      final type = useBooster
          ? MessageToServer.updateVelocityAndUseBooster
          : fireBlackHole
              ? MessageToServer.updateVelocityAndFireBlackHole
              : MessageToServer.updateVelocity;
      _webSocketHandler.sendData(Uint8ListWriter.clientToServer(type)
        ..writeUint16(velocity)
        ..writeUint16(angle));
    } else if (useBooster) {
      _webSocketHandler
          .sendData(Uint8ListWriter.clientToServer(MessageToServer.useBooster));
    } else if (fireBlackHole) {
      _webSocketHandler.sendData(
          Uint8ListWriter.clientToServer(MessageToServer.fireBlackHole));
    }
    velocityStrength = null;
    fireBlackHole = false;
  }

  @override
  bool checkProcessing() => gameStateManager.state == GameState.playing;
}

class MouseAndTouchControllerSystem extends ControllerSystem {
  int boosterFinger;
  int blackHoleFinger;
  CanvasElement canvas;
  MouseAndTouchControllerSystem(this.canvas, WebSocketHandler webSocketHandler)
      : super(webSocketHandler);

  @override
  void initialize() {
    super.initialize();
    canvas.onMouseMove.listen((event) {
      _calculateVelocityValues(event.offset);
    });
    canvas.onTouchMove.listen(_handleTouchEvent);
    canvas.onTouchStart.listen((event) {
      _handleTouchEvent(event);
      event.preventDefault();
    });
    canvas.onTouchEnd.listen((event) {
      for (final touch in event.changedTouches) {
        if (touch.identifier == boosterFinger) {
          useBooster = false;
          boosterFinger = null;
        }
        if (touch.identifier == blackHoleFinger) {
          fireBlackHole = false;
          blackHoleFinger = null;
        }
      }
      event.preventDefault();
    });
    canvas.onMouseDown.listen((event) {
      if (event.buttons & 1 == 1) {
        fireBlackHole = true;
      }
      if (event.buttons & 2 == 2) {
        useBooster = true;
      }
    });
    canvas.onMouseUp.listen((event) {
      if (event.buttons & 1 == 0) {
        fireBlackHole = false;
      }
      if (event.buttons & 2 == 0) {
        useBooster = false;
      }
    });
    canvas.onContextMenu.listen((event) {
      event.preventDefault();
    });
  }

  void _handleTouchEvent(TouchEvent event) {
    final boosterOffset = Point<num>(boosterButtonCenterX.toDouble(),
        cameraManager.clientHeight - boosterButtonCenterY.toDouble());
    final blackHoleCannonOffset = Point<num>(
        blackHoleCannonButtonCenterX.toDouble(),
        cameraManager.clientHeight - blackHoleCannonButtonCenterY.toDouble());
    for (final touch in event.targetTouches) {
      final touchOffset = touch.page;
      if (boosterOffset.distanceTo(touchOffset) <= actionButtonRadius) {
        useBooster = true;
        boosterFinger = touch.identifier;
      } else if (blackHoleCannonOffset.distanceTo(touchOffset) <=
          actionButtonRadius) {
        fireBlackHole = true;
        blackHoleFinger = touch.identifier;
      } else {
        _calculateVelocityValues(touchOffset);
        if (boosterFinger == touch.identifier) {
          useBooster = false;
          boosterFinger = null;
        }
        if (blackHoleFinger == touch.identifier) {
          fireBlackHole = false;
          blackHoleFinger = null;
        }
      }
    }
  }

  void _calculateVelocityValues(Point<num> offset) {
    final center = Point<num>(canvas.width / 2, canvas.height / 2);
    final maxDistance = min(canvas.width / 3, canvas.height / 3);
    final distance = center.distanceTo(offset);
    velocityStrength = min(maxDistance, distance) / maxDistance;
    velocityAngle = tau + atan2(center.y - offset.y, offset.x - center.x);
  }

  @override
  bool checkProcessing() =>
      super.checkProcessing() &&
      (controllerManager.isMouse || controllerManager.isTouch);
}

class GamepadControllerSystem extends ControllerSystem {
  bool fireBlackHolesButtonReleased = true;
  GamepadControllerSystem(WebSocketHandler webSocketHandler)
      : super(webSocketHandler);

  @override
  void processEntity(int entity) {
    final gamepad =
        window.navigator.getGamepads()[controllerManager.gamepadIndex];
    if (gamepad == null) {
      controllerManager.type = ControllerType.mouse;
    } else {
      final x = (gamepad.axes[0] * 100).round() / 100;
      final y = -(gamepad.axes[1] * 100).round() / 100;
      if (gamepad.buttons[1].pressed) {
        useBooster = true;
      } else {
        useBooster = false;
      }
      if (gamepad.buttons[0].pressed && fireBlackHolesButtonReleased) {
        fireBlackHole = true;
        fireBlackHolesButtonReleased = false;
      } else if (!gamepad.buttons[0].pressed) {
        fireBlackHole = false;
        fireBlackHolesButtonReleased = true;
      }
      velocityStrength = sqrt(x * x + y * y);
      if (velocityAngle == null || y != 0 || x != 0) {
        velocityAngle = atan2(y, x);
      }
      super.processEntity(entity);
    }
  }

  @override
  bool checkProcessing() =>
      super.checkProcessing() && controllerManager.isGamepad;
}
