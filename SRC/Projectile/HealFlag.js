function HealFlag(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 100 * WindowScale;
	this.targetArray = targetArray;
	this.life = 100;
	//this.length = length;
	this.maxLife= this.life;

	this.sps = ProjectileSpriteSheet2;
	this.spsCoord = [256*1,256*1,256,256];

}

HealFlag.prototype = Object.create(Projectile.prototype);



HealFlag.prototype.update = function() {
	if(this.life%5==0)
		this.heal();
	this.life--;
};

HealFlag.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = new Color(0,255,0,0.2).Get();
	ctx.strokeStyle = new Color(0,255,0,0.8).Get();
	ctx.arc(this.x,this.y,this.range,0,Math.PI*2);
	ctx.stroke();
	ctx.fill();
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				this.x-this.size/2,this.y-this.size/2,
				this.size,this.size);
	
	ctx.closePath();

};


HealFlag.prototype.heal = function(){
	
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.range)
			{
			
			if(!ObjInArray(this.targetArray[i].buffArray,Healed) )
				this.targetArray[i].buffArray.push(new Healed(this.targetArray[i],1,2));

	
			}
	
	var p =new ParticleGen2(this.x,
							this.y,
							4,4,
							this.range/20,this.range/20,
							40,10,
							new Color(0,RandomI(200,250),0));
	pgens.push(p);			
	
};
