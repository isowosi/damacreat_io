import 'package:angular/angular.dart';
import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/ng/color_picker/color_picker.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:damacreat_io/src/shared/managers/controller_manager.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:damacreat_io/src/version.dart';

@Component(
  selector: 'game-menu',
  templateUrl: 'game_menu.html',
  styleUrls: ['game_menu.css'],
  directives: [
    NgIf,
    ColorPickerComponent,
  ],
)
class GameMenuComponent {
  GameService service;
  GameMenuComponent(this.service);

  void joinGame() {
    service.joinGame();
  }

  void setTouchscreenDevice() {
    controller.type = ControllerType.touch;
  }

  void toggleChangelog() {
    service.showChangelog = !service.showChangelog;
  }

  int get maxLength => maxLengthNickname;
  SettingsManager get settings => service.settings;
  ControllerManager get controller => service.controllerManager;
  bool get connected =>
      service.connectionState == ServerConnectionState.connected;
  bool get connecting =>
      service.connectionState == ServerConnectionState.connecting;
  bool get connectionError =>
      service.connectionState == ServerConnectionState.error;
  String get version => packageVersion;
  String get nickname => service.nickname;
  set nickname(String value) => service.nickname = value;
}
