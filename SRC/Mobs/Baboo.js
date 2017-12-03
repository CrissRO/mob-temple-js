function Baboo(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*0,500*3,500,500];
	this.coolDownAtack = 40;
	this.atack = 0;

}

Baboo.prototype = Object.create(MobRoot.prototype);

Baboo.prototype.throw = function()
{
	projectiles.push(new Arrow(this.x,this.y,10,10,this.angle,150,this.target));
}

Baboo.prototype.draw = function()
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

Baboo.prototype.update = function()
{
	if(this.life>0)
	{
		this.sendBack();
		this.checkClick();
		this.colide();
		if(!this.stuned)
		{
		this.angle = CalculateSlope(this,this.target);
		this.directionUpdate();	
		}
		if(this.colided)
		{
			this.direction.x=0;
			this.direction.y=0;
		}

		this.updateBuffs();
		if(!this.stuned)
		{
			this.atack++;
			if(this.atack==this.coolDownAtack)
			{
				this.atack=0;
				this.throw();
			}	
		}
		
		
		this.x += this.direction.x;
		this.y += this.direction.y;
	}
}