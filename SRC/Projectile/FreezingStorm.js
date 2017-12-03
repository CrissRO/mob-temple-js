function FreezingStorm(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 100 * WindowScale;
	this.targetArray = targetArray;
	this.life = 50;

	this.length = length;
	this.maxLife= this.life;
	this.speed = this.length/this.maxLife;
	this.sps = ProjectileSpriteSheet2;
	this.spsCoord = [256*0,256*1,256,256];

}

FreezingStorm.prototype = Object.create(Projectile.prototype);



FreezingStorm.prototype.update = function() {
	this.x += this.speed * Math.cos(this.angle);
	this.y += this.speed * Math.sin(this.angle);
	this.life--;
	if(this.life%5==0)
		this.explode();
};

FreezingStorm.prototype.draw = function() {
	
	ctx.beginPath();
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				this.x-this.size/2,this.y-this.size/2,
				this.size,this.size);
	
	ctx.closePath();
};


FreezingStorm.prototype.explode = function(){
	
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			{
			if(!ObjInArray(this.targetArray[i].buffArray,Frozen)&&!ObjInArray(this.targetArray[i].buffArray,Frostbite))
						this.targetArray[i].buffArray.push(new Frozen(this.targetArray[i],50));	
			}
	
	var p =new ParticleGen2(this.x,
							this.y,
							5,5,
							this.range/20,this.range/20,
							20,20,
							new Color(RandomI(220,250),RandomI(220,250),RandomI(220,250)));
	pgens.push(p);			
	
};
