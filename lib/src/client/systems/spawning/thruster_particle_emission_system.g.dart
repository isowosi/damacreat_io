// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'thruster_particle_emission_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$ThrusterParticleEmissionSystem extends EntityProcessingSystem {
  Mapper<Position> positionMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<Thruster> thrusterMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Size> sizeMapper;
  Mapper<Color> colorMapper;
  Mapper<Wobble> wobbleMapper;
  Mapper<Booster> boosterMapper;
  OnScreenTagSystem onScreenTagSystem;
  _$ThrusterParticleEmissionSystem()
      : super(Aspect.empty()
          ..allOf([
            Position,
            Orientation,
            Thruster,
            Velocity,
            Size,
            Color,
            Wobble,
            Booster
          ]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    orientationMapper = Mapper<Orientation>(world);
    thrusterMapper = Mapper<Thruster>(world);
    velocityMapper = Mapper<Velocity>(world);
    sizeMapper = Mapper<Size>(world);
    colorMapper = Mapper<Color>(world);
    wobbleMapper = Mapper<Wobble>(world);
    boosterMapper = Mapper<Booster>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
  }
}

abstract class _$ThrusterParticleColorModificationSystem
    extends EntityProcessingSystem {
  Mapper<ThrusterParticle> thrusterParticleMapper;
  Mapper<Color> colorMapper;
  Mapper<Lifetime> lifetimeMapper;
  Mapper<Renderable> renderableMapper;
  _$ThrusterParticleColorModificationSystem()
      : super(Aspect.empty()
          ..allOf([ThrusterParticle, Color, Lifetime, Renderable]));
  @override
  void initialize() {
    super.initialize();
    thrusterParticleMapper = Mapper<ThrusterParticle>(world);
    colorMapper = Mapper<Color>(world);
    lifetimeMapper = Mapper<Lifetime>(world);
    renderableMapper = Mapper<Renderable>(world);
  }
}
