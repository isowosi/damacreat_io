import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/shared/components.dart';
import 'package:dartemis/dartemis.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart' hide Velocity;

part 'thruster_particle_emission_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    Position,
    Orientation,
    Thruster,
    Velocity,
    Size,
    Color,
    Wobble,
    Booster,
  ],
  systems: [
    OnScreenTagSystem,
  ],
)
class ThrusterParticleEmissionSystem extends _$ThrusterParticleEmissionSystem {
  SpriteSheet sheet;

  ThrusterParticleEmissionSystem(this.sheet);

  @override
  void processEntity(int entity) {
    if (!onScreenTagSystem[entity]) {
      return;
    }
    final p = positionMapper[entity];
    final o = orientationMapper[entity];
    final v = velocityMapper[entity];
    final s = sizeMapper[entity];
    final c = colorMapper[entity];
    final w = wobbleMapper[entity];
    final boosterFactor = boosterMapper[entity].inUse ? 1.5 : 1.0;
    final oldAngle = o.angle - v.rotational * world.delta;

    final leftThrusterAngle = o.angle + 3 / 4 * pi;
    final rightThrusterAngle = o.angle - 3 / 4 * pi;
    final oldLeftThrusterAngle = oldAngle + 3 / 4 * pi;
    final oldRightThrusterAngle = oldAngle - 3 / 4 * pi;

    spawnThrusterParticles(p, s, v, c, leftThrusterAngle, oldLeftThrusterAngle,
        o, w, 1, boosterFactor);
    spawnThrusterParticles(p, s, v, c, rightThrusterAngle,
        oldRightThrusterAngle, o, w, -1, boosterFactor);
  }

  void spawnThrusterParticles(
      Position position,
      Size size,
      Velocity velocity,
      Color color,
      double thrusterAngle,
      double oldThrusterAngle,
      Orientation orientation,
      Wobble wobble,
      int direction,
      double boosterFactor) {
    double w1, w2;
    if (direction == 1) {
      final leftThrusterIndex = (3 / 8 * playerCircleFragments).truncate();
      w1 = wobble.wobbleFactor[leftThrusterIndex];
      w2 = wobble.wobbleFactor[leftThrusterIndex + 1];
    } else {
      final rightThrusterIndex = (5 / 8 * playerCircleFragments).truncate();
      w1 = wobble.wobbleFactor[rightThrusterIndex];
      w2 = wobble.wobbleFactor[rightThrusterIndex - 1];
    }
    final oldX =
        position.x - velocity.value * cos(velocity.angle) * world.delta;
    final oldY =
        position.y - velocity.value * sin(velocity.angle) * world.delta;

    final x1 = position.x + size.radius * 1.1 * cos(thrusterAngle) * w1;
    final y1 = position.y + size.radius * 1.1 * sin(thrusterAngle) * w1;
    final oldX1 = oldX + size.radius * 1.1 * cos(oldThrusterAngle) * w1;
    final oldY1 = oldY + size.radius * 1.1 * sin(oldThrusterAngle) * w1;
    final x2 = position.x +
        size.radius *
            cos(thrusterAngle + direction / (playerCircleFragments ~/ 2) * pi) *
            w2;
    final y2 = position.y +
        size.radius *
            sin(thrusterAngle + direction / (playerCircleFragments ~/ 2) * pi) *
            w2;
    final oldX2 = oldX +
        size.radius *
            cos(oldThrusterAngle +
                direction / (playerCircleFragments ~/ 2) * pi) *
            w2;
    final oldY2 = oldY +
        size.radius *
            sin(oldThrusterAngle +
                direction / (playerCircleFragments ~/ 2) * pi) *
            w2;

    final hsl = rgbToHsl(color.r, color.g, color.b);
    hsl[1] += 0.1;
    hsl[2] += 0.1;
    final rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    for (var i = 0; i < 4 * boosterFactor; i++) {
      final posFactor = random.nextDouble();
      final posFactorTime = random.nextDouble();
      final x = x1 + posFactor * (x2 - x1);
      final y = y1 + posFactor * (y2 - y1);
      final oldX = oldX1 + posFactor * (oldX2 - oldX1);
      final oldY = oldY1 + posFactor * (oldY2 - oldY1);
      world.createEntity([
        Position(
            x + posFactorTime * (oldX - x), y + posFactorTime * (oldY - y)),
        ThrusterParticle(),
        Color(rgb[0], rgb[1], rgb[2], 1),
        Lifetime(boosterFactor * (0.5 + random.nextDouble())),
        Velocity(playerSpeedMultiplier * (0.05 + random.nextDouble() * 0.1),
            (velocity.angle - pi) - pi / 64 + random.nextDouble() * pi / 32, 0),
        Orientation(velocity.angle),
        Renderable(sheet, 'propulsion', scale: 1 / 80),
        Size(boosterFactor * size.radius / 10),
      ]);
    }
  }
}

@Generate(
  EntityProcessingSystem,
  allOf: [
    ThrusterParticle,
    Color,
    Lifetime,
    Renderable,
  ],
)
class ThrusterParticleColorModificationSystem
    extends _$ThrusterParticleColorModificationSystem {
  @override
  void processEntity(int entity) {
    final color = colorMapper[entity];
    final lifetime = lifetimeMapper[entity];
    final renderable = renderableMapper[entity];

    final lifetimePercentage = lifetime.timeLeft / lifetime.timeMax;
    final hsl = rgbToHsl(color.realR, color.realG, color.realB);
    hsl[0] = (hsl[0] - 0.15 * (lifetime.timeMax - lifetime.timeLeft)) % 1.0;
    hsl[1] = hsl[1] * lifetimePercentage;
    hsl[2] = hsl[2] * lifetimePercentage;
    renderable.scale += 3 * world.delta * renderable.scale * lifetimePercentage;
    final rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

    color
      ..r = rgb[0]
      ..g = rgb[1]
      ..b = rgb[2]
      ..a = lifetimePercentage;
  }
}
