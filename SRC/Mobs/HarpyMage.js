function HarpyMage(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*3,500*0,500,500];
	
	this.range = 200;
	
	this.coolDownAtack = 100;
	this.atack = 0;

	this.coolDownAbility1 = 200;
	this.ability1 = 0;

	this.coolDownAbility2 = 300;
	this.ability2 = 0;

	this.state="dash";

}

HarpyMage.prototype = Object.create(MobRoot.prototype);


HarpyMage.prototype.draw = function()
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

HarpyMage.prototype.claw=function()
{
	if(Distance(this.x,this.target.x,this.y,this.target.y)< 100 &&this.atack>=this.coolDownAtack)
	{
				projectiles.push(new SpiderCut(this.x,this.y,this.target.size,50,this.angle+Math.PI,100,this.target));
				this.atack=0;
	}
		
}

HarpyMage.prototype.throwShock=function()
{
	projectiles.push(new ShockBomb(this.x,this.y,this.target.size/2,6,this.angle,100,new Array(this.target)));
	this.ability1=0;

}

HarpyMage.prototype.storm=function()
{
	projectiles.push(new IceCloud(this.x,this.y,this.target.size/2,6,this.angle,100,new Array(this.target)));
	this.ability2=0;

}
HarpyMage.prototype.update = function()
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
			if(this.ability1 <= this.coolDownAbility1)
			this.ability1++;
			else{
				this.throwShock();
			}

			if(this.ability2 <= this.coolDownAbility2)
			this.ability2++;
			else{
				this.storm();
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