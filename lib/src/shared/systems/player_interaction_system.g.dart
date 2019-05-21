// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'player_interaction_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$PlayerInteractionSystem extends BasePlayerInteractionSystem {
  Mapper<Wobble> wobbleMapper;
  Mapper<CellWall> cellWallMapper;
  Mapper<Orientation> orientationMapper;
  Mapper<OnScreen> onScreenMapper;
  TagManager tagManager;
  _$PlayerInteractionSystem()
      : super(Aspect.empty()..allOf([Wobble, CellWall, Orientation, OnScreen]));
  @override
  void initialize() {
    super.initialize();
    wobbleMapper = Mapper<Wobble>(world);
    cellWallMapper = Mapper<CellWall>(world);
    orientationMapper = Mapper<Orientation>(world);
    onScreenMapper = Mapper<OnScreen>(world);
    tagManager = world.getManager<TagManager>();
  }
}
