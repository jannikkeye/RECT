function World(width, height) {
    var self = this;

    self.player = {};
    self.enemy = {};
    self.point = {};

    self.width = width;
    self.height = height;

    self.loopFunction = null;

    self.lerp = function (a, b, u) {
        return (1 - u) * a + u * b;
    };

    self.addPlayer = function (player) {
        self.player = player;
    };

    self.addEnemy = function (enemy) {
        self.enemy = enemy;
    };

    self.addPoint = function (point) {
        self.point = point;
    };

    self.destroy = function () {
        clearInterval(self.loopFunction);
        console.log("DESTROYED MODEL");
    };

    self.update = function () {
        self.makeEnemyFollowPlayer(self.player, self.enemy);

    };

    self.detectPlayerPointCollision = function () {
        if (self.playerPointCollision()) {
            console.log("PLAYER SCORED!")
            if (self.playerScores) self.playerScores();
        }
    };

    self.detectPlayerEnemyCollision = function () {
        if (self.playerEnemyCollision()) {
            console.log("PLAYER DIED!")
            if (self.playerDies) self.playerDies();
        }
    };

    self.playerPointCollision = function () {
        return self.player.x < self.point.x + self.point.width &&
            self.player.x + self.player.width > self.point.x &&
            self.player.y < self.point.y + self.point.height &&
            self.player.height + self.player.y > self.point.y;
    };

    self.playerEnemyCollision = function () {
        return self.player.x < self.enemy.x + self.enemy.width &&
            self.player.x + self.player.width > self.enemy.x &&
            self.player.y < self.enemy.y + self.enemy.height &&
            self.player.height + self.player.y > self.enemy.y;
    };

    self.makeEnemyFollowPlayer = function () {

        self.dx = self.player.x - self.enemy.x;
        self.dy = self.player.y - self.enemy.y;

        self.dist = Math.sqrt(self.dx * self.dx + self.dy * self.dy);
        self.velX = (self.dx / self.dist) * self.enemy.v;
        self.velY = (self.dy / self.dist) * self.enemy.v;
        
        if(self.dist > 1){
          self.enemy.x += self.velX;
        self.enemy.y += self.velY;
        }


        //console.log(x + " " + y);
    };

    self.looseALife = function () {
        self.player.lives = self.player.lives -= 1;
        
    };

    self.updateRepeatedly = function () {
        self.update();
        self.detectPlayerEnemyCollision();
        self.detectPlayerPointCollision();
    };
    self.loopFunction = setInterval(self.updateRepeatedly, 10);
}