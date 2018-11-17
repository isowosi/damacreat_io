import 'dart:async';
import 'dart:html';
import 'dart:typed_data';

import 'package:damacreat/damacreat.dart';

class WebSocketHandler {
  final _controller = StreamController<Message>.broadcast();
  bool _open = false;

  final WebSocket _webSocket;
  final bool debug;
  WebSocketHandler(this._webSocket, {this.debug = false}) {
    _open = true;
    _webSocket.onMessage.listen((messageEvent) {
      final reader = FileReader();
      final combiner = Uint8ListCombiner();
      reader.onLoad.listen((progressEvent) {
        final Uint8List data = reader.result;
        final messages = combiner.parse(data);
        if (!_controller.isClosed) {
          messages.forEach(_controller.add);
        }
      });
      final blob = messageEvent.data;
      reader.readAsArrayBuffer(blob);
    });
    _webSocket.onClose.listen((_) {
      _open = false;
      _controller.close();
    });
  }

  void sendData(Uint8ListWriter data) {
    if (_open) {
      _webSocket.send(data.raw);
    }
  }

  Stream<Message> get on => _controller.stream;
}
