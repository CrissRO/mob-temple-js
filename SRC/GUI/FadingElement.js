FadingElement = function(x,y,w,h,Image,speed)
{
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.Image=Image;
	this.speed=speed;
	this.alpha = 1;
	this.fadeIn = true;
	this.isFading =false;
	this.draw=function()
	{
		ctx.save();
		ctx.globalAlpha =this.alpha;
		ctx.drawImage(this.Image,this.x,this.y,this.w,this.h);
		ctx.restore();
	}

	this.fade=function(In)
	{
		
		if(In)
		{
			if(this.alpha<1)
			this.alpha += speed;	
			else
			{
				this.alpha=1;
				this.isFading=false;
			}
			
		}
		else
		{
			console.log("fadeOut");
			if(this.alpha>0)
			this.alpha -= speed;	
			else
			{
			this.alpha =0;	
			this.isFading=false;	
			}
			
		}
		
	}

	this.update=function()
	{
		if(this.isFading)
		this.fade(this.fadeIn);
		if(this.alpha>0)
		this.draw();
	}

}