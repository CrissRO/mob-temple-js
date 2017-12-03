Box=function(x,y,w,h,color,children,sx,sy) {
	this.y=y;
	this.x=x;
	this.w=w;
	this.h=h;
	this.color=color;
	this.sprites = ShopItemsSps;

	this.children=children;
	this.coord = [sx,sy,256,256];
	console.log(this.children);
	console.log(sx,sy);
}

Box.prototype.update = function() {
	if(this.children!=null)
	this.children[0].update();
};

Box.prototype.draw = function() {
	ctx.beginPath();
	//ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
	ctx.drawImage(ibox,this.x,this.y,this.w,this.h);
	ctx.fillStyle=this.color.Get();
	//ctx.fillRect(this.x,this.y,this.w,this.h);
	
	ctx.drawImage(this.sprites,this.coord[0]*256,this.coord[1]*256,256,256,
					this.x,this.y,this.w,this.h);
	ctx.closePath();

	if(this.children!==null)
	for(var i=0;i<this.children.length;i++)
	{
		this.children[i].draw();
	}
};