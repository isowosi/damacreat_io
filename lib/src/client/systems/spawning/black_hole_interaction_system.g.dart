// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'black_hole_interaction_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$BlackHoleInteractionSystem
    extends BaseBlackHoleInteractionSystem {
  Mapper<Color> colorMapper;
  OnScreenTagSystem onScreenTagSystem;
  AttractedByManager attractedByManager;
  _$BlackHoleInteractionSystem() : super(Aspect.empty());
  @override
  void initialize() {
    super.initialize();
    colorMapper = Mapper<Color>(world);
    onScreenTagSystem = world.getSystem<OnScreenTagSystem>();
    attractedByManager = world.getManager<AttractedByManager>();
  }
}
