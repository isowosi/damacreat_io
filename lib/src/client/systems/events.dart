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
  manager: [
    TagManager,
  ],
)
class WebSocketListeningSystem extends _$WebSocketListeningSystem {
  List<_Message> messages = [];
  int playerId;
  final bool debug;

  WebSocketListeningSystem({this.debug}) {
    final webSocket = WebSocket('ws://localhost:8081');
    webSocket.onOpen.listen((openEvent) {
      webSocket.onMessage.listen((messageEvent) {
        final reader = FileReader();
        reader.onLoad.listen((progressEvent) {
          final Uint8List data = reader.result;
          final type = MessageToClient.values[data[0]];
          if (debug) {
            print(type);
          }
          messages.add(_Message(type, data.sublist(1)));
        });
        final blob = messageEvent.data;
        reader.readAsArrayBuffer(blob);
      });
    });
  }

  @override
  void processEntities(Iterable<Entity> entities) {
    for (final message in messages) {
      switch (message.type) {
        case MessageToClient.initFood:
          _initFood(message.data);
          break;
        case MessageToClient.initPlayers:
          _initPlayers(message.data);
          break;
        case MessageToClient.updatePosition:
          _updatePosition(entities, message.data);
          break;
        case MessageToClient.initPlayerId:
          _initPlayerId(message.data);
          break;
      }
    }

    messages.clear();
  }

  void _updatePosition(Iterable<Entity> entities, Uint8List data) {
    final mappedData = <int, Uint8List>{};
    for (var i = 0; i < data.length; i += 3) {
      mappedData[data[i]] = data.sublist(i, i + 3);
    }
    for (final entity in entities) {
      final id = idMapper[entity].value;
      if (mappedData.containsKey(id)) {
        positionMapper[entity]
          ..x = mappedData[id][1] / 100
          ..y = mappedData[id][2] / 100;
      }
    }
  }

  void _initFood(Uint8List data) {
    for (var i = 0; i < data.length; i += 3) {
      world.createAndAddEntity([
        Id(data[i]),
        Position(data[i + 1] / 100.0, data[i + 2] / 100.0),
        Food(),
      ]);
    }
  }

  void _initPlayers(Uint8List data) {
    for (var i = 0; i < data.length; i += 3) {
      final id = data[i];
      if (id != playerId) {
        world.createAndAddEntity([
          Id(id),
          Position(data[i + 1] / 100.0, data[i + 2] / 100.0),
          Player(),
        ]);
      }
    }
  }

  void _initPlayerId(Uint8List data) {
    playerId = data[0];
    tagManager.getEntity(playerTag)
      ..addComponent(Id(playerId))
      ..addComponent(Controller())
      ..changedInWorld();
  }

  @override
  bool checkProcessing() => true;
}

class _Message {
  final MessageToClient type;
  final Uint8List data;
  _Message(this.type, this.data);
}
