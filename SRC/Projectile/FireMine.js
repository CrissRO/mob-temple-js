function FireMine(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 50 * WindowScale;
	this.targetArray = targetArray;
	this.life = this.range;
	this.maxlife=this.life;
	this.sps = ProjectileSpriteSheet;
	this.spsCoord = [256*2,256*2,256,256];
}

FireMine.prototype = Object.create(Projectile.prototype);

FireMine.prototype.update = function() {

	this.life--;
	if(this.life==1 || this.explodeCheck())
		this.explode();
};

FireMine.prototype.draw = function() {
	
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,170,33,0.2)";
	ctx.strokeStyle = "rgba(255,170,33,1)";
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
	this.showLife();
};


FireMine.prototype.explodeCheck = function(){

	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			return true;
			

}
FireMine.prototype.explode = function(){
	
	this.alive=false;
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.explosionRange)
			{
			this.targetArray[i].life -= 5;

			}
	var p =new ParticleGen2(this.x,
							this.y,
							3,3,
							5,5,
							40,15,
							new Color(255,RandomI(150,170),33));
	pgens.push(p);
			
	
};
FireMine.prototype.showLife=function(){
	var Width = ((this.size-2) * this.life) / this.maxlife;
	ctx.beginPath();
			ctx.fillStyle="rgba(0,0,0,0.7)";
			ctx.fillRect(this.x - this.size / 2,this.y - this.size / 2 - 8,this.size,8);
			ctx.fill();
			ctx.fillStyle="rgba(255,0,0,0.8)";
			ctx.fillRect(this.x - this.size / 2 + 1,this.y - this.size / 2 - 7,Width,6);
			ctx.fill();
	ctx.closePath();
}