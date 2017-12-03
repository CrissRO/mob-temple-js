function Bomb(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 50 * WindowScale;
	this.targetArray = targetArray;
	this.life = 50;
	this.sps = ProjectileSpriteSheet;
	this.spsCoord = [256*0,256*1,256,256];
}

Bomb.prototype = Object.create(Projectile.prototype);



Bomb.prototype.update = function() {
	this.x += this.speed * Math.cos(this.angle)*-1;
	this.y += this.speed * Math.sin(this.angle)*-1;
	this.OutOfBounds();
	this.OutOfRange();
	this.life--;
	if(this.life==1||this.nearCheck())
		this.explode();
};

Bomb.prototype.draw = function() {
	
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,0,0,0.2)";
	ctx.strokeStyle = "rgba(255,0,0,1)";
	ctx.arc(this.x,this.y,
				this.explosionRange,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				this.x-this.size/2,this.y-this.size/2,
				this.size,this.size);
	
	ctx.closePath();
};

Bomb.prototype.nearCheck = function(){

	for(var i=0;i<this.targetArray.length;i++)
	{
		//console.log(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y));
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			return true;
	}
}
Bomb.prototype.explode = function(){
	
	this.alive=false;
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			{
			this.targetArray[i].life -= 5;
			this.targetArray[i].buffArray.push(new Knocked(this.targetArray[i],30,this,5));
			if(!ObjInArray(this.targetArray[i].buffArray,Burn))
			this.targetArray[i].buffArray.push(new Burn(this.targetArray[i],30));	
			}
		var p =new ParticleGen2(this.x,
				this.y,
				5,5,
				5,5,
				10,10,
				new Color(RandomI(200,250),0,0));
	pgens.push(p);
			
	
};
