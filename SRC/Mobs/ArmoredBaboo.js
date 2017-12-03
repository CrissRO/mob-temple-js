function ArmoredBaboo(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*0,500*2,500,500];
	this.coolDownAtack = 60;
	this.atack = 0;
	this.range = 150;

	
}

ArmoredBaboo.prototype = Object.create(MobRoot.prototype);

ArmoredBaboo.prototype.throw = function()
{
	projectiles.push(new Bomb(this.x,this.y,20,5,this.angle,this.range,new Array(this.target)));
	
}
/*
ArmoredBaboo.prototype.colide = function()
{
	if(Distance(this.x,this.target.x,this.y,this.target.y)<this.range)
		this.colided = true;
	else
		this.colided = false;
}
*/
ArmoredBaboo.prototype.draw = function()
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
	ctx.closePath();
	this.showDamage();
}

ArmoredBaboo.prototype.update = function()
{
	if(this.life>0)
	{
		this.sendBack();
		this.draw();
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
			this.track();
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