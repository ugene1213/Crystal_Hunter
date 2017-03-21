import levels from './levels';
import Barrier from './barrier';
import Hero from './hero';
import Diamond from './diamond';
import Chest from './chest';


const className = {
  '1': [Barrier],
  '2': [Diamond],
  '3': [Chest],
  '4': [Hero],
  '5': [Diamond, Chest],
  '6': [Diamond, Hero]
};


let stage;
let diamondTiles = [];
let currentLevel = 0;
let mapGroup;
let hero;
let tiles;

const init = () => {
  prepareWorld();
  window.addEventListener("keydown", onKeyDown)


  loadLevel();
}


const prepareWorld = () => {
  stage = new createjs.Stage("demo-canvas");
  mapGroup = new createjs.Container();
  mapGroup.x = 50;
  mapGroup.y = 50;
  stage.addChild(mapGroup);

}

const loadLevel = () => {
  hero = null;
  mapGroup.removeAllChildren();

  const map = levels[currentLevel].map;
  tiles = [];

  map.forEach((row, indexY) => {
    tiles.push([]);
    row.forEach((tile, indexX) => {
      const tileArr = tiles[indexY][indexX] = [];
      const classArr = className[tile];
      if(classArr) {
        classArr.forEach((TileClass) => {
          const newTile = new TileClass(indexX, indexY, stage);
          mapGroup.addChild(newTile);
          tileArr.push(newTile);
          if (newTile.name === 'hero') {
              hero = newTile;
          }
        });
        if (tile === 2 || tile === 5 || tile === 6) {
          diamondTiles.push(tileArr);
        }
      }
    });
  });

  if (!hero) {
    console.log("Could not find the hero!");
  }

  stage.update();
};

const onKeyDown = (e) => {
  e.preventDefault();
  let didMove = false;
  switch(e.keyCode) {
    case 37:
      didMove = tryMove(hero, -1, 0);
      break;
    case 38:
      didMove = tryMove(hero, 0, -1);
      break;
    case 39:
     didMove = tryMove(hero, 1, 0);
     break;
    case 40:
      didMove = tryMove(hero, 0, 1);
      break;
  }

  if (didMove) {
    stage.update();

    checkWin();
  }
};

const tryMove = (obj, x, y) => {
  const myX = obj.gameX;
  const myY = obj.gameY;
  const tryX = myX + x;
  const tryY = myY + y;
  const myTile = tiles[myY][myX];
  const tryTile = tiles[tryY] && tiles[tryY][tryX];

  const processMove = () => {
    myTile.pop();
    tryTile.push(obj);
    obj.move(x, y);
    mapGroup.addChild(obj);
    return true;
  };

  if (!tryTile) {
    return false;
  }

  if (!tryTile.length) {
    return processMove();
  }

  const tryTileTop = tryTile[tryTile.length - 1];

  if (tryTileTop.name === 'barrier') {
    return false;
  }
  if (tryTileTop.name === 'chest') {
    if (obj.name === 'chest') {
      return false;
    }

    const canTryTileMOve = tryMove(tryTileTop, x, y);

    if (!canTryTileMOve) {
      return false;
    }
  }

  return processMove();

};

const checkWin = () => {
  const anyFailing = diamondTiles.some( (tileArr) => {
    return tileArr[tileArr.length - 1].name != 'chest';
  });

  if (!anyFailing) {
    currentLevel++;
    if (currentLevel === levels.length) {
      alert("You've won the game!");
    } else {
      setTimeout(loadLevel, 300);
    }
  }
};



window.addEventListener("DOMContentLoaded", init);
window.onload = () => {
  const link = document.getElementById("restart");

  link.onclick = () => {
    loadLevel();
    return false;
  }

};
