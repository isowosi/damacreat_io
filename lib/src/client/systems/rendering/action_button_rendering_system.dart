import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';

part 'action_button_rendering_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Controller,
    Booster,
    BlackHoleCannon,
  ],
  manager: [
    CameraManager,
  ],
)
class ActionButtonRenderingSystem extends _$ActionButtonRenderingSystem {
  static const double labelFontSize = fontSize * 1.6;
  CanvasRenderingContext2D ctx;
  CanvasRenderingContext2D tmpCtx;

  ActionButtonRenderingSystem(this.ctx) {
    final tmpCanvas =
        CanvasElement(width: actionButtonSize, height: actionButtonSize);
    tmpCtx = tmpCanvas.context2D
      ..textBaseline = 'top'
      ..font = '${labelFontSize}px Roboto';
  }

  @override
  void processEntity(int entity) {
    final booster = boosterMapper[entity];
    final blackHole = blackHoleCannonMapper[entity];
    _renderButton('Boost', booster.power / booster.maxPower,
        boosterButtonCenterX, boosterButtonCenterY);
    _renderButton('Cannon', blackHole.power / blackHole.maxPower,
        blackHoleCannonButtonCenterX, blackHoleCannonButtonCenterY);
  }

  void _renderButton(String label, double powerPercentage,
      int actionButtonCenterX, int actionButtonCenterY) {
    final bosstLabelLengthHalf = tmpCtx.measureText(label).width / 2;
    tmpCtx
      ..clearRect(0, 0, actionButtonSize, actionButtonSize)
      ..fillStyle =
          'rgb(${200 - 200 * powerPercentage}, ${100 * powerPercentage}, 0)'
      ..beginPath()
      ..fillRect(0, 0, actionButtonSize * powerPercentage, actionButtonSize)
      ..globalCompositeOperation = 'source-in'
      ..arc(actionButtonRadius, actionButtonRadius, actionButtonRadius - 3, 0,
          tau)
      ..fill()
      ..closePath()
      ..strokeStyle = 'gainsboro'
      ..beginPath()
      ..lineWidth = 2
      ..globalCompositeOperation = 'source-over'
      ..arc(actionButtonRadius, actionButtonRadius, actionButtonRadius - 3, 0,
          tau)
      ..stroke()
      ..closePath()
      ..fillStyle = 'gainsboro'
      ..fillText(label, actionButtonRadius - bosstLabelLengthHalf,
          actionButtonRadius - labelFontSize / 2.0);

    ctx.drawImage(tmpCtx.canvas, actionButtonCenterX - actionButtonRadius,
        cameraManager.clientHeight - actionButtonCenterY - actionButtonRadius);
  }
}
