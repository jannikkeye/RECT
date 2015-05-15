function Controller(model, view) {
    var self = this;

    var keysPressed = {};

    self.initialize = function () {
        console.log("The Player has joined the game!");
        view.addObjectView(model.player, '#98E466');
        model.world.addPlayer(model.player);
        console.log("The Enemy has found you!");
        view.addObjectView(model.enemy, '#FA6666');
        model.world.addEnemy(model.enemy);
        console.log("Precious loot has spawned!");
        view.addObjectView(model.point, '#FFBA00');
        model.world.addPoint(model.point);

        //RESET AND DISPLAY LAST SCORE
        self.lastScoreLabel = document.getElementById("lastScoreLabel");
        self.lastScoreDisplay = document.getElementById("lastScoreDisplay");

        //RESET AND DISPLAY SCORE
        self.scoreLabel = document.getElementById("scoreLabel");
        self.scoreDisplay = document.getElementById("scoreDisplay");
        self.scoreDisplay.innerHTML = '';
        model.player.score = 0;
        self.scoreDisplay.innerHTML = model.player.score;

        //HIGHSCORE DISPLAY
        self.highScoreLabel = document.getElementById("highScoreLabel");
        self.highScoreDisplay = document.getElementById("highScoreDisplay");

        //RESET AND DISPLAY LIVES
        self.livesLabel = document.getElementById("livesLabel");
        self.livesDisplay = document.getElementById("livesDisplay");
        self.livesDisplay.innerHTML = '';
        model.player.lives = 3;
        self.livesDisplay.innerHTML = model.player.lives;
        self.livesDisplay.style.color = '#98E466';


        self.addEventListeners();
    };



    self.addEventListeners = function () {
        window.addEventListener('keydown', function (e) {
            keysPressed[e.keyCode] = true;
        }, true);
        window.addEventListener('keyup', function (e) {
            keysPressed[e.keyCode] = false;
        }, true);
        model.world.playerDies = self.playerDies;
        model.world.playerScores = self.playerScores;
    };

    self.playerDies = function () {
        if (self.gameOver) self.gameOver();
    };

    self.playerScores = function () {
        self.min = 0;
        self.max = 485;
        model.player.score = model.player.score += model.point.value;
        console.log("Your Score is now" + model.player.score);
        self.scoreDisplay.innerHTML = model.player.score;
        model.point.x = Math.random() * self.max;
        model.point.y = Math.random() * 485;
        if (model.player.score > 5) model.enemy.v = 2;
        if (model.player.score > 10) model.enemy.v = 4;

    };

    self.checkKeys = function () {
        if (keysPressed[37] && model.player.x > 0) model.player.x -= model.player.v;
        if (keysPressed[38] && model.player.y > 0) model.player.y -= model.player.v;
        if (keysPressed[39] && model.player.x + model.player.width <= 500) model.player.x += model.player.v;
        if (keysPressed[40] && model.player.y + model.player.width <= 500) model.player.y += model.player.v;
        setTimeout(self.checkKeys, 10);
    };
    self.checkKeys();


    self.destroy = function () {
        window.addEventListener('keydown', function (e) {
            keysPressed[e.keyCode] = true;
        }, true);
        window.addEventListener('keyup', function (e) {
            keysPressed[e.keyCode] = false;
        }, true);
    };
}