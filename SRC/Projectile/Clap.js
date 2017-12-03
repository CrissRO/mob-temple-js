function Clap(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.targetArray = targetArray;
	this.life = 5;

	//this.length = length;
	this.maxLife= this.life;

	//this.sps = ProjectileSpriteSheet2;
	//this.spsCoord = [256*0,256*1,256,256];

}

Clap.prototype = Object.create(Projectile.prototype);



Clap.prototype.update = function() {
	if(this.life==this.maxLife)
		this.explode();
	this.life--;
};

Clap.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = new Color(250,240,0,0.2).Get();
	ctx.strokeStyle = new Color(250,240,0,0.8).Get();
	ctx.arc(this.x,this.y,this.range,0,Math.PI*2);
	ctx.stroke();
	ctx.fill();
};


Clap.prototype.explode = function(){
	
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.range)
			{
				this.targetArray[i].life-=2;
				if(!ObjInArray(this.targetArray[i].buffArray,Thrown) && !ObjInArray(this.targetArray[i].buffArray,Jumping))
					this.targetArray[i].buffArray.push(new Thrown(this.targetArray[i],50));

					this.targetArray[i].buffArray.push(new Knocked(this.targetArray[i],20,this,5));		
			}
	
	var p =new ParticleGen2(this.x,
							this.y,
							5,5,
							this.range/20,this.range/20,
							100,20,
							new Color(RandomI(128,160),RandomI(128,160),RandomI(128,160)));
	pgens.push(p);			
	
};
