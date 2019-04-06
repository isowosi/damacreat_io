library shared;

export 'package:gamedev_helpers/gamedev_helpers_shared.dart'
    hide Velocity, Acceleration;

export 'src/shared/components.dart';
export 'src/shared/systems/logic.dart';
export 'src/version.dart';

const int fontSize = 16;
const int playerCircleFragments = 64;
const int foodSpriteRadius = 50;

const int boosterButtonCenterX = 75;
const int boosterButtonCenterY = 75;
const int boosterButtonRadius = 50;
const int boosterButtonSize = boosterButtonRadius * 2;
