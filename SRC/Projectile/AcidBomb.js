function AcidBomb(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 50 * WindowScale;
	this.targetArray = targetArray;
	this.life = this.range;
	this.sps = ProjectileSpriteSheet;
	this.spsCoord = [256*0,256*3,256,256];
}

AcidBomb.prototype = Object.create(Projectile.prototype);



AcidBomb.prototype.update = function() {
	this.x += this.speed * Math.cos(this.angle)*-1;
	this.y += this.speed * Math.sin(this.angle)*-1;
	if(this.life%10==0)
	{
	var p =new ParticleGen2(this.x,
				this.y,
				5,5,
				5,5,
				10,10,
				new Color(0,RandomI(200,250),0));

	pgens.push(p);	
	}
	this.OutOfBounds();
	this.OutOfRange();
	this.life--;
	if(this.life==1 || this.explodeCheck())
		this.explode();
};

AcidBomb.prototype.draw = function() {
	
	ctx.beginPath();
	ctx.fillStyle = "rgba(0,200,0,0.2)";
	ctx.strokeStyle = "rgba(0,200,0,1)";
	ctx.arc(this.x,this.y,
				this.explosionRange,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.angle-Math.PI/2);
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				-this.size/2,-this.size/2,
				this.size,this.size);

	ctx.restore();
	ctx.closePath();
};


AcidBomb.prototype.explodeCheck = function(){

	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			return true;
			

}
AcidBomb.prototype.explode = function(){
	
	this.alive=false;
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			{
			this.targetArray[i].life -= 5;
				if(!ObjInArray(this.targetArray[i].buffArray,Poison))
				this.targetArray[i].buffArray.push(new Poison(this.targetArray[i],100));
			
			
			}
	var p =new ParticleGen2(this.x,
			this.y,
			5,5,
			5,5,
			20,20,
			new Color(0,RandomI(200,250),0));
	pgens.push(p);
			
	
};
