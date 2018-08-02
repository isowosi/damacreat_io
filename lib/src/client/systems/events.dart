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
  VoidEntitySystem,
  mapper: [
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
  void processSystem() {
    final messages = _messages.entries.where((entry) => entry.value.isNotEmpty);
    for (final entry in messages) {
      _handleMessages(entry.key, entry.value);
      entry.value.clear();
    }
  }

  void _handleMessages(MessageToClient type, List<Uint8List> data) {
    switch (type) {
      case MessageToClient.initFood:
        data.forEach(_initFood);
        break;
      case MessageToClient.initPlayers:
        data.forEach(_initPlayers);
        break;
      case MessageToClient.updatePosition:
        data.forEach(_updatePosition);
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

  void _updatePosition(Uint8List data) {
    for (var i = 0; i < data.length; i += 3) {
      final id = data[i];
      final entity = idManager.getEntity(id);
      final x = data[i + 1];
      final y = data[i + 2];
      positionMapper[entity]
        ..x = x.toDouble()
        ..y = y.toDouble();
    }
  }

  void _initFood(Uint8List data) {
    for (var i = 0; i < data.length; i += 3) {
      world.createAndAddEntity([
        Id(data[i]),
        Position(data[i + 1].toDouble(), data[i + 2].toDouble()),
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
          Position(data[i + 1].toDouble(), data[i + 2].toDouble()),
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
