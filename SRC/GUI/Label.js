Label=function(x,y,w,h,value){
	this.y=y;
	this.x=x;
	this.w=w;
	this.h=h;
	this.value=value||"0";
}

Label.prototype.update = function() {
	
};

Label.prototype.draw = function() {
	ctx.beginPath();
	//ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	ctx.fillStyle="rgba(0,0,255,1)";
	ctx.fillRect(this.x,this.y,this.w,this.h);
	ctx.fillStyle="rgba(255,255,255,1)";
	ctx.font=18+"px Copperplate";

	Text(ctx,String(this.value),this.x,this.y+this.h/2+5,this.w,this.h);
	ctx.closePath();
};