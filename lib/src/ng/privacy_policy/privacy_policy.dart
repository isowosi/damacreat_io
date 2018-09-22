import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';

@Component(
  selector: 'privacy-policy',
  templateUrl: 'privacy_policy.html',
  styleUrls: ['privacy_policy.css'],
  directives: [
    NgIf,
  ],
)
class PrivacyPolicyComponent {
  GameService service;
  PrivacyPolicyComponent(this.service);

  void togglePrivacyPolicy() => service.togglePrivacyPolicy();
  SettingsManager get settings => service.settings;
}
