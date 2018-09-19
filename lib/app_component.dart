import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_error/game_error.dart';
import 'package:damacreat_io/src/ng/game_menu/game_menu.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:damacreat_io/src/ng/page_footer/page_footer.dart';
import 'package:damacreat_io/src/ng/privacy_policy/privacy_policy.dart';
import 'package:damacreat_io/src/shared/managers/game_state_manager.dart';
import 'package:damacreat_io/src/shared/managers/settings_manager.dart';

const bool debug = bool.fromEnvironment('debug', defaultValue: false);

@Component(
  selector: 'my-app',
  styleUrls: ['app_component.css'],
  templateUrl: 'app_component.html',
  directives: [
    GameMenuComponent,
    PageFooterComponent,
    GameErrorComponent,
    PrivacyPolicyComponent,
    NgIf,
  ],
  providers: [
    GameService,
    SettingsManager,
    GameStateManager,
  ],
)
class AppComponent implements OnInit {
  GameService service;
  AppComponent(this.service);
  @override
  void ngOnInit() {
    service.startGame();
  }

  bool get menuVisible => service.menuVisible;
  bool get gameError => service.error;
  bool get showPrivacyPolicy => service.showPrivacyPolicy;
}
