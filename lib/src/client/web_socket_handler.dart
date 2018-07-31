import 'dart:async';
import 'dart:html';
import 'dart:typed_data';

import 'package:damacreat/damacreat.dart';

class WebSocketHandler {
  final _streams = <MessageToClient, StreamController<Uint8List>>{};
  bool _open = false;

  final WebSocket _webSocket;
  final bool debug;
  WebSocketHandler(this._webSocket, {this.debug = false}) {
    _open = true;
    _webSocket.onMessage.listen((messageEvent) {
      final reader = FileReader();
      reader.onLoad.listen((progressEvent) {
        final Uint8List data = reader.result;
        final type = MessageToClient.values[data[0]];
        if (debug) {
          print(type);
        }
        _streams[type]?.add(data.sublist(1));
      });
      final blob = messageEvent.data;
      reader.readAsArrayBuffer(blob);
    });
    _webSocket.onClose.listen((_) {
      _open = false;
    });
  }

  void sendData(MessageToServer type, Uint8List data) {
    if (_open) {
      final toSend = Uint8List(data.length + 1);
      toSend[0] = type.index;
      toSend.setAll(1, data);
      _webSocket.send(toSend);
    }
  }

  Stream<Uint8List> on(MessageToClient type) => _streams
        .putIfAbsent(type, () => StreamController<Uint8List>.broadcast())
        .stream;
}

class Message {
  final MessageToClient type;
  final Uint8List data;
  Message(this.type, this.data);
}
