import 'package:damacreat_io/client.dart';

const bool debug = bool.fromEnvironment('debug', defaultValue: true);

void main() {
  Game(debug: debug).start();
}
