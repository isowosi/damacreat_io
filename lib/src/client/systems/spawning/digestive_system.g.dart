// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'digestive_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$DigestiveSystem extends BaseDigestiveSystem {
  Mapper<Position> positionMapper;
  Mapper<Color> colorMapper;
  AttractedByManager attractedByManager;
  GroupManager groupManager;
  _$DigestiveSystem()
      : super(Aspect.empty()
          ..allOf([Position])
          ..exclude([DigestionComplete]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    colorMapper = Mapper<Color>(world);
    attractedByManager = world.getManager<AttractedByManager>();
    groupManager = world.getManager<GroupManager>();
  }
}
