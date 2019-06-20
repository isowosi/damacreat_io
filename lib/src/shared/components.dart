import 'package:damacreat/damacreat.dart';
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

class DigestionComplete extends Component {}

class Thruster extends Component {}

class ThrusterParticle extends Component {}

class ColorChanger extends Component {
  double rStart, gStart, bStart, aStart;
  double rEnd, gEnd, bEnd, aEnd;
  ColorChanger(this.rStart, this.gStart, this.bStart, this.aStart, this.rEnd,
      this.gEnd, this.bEnd, this.aEnd);
}

class AttractedBy extends EntityReferenceComponent {}

class Acceleration extends Component {
  double value, angle;
  Acceleration(this.value, this.angle);
}