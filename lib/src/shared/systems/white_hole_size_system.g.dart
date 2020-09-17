// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'white_hole_size_system.dart';

// **************************************************************************
// SystemGenerator
// **************************************************************************

abstract class _$WhiteHoleSizeSystem extends EntityProcessingSystem {
  Mapper<BlackHole> blackHoleMapper;
  Mapper<BlackHoleOwner> blackHoleOwnerMapper;
  Mapper<Size> sizeMapper;
  Mapper<WhiteHole> whiteHoleMapper;
  BlackHoleOwnerManager blackHoleOwnerManager;
  _$WhiteHoleSizeSystem()
      : super(Aspect.empty()..allOf([BlackHole, BlackHoleOwner, Size]));
  @override
  void initialize() {
    super.initialize();
    blackHoleMapper = Mapper<BlackHole>(world);
    blackHoleOwnerMapper = Mapper<BlackHoleOwner>(world);
    sizeMapper = Mapper<Size>(world);
    whiteHoleMapper = Mapper<WhiteHole>(world);
    blackHoleOwnerManager = world.getManager<BlackHoleOwnerManager>();
  }
}
