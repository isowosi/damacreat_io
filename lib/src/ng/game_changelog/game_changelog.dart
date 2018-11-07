import 'dart:html';

import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:markdown/markdown.dart';

@Component(
  selector: 'game-changelog',
  templateUrl: 'game_changelog.html',
  styleUrls: ['../modal_popup/modal_popup.css'],
)
class GameChangelogComponent implements OnInit {
  String content;
  GameService service;
  GameChangelogComponent(this.service);

  @override
  void ngOnInit() async {
    final markdown = await HttpRequest.getString('CHANGELOG.md');

    content = markdownToHtml(markdown);
  }

  void toggleChangelog() => service.toggleChangelog();
}
