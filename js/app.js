"use strict";
// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Setting the location and speed of enemies
        this.x = x;
        this.y = y;
        this.speed = Math.random() * speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Multiplies any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        // If the enemy reached the end of the canvass, the position will be set to -80
        // and set the speed randomly
        if (this.x > 520) {
            this.x = -80;
            this.speed = 200 + Math.floor(Math.random() * 180);
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Setting the location and character/image of the player
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-pink-girl.png';
        this.x = x;
        this.y = y;
    }
    // Handles the direction of the player using UP, DOWN, LEFT, and RIGHT keys
    handleInput(direction) {
        switch(direction){
            case "up":
                if (this.y == 73) {
                    this.y -= 83;
                    this.render();
    
                    // If the player reach the water block, reset the location to its default position
                    // and set a 3 seconds delay
                    setTimeout(() => {
                        this.reset();
                        this.render();
                    }, 300);
                }else if (this.y > 1){
                    this.y -= 83;
                    this.render();
                }
                break;
            case "down":
                if (this.y < 405){
                    this.y += 83;
                    this.render();
                }
                break;
            case "left":
                if (this.x > 0){
                    this.x -= 102;
                    this.render();
                }
                break;
            case "right":
                if (this.x < 405){
                    this.x += 102;
                    this.render();
                }
                break;
    
        }
    }
    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Handles any update on the player
    update() {
        this.checkCollisions();
    }
    // Check each enemies if it collides with the player
    // Once an enemy collides with the player, it moves back to its original position
    checkCollisions(){
        allEnemies.forEach(function(enemy){
            if (enemy.x < player.x + 60 &&
                enemy.x + 60 > player.x &&
                enemy.y < player.y + 60 &&
                enemy.y + 60 > player.y){
                player.reset();
            }
        });
    }
    // Resets the location of the player to its original position
    // x postion = 202, y position = 405
    reset() {
        this.x = 202;
        this.y = 405;
    }
}

// Setting the default horizontal position of each enemy to 63, 147 and 230
// Total of five enemies will be created
var allEnemies = [];
var enemyPosition = [63, 147, 230, 230, 63];

// Place all enemy objects in an array called allEnemies
enemyPosition.forEach(function(positionY){
    var enemy = new Enemy(0, positionY, 300);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
// Setting the default position if the player to bottom-center of the canvass
// x postion = 202, y position = 405
var player = new Player(202, 405);

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