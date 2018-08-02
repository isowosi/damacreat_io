import 'dart:async';
import 'dart:html';
import 'dart:typed_data';

import 'package:damacreat/damacreat.dart';

class WebSocketHandler {
  final _streams = <MessageToClient, StreamController<Uint8ListReader>>{};
  bool _open = false;

  final WebSocket _webSocket;
  final bool debug;
  WebSocketHandler(this._webSocket, {this.debug = false}) {
    _open = true;
    _webSocket.onMessage.listen((messageEvent) {
      final reader = FileReader();
      reader.onLoad.listen((progressEvent) {
        final Uint8List data = reader.result;
        final uint8ListReader = Uint8ListReader(data.sublist(1));
        final type = MessageToClient.values[data[0]];
        if (debug) {
          print(type);
        }
        _streams[type]?.add(uint8ListReader);
      });
      final blob = messageEvent.data;
      reader.readAsArrayBuffer(blob);
    });
    _webSocket.onClose.listen((_) {
      _open = false;
    });
  }

  void sendData(Uint8ListWriter data) {
    if (_open) {
      _webSocket.send(data.raw);
    }
  }

  Stream<Uint8ListReader> on(MessageToClient type) => _streams
        .putIfAbsent(type, () => StreamController<Uint8ListReader>.broadcast())
        .stream;
}

class Message {
  final MessageToClient type;
  final Uint8List data;
  Message(this.type, this.data);
}
