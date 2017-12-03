Orb=function(x,y,size,speed,target){
	this.x=x;
	this.y=y;
	this.size=size;
	this.speed=speed;
	this.angle=0;
	this.target=target;
	this.alive= true;
}

Orb.prototype.update = function() {
	this.angle=CalculateSlope(this,this.target);
	this.x+=this.speed*Math.cos(this.angle+Math.PI);
	this.y+=this.speed*Math.sin(this.angle+Math.PI);
	this.atTarget();
};

Orb.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle="rgba(0,0,255,1)";
	ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
	ctx.fill();
	ctx.closePath();
};

Orb.prototype.atTarget=function(){
	if(Distance(this.x,this.target.x,this.y,this.target.y)<100)
		this.alive= false;
}