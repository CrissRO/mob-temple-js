FadingText=function(_text,x,y,lifetime,color,size,dX,dY)
{
	this.x = x;
	this.y = y;
	this.text =_text;
	this.lifetime = lifetime;
	this.color = color;
	this.size = size;
	this.dX=dX;
	this.dY=dY;
}

FadingText.prototype.update=function()
{	
	this.y+=this.dY;
	this.x+=this.dX
	this.lifetime--;
}

FadingText.prototype.draw=function()
{	

	ctx.beginPath();
	ctx.save();
	ctx.font=this.size+"px Georgia";
	ctx.fillStyle=this.color;
	ctx.fillText(this.text,this.x,this.y);
	ctx.restore();
	ctx.closePath();
}