import 'dart:html';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';

part 'ranking_rendering_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Player,
    Size,
    Color,
  ],
  mapper: [
    Controller,
  ],
  manager: [
    CameraManager,
  ],
)
class RankingRenderingSystem extends _$RankingRenderingSystem {
  final CanvasRenderingContext2D ctx;
  final List<Score> highscore = <Score>[];
  RankingRenderingSystem(this.ctx);

  @override
  void begin() {
    highscore.clear();
  }

  @override
  void processEntity(Entity entity) {
    final size = sizeMapper[entity];
    final name = playerMapper[entity].nickname;
    final color = colorMapper[entity];
    final isCurrentPlayer = controllerMapper.has(entity);
    highscore.add(Score(name, size.radius, color.r, color.g, color.b,
        isCurrentPlayer: isCurrentPlayer));
  }

  @override
  void end() {
    highscore.sort((a, b) => b.radius.compareTo(a.radius));
    var y = 5;
    var ranking = 0;
    ctx
      ..save()
      ..font = '${fontSize}px Roboto'
      ..strokeStyle = 'white'
      ..fillStyle = 'white';

    const leaderboardWidth = 250;
    const leaderboardLabel = 'Leaderboard';
    final leaderboardLabelWidth = ctx.measureText(leaderboardLabel).width;
    final leaderboardStartX = cameraManager.clientWidth -
        (leaderboardWidth + leaderboardLabelWidth) / 2;
    ctx
      ..beginPath()
      ..lineWidth = 1
      ..fillText(leaderboardLabel, leaderboardStartX, y)
      ..moveTo(leaderboardStartX, y + fontSize + 1)
      ..lineTo(leaderboardStartX + leaderboardLabelWidth, y + fontSize + 1)
      ..closePath()
      ..stroke()
      ..beginPath()
      ..lineWidth = 2
      ..moveTo(cameraManager.clientWidth - leaderboardWidth, y + fontSize + 5)
      ..lineTo(cameraManager.clientWidth, y + fontSize + 5)
      ..closePath()
      ..stroke();
    y += fontSize + 7;
    var currentPlayerShown = false;
    for (final score in highscore) {
      ranking++;
      if (ranking > 10) {
        if (currentPlayerShown) {
          break;
        } else if (!score.isCurrentPlayer) {
          continue;
        }
      }
      _renderName(score, ranking, leaderboardWidth, y);
      y += fontSize + 2;
      currentPlayerShown |= score.isCurrentPlayer;
    }
  }

  void _renderName(Score score, int ranking, int leaderboardWidth, int y) {
    final value = score.radius ~/ 1;
    final scoreWidth = ctx.measureText('$value').width;
    final rankingWidth = ctx.measureText('$ranking. ').width;
    ctx.fillStyle =
        'rgb(${score.red * 255}, ${score.green * 255}, ${score.blue * 255})';
    if (score.isCurrentPlayer) {
      ctx.fillText('>',
          cameraManager.clientWidth - leaderboardWidth - rankingWidth - 10, y);
    }
    ctx
      ..fillText('$ranking. ',
          cameraManager.clientWidth - leaderboardWidth - rankingWidth, y)
      ..fillText('${score.playerName}',
          cameraManager.clientWidth - leaderboardWidth, y)
      ..fillText('$value', cameraManager.clientWidth - scoreWidth - 5, y);
  }
}

class Score {
  String playerName;
  double red, green, blue;
  double radius;
  bool isCurrentPlayer;
  Score(this.playerName, this.radius, this.red, this.green, this.blue,
      {this.isCurrentPlayer = false});
}
