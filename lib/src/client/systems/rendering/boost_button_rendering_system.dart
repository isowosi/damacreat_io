import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';

part 'boost_button_rendering_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Controller,
    Booster,
  ],
  manager: [
    CameraManager,
  ],
)
class BoostButtonRenderingSystem extends _$BoostButtonRenderingSystem {
  CanvasRenderingContext2D ctx;
  CanvasRenderingContext2D tmpCtx;

  BoostButtonRenderingSystem(this.ctx) {
    final tmpCanvas =
        CanvasElement(width: boosterButtonSize, height: boosterButtonSize);
    tmpCtx = tmpCanvas.context2D..textBaseline = 'top';
  }

  @override
  void processEntity(Entity entity) {
    final booster = boosterMapper[entity];
    const labelFontSize = fontSize * 2;
    tmpCtx.font = '${labelFontSize}px Roboto';
    final bosstLabelLengthHalf = tmpCtx.measureText('Boost').width / 2;
    final powerPercentage = booster.power / booster.maxPower;
    tmpCtx
      ..clearRect(0, 0, boosterButtonSize, boosterButtonSize)
      ..fillStyle =
          'rgb(${200 - 200 * powerPercentage}, ${100 * powerPercentage}, 0)'
      ..beginPath()
      ..fillRect(0, 0, boosterButtonSize * powerPercentage, boosterButtonSize)
      ..globalCompositeOperation = 'source-in'
      ..arc(boosterButtonRadius, boosterButtonRadius, boosterButtonRadius - 3,
          0.0, tau)
      ..fill()
      ..closePath()
      ..strokeStyle = 'gainsboro'
      ..beginPath()
      ..lineWidth = booster.inUse ? 3 : 2
      ..globalCompositeOperation = 'source-over'
      ..arc(boosterButtonRadius, boosterButtonRadius, boosterButtonRadius - 3,
          0.0, tau)
      ..stroke()
      ..closePath()
      ..fillStyle = 'gainsboro'
      ..fillText('Boost', boosterButtonRadius - bosstLabelLengthHalf,
          boosterButtonRadius - labelFontSize / 2);

    ctx.drawImage(
        tmpCtx.canvas,
        boosterButtonCenterX - boosterButtonRadius,
        cameraManager.clientHeight -
            boosterButtonCenterY -
            boosterButtonRadius);
  }
}
