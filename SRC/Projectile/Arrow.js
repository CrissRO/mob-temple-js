function Arrow(x, y,size,speed,angle,range,target)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.target = target;
	this.sps = ProjectileSpriteSheet;
	this.spsCoord = [256*0,256*0,256,256];
}

Arrow.prototype = Object.create(Projectile.prototype);

Arrow.prototype.hitTarget = function()
{
	if(Distance(this.target.x,this.x,this.target.y,this.y) <= 5)
	{
		this.alive = false;
		this.target.life -= this.baseDamage;
	}
}
Arrow.prototype.update = function() {
	this.x += this.speed * Math.cos(this.angle)*-1;
	this.y += this.speed * Math.sin(this.angle)*-1;
	this.OutOfBounds();
	this.OutOfRange();
	this.hitTarget();
};

Arrow.prototype.draw = function() {
	
	ctx.beginPath();
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				this.x-this.size/2,this.y-this.size/2,
				this.size,this.size);
	ctx.closePath();
};

