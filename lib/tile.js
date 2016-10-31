

const TILE_SIZE = 50;

class Tile extends createjs.Shape {

  constructor(x,y) {
    super();
    this.setPos(x,y);
  }

  setPos(x,y) {
    this.gameX = x;
    this.gameY = y;
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
  }

  getPos() {
    return {
      x: this.gameX,
      y: this.gameY
    }
  }

  move(dx, dy) {
    this.gameX += dx;
    this.gameY += dy;
    this.x += dx * TILE_SIZE;
    this.y += dy * TILE_SIZE;
  }
}

export default Tile;
