import 'package:damacreat_io/shared.dart';
import 'package:dartemis/dartemis.dart';

class Controller extends Component {}

class Size extends Component {
  double radius, realRadius;

  Size(this.radius) : realRadius = radius;
}

class Wobble extends Component {
  List<double> wobbleFactor;
  Wobble() {
    wobbleFactor = List.filled(circleFragments, 1.0);
  }
}

class CellWall extends Component {
  List<double> strengthFactor;
  double baseStrength;
  CellWall(this.baseStrength) {
    strengthFactor = List.filled(circleFragments, 1.0);
  }
}
