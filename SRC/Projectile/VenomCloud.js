function VenomCloud(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.targetArray = targetArray;
	this.life = 5;

	//this.length = length;
	this.maxLife= this.life;

	//this.sps = ProjectileSpriteSheet2;
	//this.spsCoord = [256*0,256*1,256,256];
	this.x += 100*Math.cos(this.angle+Math.PI);
	this.y += 100*Math.sin(this.angle+Math.PI);
}

VenomCloud.prototype = Object.create(Projectile.prototype);



VenomCloud.prototype.update = function() {
	if(this.life==this.maxLife)
		this.explode();
	this.life--;
};

VenomCloud.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = new Color(180,0,0,0.2).Get();
	ctx.strokeStyle = new Color(220,0,0,0.8).Get();
	ctx.arc(this.x,this.y,this.range,0,Math.PI*2);
	ctx.stroke();
	ctx.fill();
};


VenomCloud.prototype.explode = function(){
	
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.range)
			{
				this.targetArray[i].life-=10;
				if(!ObjInArray(this.targetArray[i].buffArray,Poison))
					this.targetArray[i].buffArray.push(new Poison(this.targetArray[i],50));
			}
	
	var p =new ParticleGen2(this.x,
							this.y,
							5,5,
							this.range/30,this.range/30,
							100,30,
							new Color(220,0,220));
	pgens.push(p);			
	
};
