import 'dart:html';
import 'dart:typed_data';

import 'package:damacreat/damacreat.dart';
import 'package:damacreat_io/src/client/web_socket_handler.dart';
import 'package:gamedev_helpers/gamedev_helpers.dart';
import 'package:damacreat_io/src/shared/components.dart';

part 'events.g.dart';

@Generate(
  GenericInputHandlingSystem,
  allOf: [
    Controller,
  ],
)
class ControllerSystem extends _$ControllerSystem {
  WebSocketHandler _webSocketHandler;
  CanvasElement canvas;
  Point<num> offset = const Point<num>(0.0, 0.0);
  ControllerSystem(this.canvas, this._webSocketHandler);

  @override
  void initialize() {
    super.initialize();
    canvas.onMouseMove.listen((event) {
      offset = event.offset;
    });
  }

  @override
  void processEntity(Entity entity) {
    final center = Point<num>(canvas.width / 2, canvas.height / 2);
    final maxDistance = min(canvas.width / 3, canvas.height / 3);
    final distance = center.distanceTo(offset);
    final velocity = [
      (min(maxDistance, distance) / maxDistance * 255).round(),
      ((pi + atan2(center.y - offset.y, center.x - offset.x)) / (2 * pi) * 255)
          .round()
    ];
    _webSocketHandler.sendData(
        MessageToServer.updateVelocity, Uint8List.fromList(velocity));
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
    IdManager,
  ],
)
class WebSocketListeningSystem extends _$WebSocketListeningSystem {
  final _messages = <MessageToClient, List<Uint8List>>{};
  final WebSocketHandler _webSocketHandler;
  int playerId;

  WebSocketListeningSystem(this._webSocketHandler) {
    MessageToClient.values.forEach(_storeMessages);
  }

  void _storeMessages(MessageToClient type) {
    _messages[type] = <Uint8List>[];
    _webSocketHandler.on(type).listen((data) => _messages[type].add(data));
  }

  @override
  void processEntities(Iterable<Entity> entities) {
    final messages = _messages.entries.where((entry) => entry.value.isNotEmpty);
    for (final entry in messages) {
      _handleMessages(entities, entry.key, entry.value);
      entry.value.clear();
    }
  }

  void _handleMessages(
      Iterable<Entity> entities, MessageToClient type, List<Uint8List> data) {
    switch (type) {
      case MessageToClient.initFood:
        data.forEach(_initFood);
        break;
      case MessageToClient.initPlayers:
        data.forEach(_initPlayers);
        break;
      case MessageToClient.updatePosition:
        for (final value in data) {
          _updatePosition(entities, value);
        }
        break;
      case MessageToClient.initPlayerId:
        data.forEach(_initPlayerId);
        break;
      case MessageToClient.removePlayers:
        for (final value in data) {
          value.forEach(idManager.deleteEntity);
        }
        break;
    }
    data.clear();
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
