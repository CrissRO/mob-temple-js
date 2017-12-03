Chunck = function(x,y,w,h)
{
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;

	this.populated = false;
}

Chunck.prototype.clear=function(){
	ctx.clearRect(this.x,this.y,this.w,this.h);
}