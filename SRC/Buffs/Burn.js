function Burn(target,lifetime)
{
	Buff.call(this,target,lifetime);
	this.sps = BuffSpriteSheet;
	this.spsCoord = [512*0,512*0,512,512];
	this.temp_lifetime = this.lifetime;
}


Burn.prototype.update=function(){



		this.lifetime--;

		if(this.lifetime%10==0)
		{
			this.target.life -= 0.5;
			fadingTexts.push(new FadingText("Burn",this.target.x,this.target.y,12,"rgba(255,180,0,1)",15*WindowScale,1,-3));
		}

	}	

Burn.prototype.draw=function(){
		ctx.drawImage(this.sps,
					this.spsCoord[0],this.spsCoord[1],
					this.spsCoord[2],this.spsCoord[3],
					this.target.x-this.target.size*2/3,
					this.target.y-this.target.size*2/3,
					this.target.size*4/3,
					this.target.size*4/3);
		ctx.closePath();


	}

