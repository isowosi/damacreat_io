import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_service.dart';

@Component(
    selector: 'game-error',
    templateUrl: 'game_error.html',
    styleUrls: ['game_error.css'])
class GameErrorComponent {
  GameService service;
  GameErrorComponent(this.service);
  String get errorMessage => service.errorMessage.toString();
  String get stackTrace => service.stackTrace.toString();
}
