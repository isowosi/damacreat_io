import 'package:angular/angular.dart';
import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';

@Component(
  selector: 'game-menu',
  templateUrl: 'game_menu.html',
  styleUrls: ['game_menu.css'],
)
class GameMenuComponent {
  GameService service;
  GameMenuComponent(this.service);

  void joinGame(String nickname) {
    service.joinGame(nickname);
  }

  int get maxLength => maxLengthNickname;
  SettingsManager get settings => service.settings;
}
