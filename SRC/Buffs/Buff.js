function Buff(target,lifetime)
{
	this.target = target;
	this.lifetime = lifetime;
	this.sps;
}
/*
function Stun(target,lifetime)
{
	Buff.call(this,target,lifetime);

	this.update=function(){
		this.target.speed = 0;
		this.lifetime--;

		if(this.lifetime%50==0)
		this.target.life-=4;
		
	}	

	this.draw=function(){
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(this.target.x-this.target.size/2,
					this.target.y-this.target.size/2,
					this.target.size,
					this.target.size);
	}
}

function SpeedBuff(target,lifetime,speedmult)
{
	Buff.call(this,target,lifetime);
	var o_speed = this.target.speed; 
	
	this.update=function(){
		
		this.lifetime--;
		if(this.lifetime>1)
		this.target.speed = o_speed * speedmult;
		else
		this.target.speed = o_speed;
	}	

	this.draw=function(){
		ctx.fillStyle = "#ffff00";
		ctx.fillRect(this.target.x-this.target.size/2,
					this.target.y-this.target.size/2,
					this.target.size,
					this.target.size);
	}
}

function Berserk(target,lifetime,cool)
{
	Buff.call(this,target,lifetime);
	var o_speed = this.target.maxCoolDown;
	
	this.update=function(){
		
		this.lifetime--;
		if(this.lifetime>1)
		this.target.maxCoolDown = cool;
		else
		this.target.maxCoolDown = o_speed;
	}	

	this.draw=function(){
		ctx.fillStyle = "#ffff00";
		ctx.fillRect(this.target.x-this.target.size/2,
					this.target.y-this.target.size/2,
					this.target.size,
					this.target.size);
	}
}*/