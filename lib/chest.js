import Tile from './tile';


class Chest extends Tile {
  constructor(x, y, stage) {
    super(x,y);
    this.name = 'chest';
    this.stage = stage;

    this.image = new Image();
    this.image.onload = this.setupImage.bind(this);
    this.image.src = './assets/chest.png';
  }

  setupImage() {
    this.graphics.beginBitmapFill(this.image).drawRect(0, 0, 1000, 402);
    this.scaleX = 0.05;
    this.scaleY = 0.12437810945;
    this.stage.update();
  }
}


export default Chest;
