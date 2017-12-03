Button = function(x,y,w,h,string,image,action,ctx,needsSps,sX,sY,sW,sH)
{
	this.x = x;
	this.y = y;
	this.w = w*WindowScale;
	this.h = h*WindowScale;
	this.string = string;
	this.action = action;
	this.fontSize = 25;
	this.image=image;

	if(typeof needsSps === undefined)
	this.needsSps = false;
	else
	this.needsSps = needsSps;
	
	//for spritesheetButtons
	if(typeof sX === undefined)
	this.sX= 0;
	else
	this.sX = sX;

	if(typeof sY === undefined)
	this.sX= 0;
	else
	this.sY = sY;

	if(typeof sW === undefined)
	this.sW= 0;
	else
	this.sW = sW;

	if(typeof sH === undefined)
	this.sH= 0;
	else
	this.sH = sH;

	this.draw=function()
	{
		if(!this.needsSps)
		{
		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.drawImage(this.image,this.x,this.y,this.w,this.h);	
		}
		else
		{
		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.drawImage(this.image,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.w,this.h);
		}
	}

	this.update=function()
	{	
			if(Mouse.x>this.x&&Mouse.y>this.y&&
		   Mouse.x<this.x+this.w&&Mouse.y<this.y+this.h)
		{
			if(Mouse.clicked)
			{
				this.action();
				Mouse.clicked=false;
			}		
		}

	}
}