// Enemies our player must avoid
var Enemy = function(loc,speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = -50;
  this.y = loc;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  step = this.speed * dt;
  //console.log(step)
  this.x += step;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
player_step = 100;
player_step_y = 82;

var Player = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = 200;
  this.y = 400;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/char-boy.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

};

Player.prototype.handleInput = function(key) {
    
    if (key === "up") {
        if (player.y - player_step_y > -50) {
          // checking if player is not out of canvas, if not player moves
          player.y -= player_step_y
        }
    }
    if (key === "down") {
      if (player.y + player_step_y < 450) { 
        // checking if player is not out of canvas, if not player moves 
        player.y += player_step_y
      }
    }
    if (key === "left") {
        if (player.x - player_step > -50) {
          // checking if player is not out of canvas, if not player moves   
          player.x -= player_step
        }
    }
    if (key === "right") {
        // checking if player is not out of canvas, if not player moves 
        if (player.x + player_step < 450) {
          player.x += player_step
        }
    }
    player.win()
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//checks if player hasn't won yet
Player.prototype.win = function() {
    if (player.y < 50) {
        player.x = 200;
        player.y = 400;
    } 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
player = new Player();

// pixels on y axis where bug lanes are located
const lane_pixels = [60, 145, 225];


function create_bug() {
  //function randomly getting an element from an array taken from https://zenscript.wordpress.com/2013/11/23/how-to-pick-a-random-entry-out-of-an-array-javascript/
  const lane = lane_pixels[Math.floor(Math.random() * lane_pixels.length)];
  // choosing random speed
  const speed = getRandomArbitrary(40,200);

  bug = new Enemy(lane,speed);
  allEnemies.push(bug);
}

//creates a bug in irregular intervals
setInterval(create_bug, getRandomArbitrary(500,2000));

// taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  
  player.handleInput(allowedKeys[e.keyCode]);
});
