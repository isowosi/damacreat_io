// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'black_hole_interaction_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$BlackHoleInteractionSystem
    extends BaseBlackHoleInteractionSystem {
  Mapper<OnScreen> onScreenMapper;
  Mapper<Color> colorMapper;
  AttractedByManager attractedByManager;
  _$BlackHoleInteractionSystem() : super(Aspect.empty()..allOf([OnScreen]));
  @override
  void initialize() {
    super.initialize();
    onScreenMapper = Mapper<OnScreen>(world);
    colorMapper = Mapper<Color>(world);
    attractedByManager = world.getManager<AttractedByManager>();
  }
}
