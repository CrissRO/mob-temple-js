function WarriorBaboo(x,y,size,speed,target,sps,life,allieArray)
{
	MobRoot.call(this,x,y,size,speed,target,sps,life);
	this.spsCoord = [500*0,500*1,500,500];
	this.coolDownAtack = 60;
	this.abilityCoolDown = 180;
	this.atack = 0;
	this.range = 200;
	this.allieArray = allieArray;
	this.healedTargets=0;
	this.ability = 0;
}

WarriorBaboo.prototype = Object.create(MobRoot.prototype);

WarriorBaboo.prototype.throw = function()
{
	projectiles.push(new Arrow(this.x,this.y,10,10,this.angle,150,this.target));
	projectiles.push(new Arrow(this.x,this.y,10,10,this.angle+Math.PI/4,150,this.target));
	projectiles.push(new Arrow(this.x,this.y,10,10,this.angle-Math.PI/4,150,this.target));

	
}

WarriorBaboo.prototype.heal = function()
{
	this.buffArray.push(new Healed(this,20,0.2));
	var start = RandomI(0,this.allieArray.length);
	this.healedTargets = 0;
	while(this.healedTargets<3 && start < this.allieArray.length)
	{
		if(this.allieArray[start] != this)
		{
			this.allieArray[start].buffArray.push(new Healed(this.allieArray[start],30,2));		
			this.healedTargets++;
		}
		start++;
	}

	
}



WarriorBaboo.prototype.draw = function()
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

WarriorBaboo.prototype.update = function()
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
			if(this.atack==this.coolDownAtack)
			{
				this.atack=0;
				this.throw();
			}
			if(this.ability==this.abilityCoolDown)
			{
				this.ability = 0;
				this.heal();
				
			}	
		}
		
		this.x += this.direction.x;
		this.y += this.direction.y;
	}
}