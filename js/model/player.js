function Player(x, y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.v = 4;
    self.width = 15;
    self.height = 15;
    
    self.score = 0;
    self.lives = 3;
}