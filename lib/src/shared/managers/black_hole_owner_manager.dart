import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';
import 'package:damacreat/damacreat.dart';

class BlackHoleOwnerManager extends BaseBlackHoleOwnerManager {
  @override
  void onNoMoreReferencesTo(Entity entity) {
    entity
      ..removeComponent<WhiteHole>()
      ..changedInWorld();
  }
}
