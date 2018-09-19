library shared;

export 'package:gamedev_helpers/gamedev_helpers_shared.dart' hide Velocity;

export 'src/shared/components.dart';
export 'src/shared/systems/logic.dart';
export 'src/version.dart';

const int playerCircleFragments = 64;
const double initialGameZoom = 0.6;