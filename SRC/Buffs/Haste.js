function Haste(target,lifetime,e_cooldown)
{
	Buff.call(this,target,lifetime);
	this.sps = BuffSpriteSheet;
	this.spsCoord = [512*1,512*2,512,512];
	this.e_cooldown = e_cooldown;
	this.o_cooldown = target.coolDownAtack;
	
}

Haste.prototype.update=function()
{
		this.lifetime--;
		if(this.target.coolDownAtack==this.o_cooldown)
		{
			fadingTexts.push(new FadingText("Haste",this.target.x,this.target.y,25,"rgba(255,0,0,1)",20*WindowScale,0,-4));
		}
		this.target.coolDownAtack =this.e_cooldown;
		if(this.lifetime == 0)
			this.target.coolDownAtack =this.o_cooldown;
}

Haste.prototype.draw=function()
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