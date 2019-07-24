import 'dart:html';
import 'dart:js';

import 'package:damacreat_io/src/shared/managers/settings_manager.dart';
import 'package:dartemis/dartemis.dart';

class AnalyticsManager extends Manager {
  final String categorySession = 'session';
  final String categoryGameplay = 'gameplay';
  int deathCount = 0;

  SettingsManager _settings;
  AnalyticsManager(this._settings) {
    window.onUnload.first.then((_) {
      _endSession();
    });
  }
  // ignore: avoid_as
  JsFunction get _gtag => context['gtag'] as JsFunction;

  void joinGame({bool defaultNickname = true}) {
    _log('joinGame', categoryGameplay,
        eventLabel: defaultNickname ? 'default' : 'custom');
  }

  void _endSession() {
    _log('endSession', categorySession, eventLabel: 'deathCount$deathCount');
  }

  void _log(String event, String category, {String eventLabel, int value}) {
    if (_settings.allowAnalytics) {
      _gtag?.apply([
        'event',
        event,
        _eventData(
            eventCategory: category, eventLabel: eventLabel, value: value)
      ]);
    }
  }

  void _logException(String description) {
    if (_settings.allowAnalytics) {
      _gtag?.apply([
        'event',
        'exception',
        JsObject.jsify({
          'event_category': categorySession,
          'description': description,
          'fatal': true
        })
      ]);
    }
  }

  JsObject _eventData({String eventCategory, String eventLabel, int value}) =>
      JsObject.jsify({
        if (eventCategory != null) 'event_category': eventCategory,
        if (eventLabel != null) 'event_label': eventLabel,
        if (value != null) 'value': eventLabel,
      });

  void serverDown() {
    _log('serverDown', categorySession);
  }

  void clientError(String errorMessage) {
    _log('clientError', categorySession);
    _logException(errorMessage);
  }

  void connectionLost() {
    _log('connectionLost', categorySession);
  }

  void logFps(int fps) {
    if (_settings.allowAnalytics) {
      _gtag?.apply([
        'event',
        'FPS',
        JsObject.jsify({
          'event_category': 'performance',
          'fps': fps,
          'fpscount': 1,
        })
      ]);
    }
  }

  void logCapabilities(String capability, {bool supported = true}) {
    _log(capability, 'capabilities',
        eventLabel: supported ? 'supported' : 'unsupported');
  }
}
