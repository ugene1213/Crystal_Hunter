import Tile from './tile';


class Diamond extends Tile {

  constructor(x, y, stage) {
    super(x,y);
    this.name = "diamond";
    this.stage = stage;

    this.image = new Image(32, 32);
    this.image.onload = this.setupImage.bind(this);
    this.image.src = './assets/diamond.png';
  }

  setupImage() {
    this.graphics.beginBitmapFill(this.image, "no-repeat").drawRect(0, 0, 32, 32);
    this.regX -= 8;
    this.regY -= 6;
    this.stage.update();
  }

}

export default Diamond;
