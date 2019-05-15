import 'dart:html';
import 'dart:js';

import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:dartemis/dartemis.dart';

class AnalyticsManager extends Manager {
  SettingsManager _settings;
  AnalyticsManager(this._settings) {
    window.onUnload.first.then((_) {
      _endSession();
    });
  }
  // ignore: avoid_as
  JsFunction get _gtag => context['gtag'] as JsFunction;

  void joinGame({bool defaultNickname = true}) {
    _log('joinGame', 'gameplay',
        eventLabel: defaultNickname ? 'default' : 'custom');
  }

  void _endSession() {
    _log('endSession', 'session');
  }

  void _log(String event, String category, {String eventLabel}) {
    if (_settings.allowAnalytics) {
      _gtag?.apply([
        'event',
        event,
        _eventData(eventCategory: category, eventLabel: eventLabel)
      ]);
    }
  }

  JsObject _eventData(
          {String eventCategory, String eventLabel, String value}) =>
      JsObject.jsify({
        if (eventCategory != null) 'event_category': eventCategory,
        if (eventLabel != null) 'event_label': eventLabel,
        if (value != null) 'value': eventLabel,
      });
}
