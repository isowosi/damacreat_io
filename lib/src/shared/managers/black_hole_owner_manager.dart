import 'package:damacreat_io/shared.dart';
import 'package:damacreat/damacreat.dart';

class BlackHoleOwnerManager extends BaseBlackHoleOwnerManager {
  @override
  void onNoMoreReferencesTo(int entity) {
    world.removeComponent<WhiteHole>(entity);
  }
}
