function SpiderChemist(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*1,500*1,500,500];
	
	
	this.coolDownAtack = 20;
	this.atack = 0;

	this.coolDownJump = 80;
	this.jump = 0;

	this.range = 500;

}

SpiderChemist.prototype = Object.create(MobRoot.prototype);


SpiderChemist.prototype.draw = function()
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

SpiderChemist.prototype.spitAcid=function()
{
	projectiles.push(new AcidBomb(this.x,this.y,20,8,this.angle+Math.PI/6,this.range,new Array(this.target)));
	projectiles.push(new AcidBomb(this.x,this.y,20,8,this.angle-Math.PI/6,this.range,new Array(this.target)));
}

SpiderChemist.prototype.update = function()
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
			this.spitAcid();

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