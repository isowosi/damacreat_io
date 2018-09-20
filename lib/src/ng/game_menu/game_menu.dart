import 'package:angular/angular.dart';
import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:damacreat_io/src/version.dart';

@Component(
  selector: 'game-menu',
  templateUrl: 'game_menu.html',
  styleUrls: ['game_menu.css'],
  directives: [
    NgIf,
  ],
)
class GameMenuComponent {
  GameService service;
  GameMenuComponent(this.service);

  void joinGame(String nickname) {
    service.joinGame(nickname);
  }

  int get maxLength => maxLengthNickname;
  SettingsManager get settings => service.settings;
  bool get connected =>
      service.connectionState == ServerConnectionState.connected;
  bool get connecting =>
      service.connectionState == ServerConnectionState.connecting;
  bool get connectionError =>
      service.connectionState == ServerConnectionState.error;
  String get version => packageVersion;
  String get name => service.lastName;
}
