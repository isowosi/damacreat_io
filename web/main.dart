import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';
import 'package:damacreat_io/app_component.template.dart' as ng;
import 'package:damacreat_io/noop.dart';
import 'package:damacreat_io/src/ng/token.dart';
import 'package:lawndart/lawndart.dart';

import 'main.template.dart' as self;

@GenerateInjector([
  routerProvidersHash,
  settingsDatabaseProvider,
])
const InjectorFactory injector = self.injector$Injector;

Store _settingsStore;

Future<void> main() async {
  try {
    _settingsStore = await Store.open('damacreat.io', 'settings');
    // ignore: avoid_catches_without_on_clauses
  } catch (_) {
    print('Cannot access local storage - settings will not be stored');
    _settingsStore = NoopStore();
  }
  runApp(ng.AppComponentNgFactory, createInjector: injector);
}

const Provider<Store> settingsDatabaseProvider =
    FactoryProvider.forToken(settingsStore, getSettingsStore);
Store getSettingsStore() => _settingsStore;
