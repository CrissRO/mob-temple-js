function SpiderThreader(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*1,500*2,500,500];
	
	
	this.coolDownAtack = 20;
	this.atack = 0;

	this.coolDownJump = 80;
	this.jump = 0;

	this.range = 500;

}

SpiderThreader.prototype = Object.create(MobRoot.prototype);


SpiderThreader.prototype.draw = function()
{
	this.drawLife();
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.angle - Math.PI/2);
	ctx.drawImage(this.sps,
					this.spsCoord[0],this.spsCoord[1],this.spsCoord[2],this.spsCoord[3],
					this.size/-2,this.size/-2,this.size,this.size);
	ctx.restore();	
	this.showDamage();
	this.drawBuffs();
}

SpiderThreader.prototype.web=function()
{
	projectiles.push(new WebBomb(this.x,this.y,20,8,this.angle,this.range,new Array(this.target)));
}

SpiderThreader.prototype.update = function()
{
	if(this.life>0)
	{
		this.sendBack();
		this.draw();
		this.checkClick();
		if(!this.stuned)
		{
			this.angle = CalculateSlope(this,this.target);
		
			if(this.jump <= this.coolDownJump)
			{
			this.directionUpdate();
			this.jump++;
			this.atack++;
			}
			else
			{
			if(!ObjInArray(this.buffArray,Thrown) && !ObjInArray(this.buffArray,Jumping))
			this.buffArray.push(new Jumping(this,20));
			this.jump=0;	
			this.web();

			}
		
		}
		this.colide();
		if(this.colided)
		{
			this.direction.x=0;
			this.direction.y=0;
		}

		this.updateBuffs();
		
		this.x += this.direction.x;
		this.y += this.direction.y;
	}
}