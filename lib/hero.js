import Tile from "./tile";


class Hero extends Tile {

  constructor(x,y,stage) {
    super(x,y);
    this.name = "hero";
    this.stage = stage;
    this.image = new Image();
    this.image.onload = this.setupImage.bind(this);
    this.image.src = '../assets/hero.png';
  }

  setupImage() {
    this.graphics.beginBitmapFill(this.image).drawRect(0, 0, 641, 542);
    this.scaleX = 0.07800312012;
    this.scaleY = 0.0922509225;
    this.stage.update();
  }

}


export default Hero;
