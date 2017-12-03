function Projectile(x, y,size ,speed, angle,range)
{
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.angle = angle;
	this.size=size * WindowScale;
	this.alive = true;
	this.startPos = {
		x:this.x,
		y:this.y
	}
	
	this.baseDamage = 3;
	this.range=range*WindowScale;
	this.sps;
	this.spsCoord=[];
}

Projectile.prototype.OutOfBounds = function()
{
	if(this.x > CanvasObj.limitX2 ||
		this.x < CanvasObj.limitX1 ||
		this.y > CanvasObj.limitY2 ||
		this.y < CanvasObj.limitY1)
		this.alive = false;
};

Projectile.prototype.OutOfRange = function()
{
	
};
