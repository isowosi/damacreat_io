import 'dart:html';
import 'dart:typed_data';

import 'package:damacreat/damacreat.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';
import 'package:damacreat_io/src/shared/components.dart';

part 'events.g.dart';

@Generate(GenericInputHandlingSystem, allOf: [Controller])
class ControllerSystem extends _$ControllerSystem {
  @override
  void processEntity(Entity entity) {
    final c = controllerMapper[entity]..reset();
    if (up) {
      if (left) {
        c.upleft = true;
      } else if (right) {
        c.upright = true;
      } else {
        c.up = true;
      }
    } else if (down) {
      if (left) {
        c.downleft = true;
      } else if (right) {
        c.downright = true;
      } else {
        c.down = true;
      }
    } else if (left) {
      c.left = true;
    } else if (right) {
      c.right = true;
    }
  }
}

@Generate(
  EntitySystem,
  allOf: [
    Id,
    Position,
  ],
)
class WebSocketListeningSystem extends _$WebSocketListeningSystem {
  List<Message> messages = [];

  WebSocketListeningSystem() {
    final webSocket = WebSocket('ws://localhost:8081');
    webSocket.onOpen.listen((openEvent) {
      webSocket.onMessage.listen((messageEvent) {
        FileReader reader = FileReader();
        reader.onLoad.listen((progressEvent) {
          final Uint8List data = reader.result;
          final type = MessageType.values[data[0]];
          messages.add(Message(type, data.sublist(1)));
        });
        Blob blob = messageEvent.data;
        reader.readAsArrayBuffer(blob);
      });
    });
  }

  @override
  void processEntities(Iterable<Entity> entities) {
    for (final message in messages) {
      switch (message.type) {
        case MessageType.initFood:
          _initFood(message.data);
          break;
        case MessageType.initPlayers:
          _initPlayers(message.data);
          break;
        case MessageType.updatePosition:
          _updatePosition(entities, message.data);
          break;
      }
    }

    messages.clear();
  }

  void _updatePosition(Iterable<Entity> entities, Uint8List data) {
    final Map<int, Uint8List> mappedData = {};
    for (int i = 0; i < data.length; i += 3) {
      mappedData[data[i]] = data.sublist(i, i + 3);
    }
    for (final entity in entities) {
      final id = idMapper[entity].value;
      if (mappedData.containsKey(id)) {
        final position = positionMapper[entity];
        position.x = mappedData[id][1] / 100;
        position.y = mappedData[id][2] / 100;
      }
    }
  }

  void _initFood(Uint8List data) {
    for (int i = 0; i < data.length; i += 3) {
      world.createAndAddEntity([
        Id(data[i]),
        Position(
            data[i + 1].toDouble() / 100.0, data[i + 2].toDouble() / 100.0),
      ]);
    }
  }

  void _initPlayers(Uint8List data) {
    for (int i = 0; i < data.length; i += 2) {
      world.createAndAddEntity([
        Position(data[i] / 100.0, data[i + 1] / 100.0),
        Acceleration(0.0, 0.0),
        Velocity(0.0, 0.0),
        Mass()
      ]);
    }
  }

  @override
  bool checkProcessing() => true;
}

class Message {
  final MessageType type;
  final Uint8List data;
  Message(this.type, this.data);
}
