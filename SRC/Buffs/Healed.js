function Healed(target,lifetime,amount)
{
	Buff.call(this,target,lifetime);
	this.sps = BuffSpriteSheet;
	this.spsCoord = [512*0,512*2,512,512];
	this.amount=amount;
}

Healed.prototype.update=function()
{
		this.lifetime--;
		if(this.lifetime%10==0)
		this.target.life += this.amount;
		if(this.target.life > this.target.maxlife)
			this.target.life = this.target.maxlife;
}

Healed.prototype.draw=function()
{
		ctx.beginPath();
		ctx.drawImage(this.sps,
					this.spsCoord[0],this.spsCoord[1],
					this.spsCoord[2],this.spsCoord[3],
					this.target.x-this.target.size*2/3,
					this.target.y-this.target.size*2/3,
					this.target.size*4/3,
					this.target.size*4/3);
		ctx.closePath();
}