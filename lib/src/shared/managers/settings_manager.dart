import 'package:dartemis/dartemis.dart';
import 'package:damacreat_io/src/ng/token.dart';
import 'package:lawndart/lawndart.dart';

class SettingsManager extends Manager {
  bool _showFps = true;
  bool _showDebug = false;
  bool _showNicknames = true;
  bool _showMinimap = true;
  bool isTouchScreen = false;

  Store _store;
  SettingsManager(@settingsStore this._store);

  Future<void> init() async {
    _showDebug = await _getValue('showDebug', _showDebug);
    _showFps = await _getValue('showFps', _showFps);
    _showNicknames = await _getValue('showNicknames', _showNicknames);
    _showMinimap = await _getValue('showMinimap', _showMinimap);
  }

  Future<bool> _getValue(String key, bool defaultValue) async {
    final stringValue = await _store.getByKey(key);
    return stringValue == '${!defaultValue}' ? !defaultValue : defaultValue;
  }

  bool get showDebug => _showDebug;

  set showDebug(bool value) {
    _store.save(value.toString(), 'showDebug');
    _showDebug = value;
  }

  bool get showFps => _showFps;

  set showFps(bool value) {
    _store.save(value.toString(), 'showFps');
    _showFps = value;
  }

  bool get showNicknames => _showNicknames;

  set showNicknames(bool value) {
    _store.save(value.toString(), 'showNicknames');
    _showNicknames = value;
  }

  bool get showMinimap => _showMinimap;

  set showMinimap(bool value) {
    _store.save(value.toString(), 'showMinimap');
    _showMinimap = value;
  }
}
