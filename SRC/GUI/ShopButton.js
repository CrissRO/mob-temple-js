ShopButton=function(x,y,w,h,func,value)
{
	this.action=func||function(){console.log("empty");}
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.value=value||"+";
	this.img;
}

ShopButton.prototype.update = function() {
	if( Mouse.x>=this.x &&
		Mouse.x<=this.x+this.w &&
		Mouse.y>=this.y &&
		Mouse.y<=this.y+this.h &&Mouse.clicked)
	{
		Mouse.clicked=false;
		this.action();
	}

};

ShopButton.prototype.draw = function() {
	ctx.beginPath();
	//ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	ctx.fillStyle="rgba(255,0,0,1)";
	ctx.fillRect(this.x,this.y,this.w,this.h);
	ctx.fillStyle="rgba(255,255,255,1)";
	ctx.font=18+"px Copperplate";
	Text(ctx,String(this.value),this.x,this.y+this.h/2+5,this.w,this.h);
	ctx.closePath();

};