function Cut(x, y,size,speed,angle,range,target)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.life = 5;
	this.sps = ProjectileSpriteSheet2;
	this.spsCoord = [0*256,256*2,0,256];
	this.increment = this.spsCoord[3]/this.life;
	this.target=target;

}

Cut.prototype = Object.create(Projectile.prototype);

Cut.prototype.draw = function() {
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.x+Math.cos(this.angle)*this.speed,this.y+Math.sin(this.angle)*this.speed);
	ctx.rotate(this.angle+Math.PI/2);
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				-this.size/2,-this.size/2,
				this.size,this.size);
	ctx.restore();
	ctx.closePath();
};

Cut.prototype.update = function() {
	if(this.life == 5)
	{
		this.target.life-=5;
		this.target.buffArray.push(new Knocked(this.target,10,this,5));
	}
	this.life--;
	this.spsCoord[2]+=this.increment;
	

};