import 'package:damacreat/damacreat.dart';

class ClientIdPool implements IdPool {
  @override
  void addId(int id) {
    // nothing to do here on client, ids are managed on the server
  }

  /// Must never be called on the client. Ids are assigned on the server
  @override
  int getNextId() {
    assert(false, 'Must never be called on the client!');
    return 0;
  }
}
