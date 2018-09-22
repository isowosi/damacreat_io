import 'package:lawndart/lawndart.dart';

class NoopStore implements Store {
  @override
  Stream<String> all() => const Stream.empty();

  @override
  Future batch(Map<String, String> objectsByKey) => Future.value();

  @override
  Future<bool> exists(String key) => Future.value(false);

  @override
  Future<String> getByKey(String key) => Future.value('');

  @override
  Stream<String> getByKeys(Iterable<String> keys) =>
      const Stream<String>.empty();

  @override
  Stream<String> keys() => const Stream<String>.empty();

  @override
  Future nuke() => Future.value();

  @override
  Future removeByKey(String key) => Future.value();

  @override
  Future removeByKeys(Iterable<String> keys) => Future.value();

  @override
  Future<String> save(String obj, String key) => Future.value();
}
