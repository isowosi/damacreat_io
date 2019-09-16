// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'digestive_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$DigestiveSystem extends BaseDigestiveSystem {
  Mapper<Position> positionMapper;
  Mapper<Color> colorMapper;
  OnScreenTagSystem onScreenTagSystem;
  AttractedByManager attractedByManager;
  AnalyticsManager analyticsManager;
  ClientDigestionManager clientDigestionManager;
  _$DigestiveSystem()
      : super(Aspect.empty()
          ..allOf([Position])
          ..exclude([DigestionComplete]));
  @override
  void initialize() {
    super.initialize();
    positionMapper = Mapper<Position>(world);
    colorMapper = Mapper<Color>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
    attractedByManager = world.getManager<AttractedByManager>();
    analyticsManager = world.getManager<AnalyticsManager>();
    clientDigestionManager = world.getManager<ClientDigestionManager>();
  }
}
