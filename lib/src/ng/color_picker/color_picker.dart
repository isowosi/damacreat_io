import 'dart:html';

import 'package:angular/angular.dart';
import 'package:damacreat_io/src/ng/game_service.dart';
import 'package:gamedev_helpers/gamedev_helpers_shared.dart' hide Component;

@Component(
  selector: 'color-picker',
  templateUrl: 'color_picker.html',
  styleUrls: ['color_picker.css'],
)
class ColorPickerComponent implements OnInit {
  @ViewChild('preview')
  CanvasElement canvas;
  GameService service;
  ColorPickerComponent(this.service);

  int get hue => service.hue;

  void setHue(String hueString) {
    service.setPlayerHue(hueString);
    updateHue(hue);
  }

  @override
  Future<void> ngOnInit() async {
    final source =
        ImageElement(src: 'img/colorpickpreview.png', width: 100, height: 100);
    await source.onLoad.first;
    canvas.context2D.drawImage(source, 0, 0);
    updateHue(hue);
  }

  void updateHue(int hue) {
    final hIn = hue / 256;
    final data =
        canvas.context2D.getImageData(0, 0, canvas.width, canvas.height);
    final pixels = data.data;

    for (var i = 0; i < pixels.length; i += 4) {
      final hsl = rgbToHsl(
          pixels[i + 0] / 255, pixels[i + 1] / 255, pixels[i + 2] / 255);

      final newPixel = hslToRgb(hIn, hsl[1], hsl[2]);

      pixels[i + 0] = (newPixel[0] * 255).floor();
      pixels[i + 1] = (newPixel[1] * 255).floor();
      pixels[i + 2] = (newPixel[2] * 255).floor();
    }

    canvas.context2D.putImageData(data, 0, 0);
  }
}
