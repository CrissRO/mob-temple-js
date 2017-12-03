function Particle2(x,y,w,h,dx,dy,life,color)
	{
		//console.log('created');
		
		this.x=x;
		this.y=y;
		this.w=w*WindowScale;
		this.h=h*WindowScale;
		this.dx=dx;
		this.dy=dy;
		this.maxlife=life;
		this.life = life;
		this.color=color;
		this.dead = false;

		
}

Particle2.prototype.draw=function()
{
	//ctx.arc(x,y,aoe/5,0,2*Math.PI);
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(0,0,0,0)';
	this.color.a = this.life/this.maxlife;
	ctx.fillStyle=this.color.Get();
	ctx.arc(this.x,this.y,this.w,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	
}
Particle2.prototype.update=function()
{
	if(this.life>0)
	{

	this.life--;	
	this.x+=this.dx;
	this.y+=this.dy;
	}			
	
}