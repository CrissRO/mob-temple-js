function Poison(target,lifetime)
{
	Buff.call(this,target,lifetime);
	this.o_speed = this.target.speed;
	this.sps = BuffSpriteSheet;
	this.spsCoord = [512*1,512*1,512,512];
}


Poison.prototype.update=function(){

		this.lifetime--;
		this.target.speed = 1/10 * this.o_speed;

		if(this.lifetime%30==0)
		{
			this.target.life -= 2;
			fadingTexts.push(new FadingText("Poison",this.target.x,this.target.y,12,"rgba(40,255,40,1)",15*WindowScale,1,3));
		}
		if(this.lifetime<1)
			this.target.speed = this.o_speed;

	}	

Poison.prototype.draw=function(){
		ctx.drawImage(this.sps,
					this.spsCoord[0],this.spsCoord[1],
					this.spsCoord[2],this.spsCoord[3],
					this.target.x-this.target.size*2/3,
					this.target.y-this.target.size*2/3,
					this.target.size*4/3,
					this.target.size*4/3);
		ctx.closePath();
	}