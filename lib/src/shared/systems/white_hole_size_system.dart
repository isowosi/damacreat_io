import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/shared.dart';
import 'package:damacreat_io/src/shared/managers/black_hole_owner_manager.dart';
import 'package:dartemis/dartemis.dart';

part 'white_hole_size_system.g.dart';

@Generate(
  EntityProcessingSystem,
  allOf: [
    BlackHole,
    BlackHoleOwner,
    Size,
  ],
  mapper: [
    WhiteHole,
  ],
  manager: [
    BlackHoleOwnerManager,
  ],
)
class WhiteHoleSizeSystem extends _$WhiteHoleSizeSystem {
  @override
  void processEntity(Entity entity) {
    final size = sizeMapper[entity];
    final owner = blackHoleOwnerManager.refersTo(entity);
    print('$entity $owner');
    final whiteHole = whiteHoleMapper[owner];
    whiteHole.radius = max(whiteHole.radius, size.radius);
  }
}
