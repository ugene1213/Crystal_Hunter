# Crystal Hunter


[Game Link][link]

[link]: http://www.eugenecheng.club/Crystal_Hunter/

![link](assets/Crystal_Hunter.png)

## How It Works

This is a simple block game. The objective of the game is to push all the tiles onto the individual tiles using the arrow keys.

## Running on Local Machine

To run on your local machine, first clone the repository:

```
git clone http://github.com/ugene1213/Crystal_Hunter
```
Run ``` npm install ``` to install all the necessary dependencies.

Finally, run ```npm run webpack``` and open the index.html file in your folder to start playing!

## Tools Used

Easel.js library images. I wanted to use Easel.js to see how the library was used. The game logic was implemented using vanilla JavaScript.

## Some Code

```javascript
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
```
This is the tile superclass, where all the objects, such as the chest, diamonds, and hero, inherit from. This tile class inherits from the Shape object of the EaselJS, which is a module of createJS  , which allowed me use many of the Shape class' useful methods, such as bitMapFill, to make rendering images easier.

## Future Features

One of the reasons that I originally chose to use EaselJS because it simplifies the craetion of sprites and animations. I would like to add sprites to the game so that I can simulate movement for my
hero. I might also add some extra animations such as a moving background.
