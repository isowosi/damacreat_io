// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'web_socket_listening_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$WebSocketListeningSystem extends VoidEntitySystem {
  Mapper<Position> positionMapper;
  Mapper<Size> sizeMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<ConstantVelocity> constantVelocityMapper;
  Mapper<DigestedBy> digestedByMapper;
  Mapper<Velocity> velocityMapper;
  Mapper<Food> foodMapper;
  Mapper<Booster> boosterMapper;
  Mapper<QuadTreeCandidate> quadTreeCandidateMapper;
  Mapper<Color> colorMapper;
  Mapper<BlackHole> blackHoleMapper;
  TagManager tagManager;
  IdManager idManager;
  QuadTreeManager quadTreeManager;
  ClientDigestionManager clientDigestionManager;
  GameStateManager gameStateManager;
  AnalyticsManager analyticsManager;
  BlackHoleOwnerManager blackHoleOwnerManager;
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    sizeMapper = Mapper<Size>(world);
    orientationMapper = Mapper<Orientation>(world);
    constantVelocityMapper = Mapper<ConstantVelocity>(world);
    digestedByMapper = Mapper<DigestedBy>(world);
    velocityMapper = Mapper<Velocity>(world);
    foodMapper = Mapper<Food>(world);
    boosterMapper = Mapper<Booster>(world);
    quadTreeCandidateMapper = Mapper<QuadTreeCandidate>(world);
    colorMapper = Mapper<Color>(world);
    blackHoleMapper = Mapper<BlackHole>(world);
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    clientDigestionManager = world.getManager<ClientDigestionManager>();
    gameStateManager = world.getManager<GameStateManager>();
    analyticsManager = world.getManager<AnalyticsManager>();
    blackHoleOwnerManager = world.getManager<BlackHoleOwnerManager>();
  }
}
