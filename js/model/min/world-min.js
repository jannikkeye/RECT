function World(t,i){this.player={},this.enemy={},this.point={},this.width=t,this.height=i,this.loopFunction=null,this.lerp=function(t,i,e){return(1-e)*t+e*i},this.addPlayer=function(t){this.player=t},this.addEnemy=function(t){this.enemy=t},this.addPoint=function(t){this.point=t},this.destroy=function(){clearInterval(this.loopFunction),console.log("DESTROYED MODEL")},this.update=function(){this.makeEnemyFollowPlayer(this.player,this.enemy)},this.detectPlayerPointCollision=function(){this.playerPointCollision()&&(console.log("PLAYER SCORED!"),this.playerScores&&this.playerScores())},this.detectPlayerEnemyCollision=function(){this.playerEnemyCollision()&&(console.log("PLAYER DIED!"),this.playerDies&&this.playerDies())},this.playerPointCollision=function(){return this.player.x<this.point.x+this.point.width&&this.player.x+this.player.width>this.point.x&&this.player.y<this.point.y+this.point.height&&this.player.height+this.player.y>this.point.y},this.playerEnemyCollision=function(){return this.player.x<this.enemy.x+this.enemy.width&&this.player.x+this.player.width>this.enemy.x&&this.player.y<this.enemy.y+this.enemy.height&&this.player.height+this.player.y>this.enemy.y},this.makeEnemyFollowPlayer=function(){var t=this;t.dx=this.player.x-this.enemy.x,t.dy=this.player.y-this.enemy.y,t.dist=Math.sqrt(t.dx*t.dx+t.dy*t.dy),t.velX=t.dx/t.dist*this.enemy.v,t.velY=t.dy/t.dist*this.enemy.v,t.dist>1&&(this.enemy.x+=t.velX,this.enemy.y+=t.velY)},this.looseALife=function(){this.player.lives=this.player.lives-=1},this.updateRepeatedly=function(){this.update(),this.detectPlayerEnemyCollision(),this.detectPlayerPointCollision()}.bind(this),this.loopFunction=setInterval(this.updateRepeatedly,10)}