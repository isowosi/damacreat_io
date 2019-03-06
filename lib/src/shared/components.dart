import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';

class Controller extends Component {}

class MouseController extends Component {}

class Wobble extends Component {
  List<double> wobbleFactor;
  Wobble() {
    wobbleFactor = List.filled(playerCircleFragments, 1);
  }
}

class CellWall extends Component {
  List<double> strengthFactor;
  double baseStrength;
  CellWall(this.baseStrength) {
    strengthFactor = List.filled(playerCircleFragments, 1);
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

class ColorChanger extends Component {
  double rStart, gStart, bStart, aStart;
  double rEnd, gEnd, bEnd, aEnd;
  ColorChanger(this.rStart, this.gStart, this.bStart, this.aStart, this.rEnd,
      this.gEnd, this.bEnd, this.aEnd);
}

class AttractedBy extends Component {
  Entity entity;
  AttractedBy(this.entity);
}

class Acceleration extends Component {
  double value, angle;
  Acceleration(this.value, this.angle);
}