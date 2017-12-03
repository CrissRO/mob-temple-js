function Basilisk(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*2,500*2,500,500];
	
	
	this.coolDownAtack = 20;
	this.atack = 0;

	this.coolDownAbility1 = 100;
	this.ability1 = 0;


}

Basilisk.prototype = Object.create(MobRoot.prototype);


Basilisk.prototype.draw = function()
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

Basilisk.prototype.claw=function()
{
	if(Distance(this.x,this.target.x,this.y,this.target.y)< 100 &&this.atack>=this.coolDownAtack)
	{
				projectiles.push(new SpiderCut(this.x,this.y,this.target.size,50,this.angle+Math.PI,100,this.target));
				this.atack=0;
	}
		
}

Basilisk.prototype.blow=function(){
	projectiles.push(new VenomCloud(this.x,this.y,this.size,this.speed,this.angle,50,new Array(this.target)));
	this.ability1 =0;
}
Basilisk.prototype.update = function()
{
	if(this.life>0)
	{
		
		
		this.sendBack();
		this.draw();

		this.checkClick();
		if(!this.stuned)
		{
			this.angle = CalculateSlope(this,this.target);
			this.directionUpdate();

			if(this.atack <= this.coolDownAtack)
			this.atack++;
			else
			this.claw();

			if(this.ability1 <= this.coolDownAbility1)
			this.ability1++;
			else
			this.blow();


		
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