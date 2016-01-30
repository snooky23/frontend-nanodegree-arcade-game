// Board Setup class
var Board = function() {
    this.width = 505; 
    this.height = 606;

    this.xslots = 6;
    this.yslots = 6;
};

Board.prototype.getXLocation = function(x) {
    return x * this.getXSlotSize();
};

Board.prototype.getYLocation = function(y) {
    return y * this.getYSlotSize();
};

Board.prototype.getXSlotSize = function() {
    return this.width / this.xslots;
};

Board.prototype.getYSlotSize = function() {
    return this.height / this.yslots;
};


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xLocation;
    this.yLocation;
    this.speed;

    this.resetLocation();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.xLocation > 6) {
        this.resetLocation();
    }
    this.xLocation = this.xLocation + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), board.getYLocation(this.xLocation), board.getXLocation(this.yLocation) - 30);
};

Enemy.prototype.resetLocation = function() {
    this.xLocation = -0.1;
    this.yLocation = Math.floor(Math.random() * 3) + 1 ;
    this.speed = Math.floor(Math.random() * 3) + 1 ;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // Start location of the player
    this.xLocation = 2;
    this.yLocation = 5;
    this.collision = false;
    this.win = false;
};

Player.prototype.update = function() {
    if(this.collision === true || this.win === true) {
        this.win = this.reset = false;
        this.xLocation = 2;
        this.yLocation = 5;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), board.getYLocation(this.xLocation), board.getXLocation(this.yLocation) - 30);
};

Player.prototype.setLocation = function(x , y) {
    this.xLocation = x;
    this.yLocation = y;
};

Player.prototype.resetLocation = function() {
    this.setLocation(2,5);
};

Player.prototype.handleInput = function(key) {
    //console.log("x: " + this.xLocation + " y: " + this.yLocation);
    if(key === 'left') {
        if(this.xLocation > 0) {
            this.xLocation = this.xLocation - 1; 
        }
    } else if (key === 'up') {
        if(this.yLocation > 1) {
            this.yLocation = this.yLocation - 1; 
        } else if (this.yLocation === 1){
            this.win = true;
        }
    } else if (key === 'right') {
        if(this.xLocation < 4) {
            this.xLocation = this.xLocation + 1; 
        }
    } else if (key === 'down') {
        if(this.yLocation < 5) {
            this.yLocation = this.yLocation + 1; 
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//create the board
var board = new Board();
//create the player
var player = new Player();
//create enemies
var allEnemies = [new Enemy() , new Enemy() ,new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
