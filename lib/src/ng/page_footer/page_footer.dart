import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:isowosi_angular_components/isowosi_angular_components.dart';

@Component(
  selector: 'page-footer',
  templateUrl: 'page_footer.html',
  styleUrls: ['page_footer.css'],
  directives: [isowosiDirectives],
)
class PageFooterComponent {
  DateTime lastUpdate = DateTime.utc(2018, DateTime.september, 13);
  DateTime today = DateTime.now();
  GameService service;
  PageFooterComponent(this.service);

  void togglePrivacyPolicy() => service.togglePrivacyPolicy();

  String getLastUpdate() {
    final diff = today.difference(lastUpdate).inDays;
    if (diff > 1) {
      return '$diff days ago';
    } else if (diff == 1) {
      return 'yesterday';
    }
    return 'today';
  }
}
