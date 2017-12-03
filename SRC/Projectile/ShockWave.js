ShockWave=function(x,y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.size = this.size;
	this.targetArray = targetArray;
	this.life = 50;
	this.sps = ProjectileSpriteSheet2;
	this.spsCoord = [256*0,256*0,256,256];
	this.range = range;
	this.angle=angle;
	
}
ShockWave.prototype = Object.create(Projectile.prototype);

ShockWave.prototype.update=function()
{

	this.life--;
	this.x += this.speed * Math.cos(this.angle);
	this.y += this.speed * Math.sin(this.angle);
	if(this.life%1==0)
	{

	var p =new ParticleGen2(this.x-this.speed * Math.cos(this.angle),
							this.y-this.speed * Math.sin(this.angle),
							5,5,
							8,8,
							10,10,
							new Color(255,RandomI(220,250),40));

	pgens.push(p);	
	}

	this.OutOfBounds();

	if(this.nearCheck(this.range) && this.life%2==0)
		this.knock(this.range);

		
}

ShockWave.prototype.draw=function()
{

	ctx.beginPath();
	
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.angle+Math.PI/2);
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				-this.size/2,-this.size/2,
				this.size,this.size);
	ctx.restore();
	
	ctx.closePath();

}

ShockWave.prototype.nearCheck = function(range){

	for(var i=0;i<this.targetArray.length;i++)
	{
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<range)
			return true;
	}
}
ShockWave.prototype.knock = function(range)
{
	for(var i=0;i<this.targetArray.length;i++)
		if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<range)
		{
			this.targetArray[i].life-=1;
			this.targetArray[i].buffArray.push(new Knocked(this.targetArray[i],20,this,5));
		}
	
}