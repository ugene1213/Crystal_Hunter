import Tile from './tile';


class Barrier extends Tile {

  constructor(x, y, stage) {
    super(x,y);
    this.name = 'barrier';
    this.stage = stage;

    this.image = new Image();
    this.image.onload = this.setupImage.bind(this);
    this.image.src = '../assets/trees.png';
  }

  setupImage() {
    this.graphics.beginBitmapFill(this.image).drawRect(0, 0, 112, 128);
    this.scaleX = .5;
    this.scaleY = .5;
    this.stage.update();
  }
}

export default Barrier;
