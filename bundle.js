/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _levels = __webpack_require__(1);
	
	var _levels2 = _interopRequireDefault(_levels);
	
	var _barrier = __webpack_require__(2);
	
	var _barrier2 = _interopRequireDefault(_barrier);
	
	var _hero = __webpack_require__(4);
	
	var _hero2 = _interopRequireDefault(_hero);
	
	var _diamond = __webpack_require__(5);
	
	var _diamond2 = _interopRequireDefault(_diamond);
	
	var _chest = __webpack_require__(6);
	
	var _chest2 = _interopRequireDefault(_chest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var className = {
	  '1': [_barrier2.default],
	  '2': [_diamond2.default],
	  '3': [_chest2.default],
	  '4': [_hero2.default],
	  '5': [_diamond2.default, _chest2.default],
	  '6': [_diamond2.default, _hero2.default]
	};
	
	var stage = void 0;
	var diamondTiles = [];
	var currentLevel = 0;
	var mapGroup = void 0;
	var hero = void 0;
	var tiles = void 0;
	
	var init = function init() {
	  prepareWorld();
	  window.addEventListener("keydown", onKeyDown);
	
	  loadLevel();
	};
	
	var prepareWorld = function prepareWorld() {
	  stage = new createjs.Stage("demo-canvas");
	  mapGroup = new createjs.Container();
	  mapGroup.x = 50;
	  mapGroup.y = 50;
	  stage.addChild(mapGroup);
	};
	
	var loadLevel = function loadLevel() {
	  hero = null;
	  mapGroup.removeAllChildren();
	
	  var map = _levels2.default[currentLevel].map;
	  tiles = [];
	
	  map.forEach(function (row, indexY) {
	    tiles.push([]);
	    row.forEach(function (tile, indexX) {
	      var tileArr = tiles[indexY][indexX] = [];
	      var classArr = className[tile];
	      if (classArr) {
	        classArr.forEach(function (TileClass) {
	          var newTile = new TileClass(indexX, indexY, stage);
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
	
	var onKeyDown = function onKeyDown(e) {
	  e.preventDefault();
	  var didMove = false;
	  switch (e.keyCode) {
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
	
	var tryMove = function tryMove(obj, x, y) {
	  var myX = obj.gameX;
	  var myY = obj.gameY;
	  var tryX = myX + x;
	  var tryY = myY + y;
	  var myTile = tiles[myY][myX];
	  var tryTile = tiles[tryY] && tiles[tryY][tryX];
	
	  var processMove = function processMove() {
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
	
	  var tryTileTop = tryTile[tryTile.length - 1];
	
	  if (tryTileTop.name === 'barrier') {
	    return false;
	  }
	  if (tryTileTop.name === 'chest') {
	    if (obj.name === 'chest') {
	      return false;
	    }
	
	    var canTryTileMOve = tryMove(tryTileTop, x, y);
	
	    if (!canTryTileMOve) {
	      return false;
	    }
	  }
	
	  return processMove();
	};
	
	var checkWin = function checkWin() {
	  var anyFailing = diamondTiles.some(function (tileArr) {
	    return tileArr[tileArr.length - 1].name != 'chest';
	  });
	
	  if (!anyFailing) {
	    currentLevel++;
	    if (currentLevel === _levels2.default.length) {
	      alert("You've won the game!");
	    } else {
	      setTimeout(loadLevel, 300);
	    }
	  }
	};
	
	window.addEventListener("DOMContentLoaded", init);
	window.onload = function () {
	  var link = document.getElementById("restart");
	
	  link.onclick = function () {
	    loadLevel();
	    return false;
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var levels = [{
	  name: 'Level 1',
	  map: [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 2, 0, 0, 3, 0, 1], [1, 0, 3, 0, 0, 2, 4, 1], [1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]]
	}, {
	  name: 'Level 2',
	  map: [[1, 1, 1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 1, 1, 1, 1], [1, 0, 2, 0, 0, 3, 0, 1], [1, 0, 3, 0, 0, 2, 4, 1], [1, 1, 1, 0, 0, 1, 1, 1], [0, 0, 1, 1, 1, 1, 0, 0]]
	}, {
	  name: 'Level 3',
	  map: [[1, 1, 1, 1, 1, 0, 0, 0, 0], [1, 0, 0, 4, 1, 0, 0, 0, 0], [1, 0, 3, 3, 1, 0, 1, 1, 1], [1, 0, 3, 0, 1, 0, 1, 2, 1], [1, 1, 1, 0, 1, 1, 1, 2, 1], [0, 1, 1, 0, 0, 0, 0, 2, 1], [0, 1, 0, 0, 0, 1, 0, 0, 1], [0, 1, 0, 0, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 0, 0, 0]]
	}, {
	  name: 'Level 4',
	  map: [[1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1], [1, 4, 3, 2, 2, 3, 0, 1], [1, 0, 3, 2, 5, 0, 1, 1], [1, 0, 3, 2, 2, 3, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1]]
	}, {
	
	  name: 'Level 5',
	  map: [[1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 3, 2, 2, 1], [1, 2, 2, 1, 2, 2, 1], [1, 0, 3, 3, 3, 0, 1], [1, 0, 0, 3, 0, 0, 1], [1, 0, 3, 3, 3, 0, 1], [1, 0, 0, 1, 4, 0, 1], [1, 1, 1, 1, 1, 1, 1]]
	}, {
	  name: 'Level 6',
	  map: [[1, 1, 1, 1, 1, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 3, 0, 0, 0, 3, 0, 1], [1, 2, 2, 1, 3, 1, 3, 1, 1], [1, 2, 4, 3, 0, 0, 0, 1, 1], [1, 2, 2, 0, 0, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0]]
	}];
	
	exports.default = levels;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tile = __webpack_require__(3);
	
	var _tile2 = _interopRequireDefault(_tile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Barrier = function (_Tile) {
	  _inherits(Barrier, _Tile);
	
	  function Barrier(x, y, stage) {
	    _classCallCheck(this, Barrier);
	
	    var _this = _possibleConstructorReturn(this, (Barrier.__proto__ || Object.getPrototypeOf(Barrier)).call(this, x, y));
	
	    _this.name = 'barrier';
	    _this.stage = stage;
	
	    _this.image = new Image();
	    _this.image.onload = _this.setupImage.bind(_this);
	    _this.image.src = './assets/trees.png';
	    return _this;
	  }
	
	  _createClass(Barrier, [{
	    key: 'setupImage',
	    value: function setupImage() {
	      this.graphics.beginBitmapFill(this.image).drawRect(0, 0, 112, 128);
	      this.scaleX = .5;
	      this.scaleY = .5;
	      this.stage.update();
	    }
	  }]);
	
	  return Barrier;
	}(_tile2.default);
	
	exports.default = Barrier;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TILE_SIZE = 50;
	
	var Tile = function (_createjs$Shape) {
	  _inherits(Tile, _createjs$Shape);
	
	  function Tile(x, y) {
	    _classCallCheck(this, Tile);
	
	    var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this));
	
	    _this.setPos(x, y);
	    return _this;
	  }
	
	  _createClass(Tile, [{
	    key: "setPos",
	    value: function setPos(x, y) {
	      this.gameX = x;
	      this.gameY = y;
	      this.x = x * TILE_SIZE;
	      this.y = y * TILE_SIZE;
	    }
	  }, {
	    key: "getPos",
	    value: function getPos() {
	      return {
	        x: this.gameX,
	        y: this.gameY
	      };
	    }
	  }, {
	    key: "move",
	    value: function move(dx, dy) {
	      this.gameX += dx;
	      this.gameY += dy;
	      this.x += dx * TILE_SIZE;
	      this.y += dy * TILE_SIZE;
	    }
	  }]);
	
	  return Tile;
	}(createjs.Shape);
	
	exports.default = Tile;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tile = __webpack_require__(3);
	
	var _tile2 = _interopRequireDefault(_tile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Hero = function (_Tile) {
	  _inherits(Hero, _Tile);
	
	  function Hero(x, y, stage) {
	    _classCallCheck(this, Hero);
	
	    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, x, y));
	
	    _this.name = "hero";
	    _this.stage = stage;
	    _this.image = new Image();
	    _this.image.onload = _this.setupImage.bind(_this);
	    _this.image.src = './assets/hero.png';
	    return _this;
	  }
	
	  _createClass(Hero, [{
	    key: "setupImage",
	    value: function setupImage() {
	      this.graphics.beginBitmapFill(this.image).drawRect(0, 0, 641, 542);
	      this.scaleX = 0.07800312012;
	      this.scaleY = 0.0922509225;
	      this.stage.update();
	    }
	  }]);
	
	  return Hero;
	}(_tile2.default);
	
	exports.default = Hero;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tile = __webpack_require__(3);
	
	var _tile2 = _interopRequireDefault(_tile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Diamond = function (_Tile) {
	  _inherits(Diamond, _Tile);
	
	  function Diamond(x, y, stage) {
	    _classCallCheck(this, Diamond);
	
	    var _this = _possibleConstructorReturn(this, (Diamond.__proto__ || Object.getPrototypeOf(Diamond)).call(this, x, y));
	
	    _this.name = "diamond";
	    _this.stage = stage;
	
	    _this.image = new Image(32, 32);
	    _this.image.onload = _this.setupImage.bind(_this);
	    _this.image.src = './assets/diamond.png';
	    return _this;
	  }
	
	  _createClass(Diamond, [{
	    key: 'setupImage',
	    value: function setupImage() {
	      this.graphics.beginBitmapFill(this.image, "no-repeat").drawRect(0, 0, 32, 32);
	      this.regX -= 8;
	      this.regY -= 6;
	      this.stage.update();
	    }
	  }]);
	
	  return Diamond;
	}(_tile2.default);
	
	exports.default = Diamond;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tile = __webpack_require__(3);
	
	var _tile2 = _interopRequireDefault(_tile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Chest = function (_Tile) {
	  _inherits(Chest, _Tile);
	
	  function Chest(x, y, stage) {
	    _classCallCheck(this, Chest);
	
	    var _this = _possibleConstructorReturn(this, (Chest.__proto__ || Object.getPrototypeOf(Chest)).call(this, x, y));
	
	    _this.name = 'chest';
	    _this.stage = stage;
	
	    _this.image = new Image();
	    _this.image.onload = _this.setupImage.bind(_this);
	    _this.image.src = './assets/chest.png';
	    return _this;
	  }
	
	  _createClass(Chest, [{
	    key: 'setupImage',
	    value: function setupImage() {
	      this.graphics.beginBitmapFill(this.image).drawRect(0, 0, 1000, 402);
	      this.scaleX = 0.05;
	      this.scaleY = 0.12437810945;
	      this.stage.update();
	    }
	  }]);
	
	  return Chest;
	}(_tile2.default);
	
	exports.default = Chest;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map