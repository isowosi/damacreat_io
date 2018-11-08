import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:damacreat_io/src/shared/managers/controller_manager.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;
import 'package:damacreat_io/src/shared/components.dart';

part 'controller_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Booster,
    Controller,
  ],
  manager: [
    GameStateManager,
    CameraManager,
    ControllerManager,
  ],
)
abstract class ControllerSystem extends _$ControllerSystem {
  WebSocketHandler _webSocketHandler;
  bool useBooster = false;
  int boosterFinger;
  double velocityStrength;
  double velocityAngle;

  ControllerSystem(this._webSocketHandler);

  @override
  void processEntity(Entity entity) {
    boosterMapper[entity].inUse = useBooster;
    if (velocityStrength != null && velocityAngle != null) {
      final velocity = ByteUtils.speedToByte(velocityStrength);
      final angle = ByteUtils.angleToByte(velocityAngle);

      final type = useBooster
          ? MessageToServer.updateVelocityAndUseBooster
          : MessageToServer.updateVelocity;
      _webSocketHandler.sendData(Uint8ListWriter.clientToServer(type)
        ..writeUint16(velocity)
        ..writeUint16(angle));
    } else if (useBooster) {
      _webSocketHandler
          .sendData(Uint8ListWriter.clientToServer(MessageToServer.useBooster));
    }
    velocityStrength = null;
  }

  @override
  bool checkProcessing() => gameStateManager.state == GameState.playing;
}

class MouseAndTouchControllerSystem extends ControllerSystem {
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
      }
      event.preventDefault();
    });
    canvas.onMouseDown.listen((event) {
      if (event.buttons & 1 == 1) {
        useBooster = true;
      }
    });
    canvas.onMouseUp.listen((event) {
      if (event.buttons & 1 == 0) {
        useBooster = false;
      }
    });
  }

  void _handleTouchEvent(TouchEvent event) {
    final boosterOffset = Point<double>(boosterButtonCenterX.toDouble(),
        cameraManager.clientHeight - boosterButtonCenterY.toDouble());
    for (final touch in event.targetTouches) {
      final touchOffset = touch.page;
      if (boosterOffset.distanceTo(touchOffset) <= boosterButtonRadius) {
        useBooster = true;
        boosterFinger = touch.identifier;
      } else {
        _calculateVelocityValues(touchOffset);
        if (boosterFinger == touch.identifier) {
          useBooster = false;
          boosterFinger = null;
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
  GamepadControllerSystem(WebSocketHandler webSocketHandler)
      : super(webSocketHandler);

  @override
  void processEntity(Entity entity) {
    final gamepad =
        window.navigator.getGamepads()[controllerManager.gamepadIndex];
    if (gamepad == null) {
      controllerManager.type = ControllerType.mouse;
    } else {
      final x = (gamepad.axes[0] * 100).round() / 100;
      final y = -(gamepad.axes[1] * 100).round() / 100;
      if (gamepad.buttons[0].pressed) {
        useBooster = true;
      } else {
        useBooster = false;
      }
      velocityStrength = sqrt(x * x + y * y);
      if (velocityAngle == null || y != 0.0 || x != 0.0) {
        velocityAngle = atan2(y, x);
      }
      super.processEntity(entity);
    }
  }

  @override
  bool checkProcessing() =>
      super.checkProcessing() && controllerManager.isGamepad;
}
