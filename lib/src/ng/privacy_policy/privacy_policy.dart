import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_service.dart';

@Component(
    selector: 'privacy-policy',
    templateUrl: 'privacy_policy.html',
    styleUrls: ['privacy_policy.css'])
class PrivacyPolicyComponent {
  GameService service;
  PrivacyPolicyComponent(this.service);

  void togglePrivacyPolicy() => service.togglePrivacyPolicy();
}
