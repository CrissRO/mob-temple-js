function Frozen(target,lifetime)
{
	Buff.call(this,target,lifetime);
	this.maxlife=lifetime;
	this.o_speed = this.target.speed;
	this.sps = BuffSpriteSheet;
	this.spsCoord = [512*0,512*1,512,512];
}


Frozen.prototype.update=function(){
		
		
		if(this.lifetime==this.maxlife)
		{
			fadingTexts.push(new FadingText("Frozen",this.target.x,this.target.y,15,"rgba(0,180,255,1)",15*WindowScale,1,-3.5));
		}
		this.lifetime--;
		this.target.speed=0;
		this.target.stuned = true;
		if(this.lifetime==0)
		{
			this.target.stuned=false;
			this.target.speed = this.o_speed;
			this.target.buffArray.push(new Frostbite(this.target,100));
		}
	}	

Frozen.prototype.draw=function(){
		
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