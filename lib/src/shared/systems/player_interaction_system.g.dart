// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'player_interaction_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$PlayerInteractionSystem extends BasePlayerInteractionSystem {
  Mapper<Wobble> wobbleMapper;
  Mapper<CellWall> cellWallMapper;
  Mapper<Orientation> orientationMapper;
  OnScreenTagSystem onScreenTagSystem;
  TagManager tagManager;
  _$PlayerInteractionSystem()
      : super(Aspect.empty()..allOf([Wobble, CellWall, Orientation]));
  @override
  void initialize() {
    super.initialize();
    wobbleMapper = Mapper<Wobble>(world);
    cellWallMapper = Mapper<CellWall>(world);
    orientationMapper = Mapper<Orientation>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
    tagManager = world.getManager<TagManager>();
  }
}
