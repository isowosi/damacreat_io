import 'package:dartemis/dartemis.dart';
import 'package:damacreat/damacreat.dart';

part 'booster_handling_system.g.dart';

@Generate(
  BaseBoosterHandlingSystem,
  allOf: [
    Player,
  ],
)
class BoosterHandlingSystem extends _$BoosterHandlingSystem {
  @override
  void onBoost(Entity entity, double powerusage) {}
}
