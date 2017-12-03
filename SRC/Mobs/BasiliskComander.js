function BasiliskComander(x,y,size,speed,target,sps,life)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*2,500*0,500,500];
	
	
	this.coolDownAtack = 20;
	this.atack = 0;

	this.coolDownAbility1 = 500;
	this.ability1 = 0;

	this.coolDownAbility2 = 200;
	this.ability2 = 0;

}

BasiliskComander.prototype = Object.create(MobRoot.prototype);


BasiliskComander.prototype.draw = function()
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

BasiliskComander.prototype.claw=function()
{
	if(Distance(this.x,this.target.x,this.y,this.target.y)< 100 &&this.atack>=this.coolDownAtack)
	{
				projectiles.push(new SpiderCut(this.x,this.y,this.target.size,50,this.angle+Math.PI,100,this.target));
				this.atack=0;
	}
		
}
BasiliskComander.prototype.storm=function(){
	projectiles.push(new FireSwirl(this.x,this.y,this.size,this.speed,this.angle,100,new Array(this.target),this));
	this.ability1 =0;
}
BasiliskComander.prototype.blow=function(){
	projectiles.push(new FireCloud(this.x,this.y,this.size,this.speed,this.angle,100,new Array(this.target)));
	this.ability2 =0;
}
BasiliskComander.prototype.update = function()
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
			this.storm();

			if(this.ability2 <= this.coolDownAbility2)
			this.ability2++;
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