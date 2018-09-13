import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';
import 'package:damacreat_io/app_component.template.dart' as ng;

import 'main.template.dart' as self;

@GenerateInjector(
  routerProvidersHash,
)
const InjectorFactory injector = self.injector$Injector;

void main() {
  runApp(ng.AppComponentNgFactory, createInjector: injector);
}
