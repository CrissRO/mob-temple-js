function ChampionBaboo(x,y,size,speed,target,sps,life,allieArray)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*0,500*0,500,500];
	this.coolDownAtack = 60;
	this.abilityCoolDown = 250;
	this.atack = 0;
	this.range = 200;
	this.allieArray = allieArray;
	this.healedTargets=0;
	this.ability = 0;
}

ChampionBaboo.prototype = Object.create(MobRoot.prototype);

ChampionBaboo.prototype.throw = function()
{
	projectiles.push(new Bomb(this.x,this.y,20,5,this.angle,this.range,new Array(this.target)));
	projectiles.push(new Bomb(this.x,this.y,20,5,this.angle+Math.PI/4,this.range,new Array(this.target)));
	projectiles.push(new Bomb(this.x,this.y,20,5,this.angle-Math.PI/4,this.range,new Array(this.target)));
	projectiles.push(new Bomb(this.x,this.y,20,5,this.angle+Math.PI*3/4,this.range,new Array(this.target)));
	projectiles.push(new Bomb(this.x,this.y,20,5,this.angle-Math.PI*3/4,this.range,new Array(this.target)));
	
}

ChampionBaboo.prototype.haste = function()
{
	this.buffArray.push(new Haste(this,100,3));

}



ChampionBaboo.prototype.draw = function()
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
	ctx.fillStyle = "#ff00ff";
	ctx.fillRect(this.tracker.x-5,this.tracker.y-5,10,10);
	ctx.closePath();
	this.showDamage();
	this.drawBuffs();
}

ChampionBaboo.prototype.update = function()
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
			this.ability++;
			this.track();
			if(this.atack>=this.coolDownAtack)
			{
				this.atack=0;
				this.throw();
			}
			if(this.ability>=this.abilityCoolDown)
			{
				this.ability = 0;
				this.haste();
				
			}
		}
		this.x += this.direction.x;
		this.y += this.direction.y;
	}
}