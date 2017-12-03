function Bird(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*3,500*3,500,500];
	
	this.range = 200;
	
	this.coolDownAtack = 100;
	this.atack = 0;

	this.state="dash";

}

Bird.prototype = Object.create(MobRoot.prototype);


Bird.prototype.draw = function()
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
	this.drawBuffs();
}

Bird.prototype.claw=function()
{
	if(Distance(this.x,this.target.x,this.y,this.target.y)< 100 &&this.atack>=this.coolDownAtack)
	{
				projectiles.push(new SpiderCut(this.x,this.y,this.target.size,50,this.angle+Math.PI,100,this.target));
				this.atack=0;
	}
		
}

Bird.prototype.update = function()
{
	if(this.life>0)
	{
		
		
		this.sendBack();
		this.draw();

		this.checkClick();
		if(!this.stuned)
		{
			this.angle = CalculateSlope(this,this.target);
			if(Distance(this.x,this.target.x,this.y,this.target.y)<=this.range&&this.state=="fly")
			this.angle+=Math.PI/2;
			else if(Distance(this.x,this.target.x,this.y,this.target.y)<=this.range/2)
			{

				this.claw();
				this.state="fly";
				this.atack=0;
			}
			
			this.directionUpdate();

			if(this.atack <= this.coolDownAtack)
			this.atack++;
			else{
				this.state="dash";
			}
			//this.claw();
		
		}
		//this.colide();
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