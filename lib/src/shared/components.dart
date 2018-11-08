import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';

class Controller extends Component {}
class MouseController extends Component {}

class Wobble extends Component {
  List<double> wobbleFactor;
  Wobble() {
    wobbleFactor = List.filled(playerCircleFragments, 1.0);
  }
}

class CellWall extends Component {
  List<double> strengthFactor;
  double baseStrength;
  CellWall(this.baseStrength) {
    strengthFactor = List.filled(playerCircleFragments, 1.0);
  }
}

class OnScreen extends Component {}

class DigestionComplete extends Component {}

class Lifetime extends Component {
  double timeLeft, timeMax;

  Lifetime(this.timeMax) : timeLeft = timeMax;
}

class Thruster extends Component {}

class ThrusterParticle extends Component {}