var worldWidth = 500;
var worldHeight = 500;
var gameIsRunning = false;
var world = document.querySelector('#world');
var lastScore = 0;
var highScore = 0;
var timer = 4000;
var count = 80;
var three = "<img src='assets/img/3.png'>";
var two = "<img src='assets/img/2.png'>";
var one = "<img src='assets/img/1.png'>";


var updateCountdown = function () {
    if (timer <= 3000 && timer > 2000) {
        world.innerHTML = three;
    } else if (timer <= 2000 && timer > 1000) {
        world.innerHTML = two;
    } else if (timer <= 1000 && timer > 0) {
        world.innerHTML = one;
    }
};

document.querySelector(".startButton").addEventListener('click', function () {
    if (!gameIsRunning) {
        console.log("START NEW GAME");
        world.innerHTML = '';
        gameIsRunning = true;
        startGame();
        timer = 3000;
        setInterval(updateCountdown, 10);
    }
});

setInterval(updateCountdown, 10);


var startGame = function () {

    setTimeout(function () {
        timer = timer - 1000;
    }, 1000);
    setTimeout(function () {
        timer = timer - 1000;
    }, 2000);
    setTimeout(function () {
        timer = timer - 1000;
    }, 3000);

    setTimeout(function () {
        world.innerHTML = '';

        var model = {
            player: new Player(0, 0),
            enemy: new Enemy(worldWidth - 15, worldHeight - 15),
            point: new Point(worldWidth / 2, worldHeight / 2),
            world: new World(worldWidth, worldHeight)
        };


        var view = new CanvasView(world, worldWidth, worldHeight);
        var controller = new Controller(model, view);

        controller.initialize();


        controller.gameOver = function () {

            if (model.player.lives > 0) {
                self.chooseCorner = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                console.log(self.chooseCorner);
                if (self.chooseCorner === 1) {
                    model.enemy.x = 0;
                    model.enemy.y = 0;
                } else if (self.chooseCorner === 2) {
                    model.enemy.x = worldWidth - 15;
                    model.enemy.y = 0;
                } else if (self.chooseCorner === 3) {
                    model.enemy.x = worldWidth - 15;
                    model.enemy.y = worldHeight - 15;
                } else if (self.chooseCorner === 4) {
                    model.enemy.x = 0;
                    model.enemy.y = worldHeight - 15;
                }
                model.world.looseALife();
                controller.livesDisplay.innerHTML = model.player.lives;
                if (model.player.lives === 2) controller.livesDisplay.style.color = '#FFBA00';
                if (model.player.lives === 1) controller.livesDisplay.style.color = '#FA6666';
            }

            if (model.player.lives === 0) {
                lastScore = model.player.score;
                controller.lastScoreDisplay.innerHTML = lastScore;
                if (lastScore > highScore) highScore = lastScore;
                controller.highScoreDisplay.innerHTML = highScore;
                console.log(lastScore);
                gameIsRunning = false;
                view.destroy();
                controller.destroy();
                model.world.destroy();
                world.innerHTML = 'YOU GOT RECT!';
            }
        }
    }, 3000);
};