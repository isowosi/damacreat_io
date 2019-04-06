import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart';

part 'minimap_rendering_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Player,
    Position,
    Size,
  ],
  manager: [
    CameraManager,
    SettingsManager,
  ],
  mapper: [
    Controller,
  ],
)
class MinimapRenderingSystem extends _$MinimapRenderingSystem {
  CanvasRenderingContext2D ctx;

  MinimapRenderingSystem(this.ctx);

  @override
  void begin() {
    ctx
      ..save()
      ..transform(200 / maxAreaSize, 0, 0, -200 / maxAreaSize,
          cameraManager.clientWidth - 200, cameraManager.clientHeight)
      ..fillStyle = 'grey'
      ..globalAlpha = 0.1
      ..fillRect(0, 0, maxAreaSize, maxAreaSize)
      ..globalAlpha = 1;
  }

  @override
  void processEntity(Entity entity) {
    final position = positionMapper[entity];
    final size = sizeMapper[entity];
    final color = controllerMapper.has(entity) ? 'green' : 'grey';
    ctx
      ..beginPath()
      ..fillStyle = color
      ..arc(position.x, position.y, size.radius, 0, tau)
      ..fill()
      ..closePath();
  }

  @override
  void end() {
    ctx.restore();
  }

  @override
  bool checkProcessing() => settingsManager.showMinimap;
}
