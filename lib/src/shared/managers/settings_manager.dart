import 'dart:html';
import 'dart:js';

import 'package:damacreat_io/setting_const.dart';
import 'package:dartemis/dartemis.dart';
import 'package:damacreat_io/src/ng/token.dart';
import 'package:lawndart/lawndart.dart';

class SettingsManager extends Manager {
  bool _showFps = true;
  bool _showDebug = false;
  bool _showNicknames = true;
  bool _showMinimap = true;
  bool doNotTrack = '1' == window.navigator.doNotTrack;
  bool _allowAnalytics = '1' != window.navigator.doNotTrack;

  Store _store;
  SettingsManager(@settingsStore this._store);

  Future<void> init() async {
    _showDebug = await _getValue(showDebugKey, _showDebug);
    _showFps = await _getValue(showFpsKey, _showFps);
    _showNicknames = await _getValue(showNicknamesKey, _showNicknames);
    _showMinimap = await _getValue(showMinimapKey, _showMinimap);
    if (doNotTrack) {
      _allowAnalytics = false;
    } else {
      _allowAnalytics = await _getValue(allowAnalyticsKey, _allowAnalytics);
    }

    _handleAnalytics();
  }

  bool get showDebug => _showDebug;

  set showDebug(bool value) {
    _store.save(value.toString(), showDebugKey);
    _showDebug = value;
  }

  bool get showFps => _showFps;

  set showFps(bool value) {
    _store.save(value.toString(), showFpsKey);
    _showFps = value;
  }

  bool get showNicknames => _showNicknames;

  set showNicknames(bool value) {
    _store.save(value.toString(), showNicknamesKey);
    _showNicknames = value;
  }

  bool get showMinimap => _showMinimap;

  set showMinimap(bool value) {
    _store.save(value.toString(), showMinimapKey);
    _showMinimap = value;
  }

  bool get allowAnalytics => !doNotTrack && _allowAnalytics;

  set allowAnalytics(bool value) {
    _store.save('$value', allowAnalyticsKey);
    _allowAnalytics = value;
    _updateGtag();
  }

  void _handleAnalytics() {
    if (_allowAnalytics) {
      final gtag = ScriptElement()
        ..src = 'https://www.googletagmanager.com/gtag/js?id=UA-99122887-2'
        ..defer = true;
      final gtagConfig = ScriptElement()
        ..text = '''
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-99122887-2', {'anonymize_ip': true});
      ''';
      document.head.append(gtag);
      document.head.append(gtagConfig);
    }
    _updateGtag();
  }

  Future<bool> _getValue(String key, bool defaultValue) async {
    final stringValue = await _store.getByKey(key);
    return stringValue == '${!defaultValue}' ? !defaultValue : defaultValue;
  }

  void _updateGtag() {
    context.callMethod('updateGtag', [!_allowAnalytics]);
  }
}
