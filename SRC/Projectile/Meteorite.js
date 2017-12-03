function Meteorite(x, y,size,speed,angle,range,length,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 100 * WindowScale;
	this.targetArray = targetArray;
	this.life = 50;
	this.sps = ProjectileSpriteSheet2;
	this.spsCoord = [256*1,256*0,256,256];
	this.length = length;
	this.maxLife= this.life;
	this.speed = this.length/this.maxLife;

}

Meteorite.prototype = Object.create(Projectile.prototype);



Meteorite.prototype.update = function() {
	this.x += this.speed * Math.cos(this.angle);
	this.y += this.speed * Math.sin(this.angle);
	this.life--;
	var p =new ParticleGen2(this.x-this.speed * Math.cos(this.angle),
							this.y-this.speed * Math.sin(this.angle),
							5,5,
							8,8,
							10,10,
							new Color(RandomI(220,250),RandomI(0,40),RandomI(0,40)));
	pgens.push(p);	
	if(this.life==0)
		this.explode();
	if(this.life>this.maxLife/2)
		this.size+=2;
	else
		this.size-=2;

};

Meteorite.prototype.draw = function() {
	
	ctx.beginPath();

	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				this.x-this.size/2,this.y-this.size/2,
				this.size,this.size);
	
	ctx.closePath();
};


Meteorite.prototype.explode = function(){
	
	this.alive=false;
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			{
			this.targetArray[i].life -= 5;
			if(!ObjInArray(this.targetArray[i].buffArray,Burn))
			this.targetArray[i].buffArray.push(new Burn(this.targetArray[i],30));	
			this.targetArray[i].buffArray.push(new Knocked(this.targetArray[i],30,this,5));
			
			}
	
	var p =new ParticleGen2(this.x,
							this.y,
							5,5,
							10,10,
							50,20,
							new Color(RandomI(220,250),RandomI(0,40),RandomI(0,40)));
	pgens.push(p);			
	
};
