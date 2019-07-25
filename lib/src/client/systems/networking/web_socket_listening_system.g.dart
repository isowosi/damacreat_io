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
  TagManager tagManager;
  IdManager idManager;
  QuadTreeManager quadTreeManager;
  DigestionManager digestionManager;
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
    tagManager = world.getManager<TagManager>();
    idManager = world.getManager<IdManager>();
    quadTreeManager = world.getManager<QuadTreeManager>();
    digestionManager = world.getManager<DigestionManager>();
    gameStateManager = world.getManager<GameStateManager>();
    analyticsManager = world.getManager<AnalyticsManager>();
    blackHoleOwnerManager = world.getManager<BlackHoleOwnerManager>();
  }
}
