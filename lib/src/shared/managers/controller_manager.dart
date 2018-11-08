import 'package:dartemis/dartemis.dart';

class ControllerManager extends Manager {
  ControllerType type = ControllerType.mouse;
  int gamepadIndex;

  bool get isMouse => type == ControllerType.mouse;
  bool get isTouch => type == ControllerType.touch;
  bool get isGamepad => type == ControllerType.gamepad;
}

enum ControllerType { mouse, touch, gamepad }
