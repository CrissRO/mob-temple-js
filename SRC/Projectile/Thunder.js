Thunder=function(x, y,size,speed,angle,range,length,target,caster)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.life = 3;
	this.sps = ProjectileSpriteSheet2;
	this.spsCoord = [0,256*4,1024,50];
	this.length = length;
	this.target=target;
	this.caster=caster;
}

Thunder.prototype.draw = function() {
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.angle);
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],this.spsCoord[2],this.spsCoord[3],
				0,0,
				this.length,50);
	ctx.restore();
	ctx.closePath();
};

Thunder.prototype.update = function() {
	
	if(this.life==3 && this.target!==0)
	{
	this.target.life-=2;	
	this.target.buffArray.push(new Knocked(this.target,20,this.caster,5));	
	}
	
	this.life--;
	
};