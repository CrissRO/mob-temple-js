function Frostbite(target,lifetime)
{
	Buff.call(this,target,lifetime);
	this.o_speed = this.target.speed;
	this.sps = BuffSpriteSheet;
	this.spsCoord = [512*1,512*1,512,512];
}


Frostbite.prototype.update=function(){

		this.lifetime--;
		this.target.speed = 1/10 * this.o_speed;

		if(this.lifetime%10==0)
		{
			this.target.life -= 0.25;
			fadingTexts.push(new FadingText("Frostbite",this.target.x,this.target.y,12,"rgba(0,180,255,1)",15*WindowScale,0,2));
		}
		if(this.lifetime<1)
			this.target.speed = this.o_speed;

	}	

Frostbite.prototype.draw=function(){
		ctx.drawImage(this.sps,
					this.spsCoord[0],this.spsCoord[1],
					this.spsCoord[2],this.spsCoord[3],
					this.target.x-this.target.size*2/3,
					this.target.y-this.target.size*2/3,
					this.target.size*4/3,
					this.target.size*4/3);
		ctx.closePath();
	}