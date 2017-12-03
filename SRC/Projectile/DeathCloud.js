function DeathCloud(x, y,size,speed,angle,range,targetArray)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.width = this.size;
	this.height = this.size*2;
	this.targetArray = targetArray;
	this.life = 50;
	this.sps = ProjectileSpriteSheet;
	this.spsCoord = [256*1,256*0,256,512];
	this.alpha = 1;
}

DeathCloud.prototype = Object.create(Projectile.prototype);



DeathCloud.prototype.update = function() {
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

	this.height+=4;
	this.OutOfBounds();

	this.life--;
	this.alpha-=0.01;

	if(this.nearCheck() && this.life%2==0)
		this.Affect();
	if(this.life==1)
		this.explode();
};

DeathCloud.prototype.draw = function() {
	
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.angle-Math.PI);
	ctx.globalAlpha=this.alpha;
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				-this.width/2,-this.height/2,
				this.width,this.height);
	ctx.restore();
	ctx.closePath();
};


DeathCloud.prototype.nearCheck = function(){

	for(var i=0;i<this.targetArray.length;i++)
	{
		//console.log(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y));
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<100)
			return true;
	}
		
			

}
DeathCloud.prototype.explode = function(){
	
	this.alive=false;
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<100)
			{
			this.targetArray[i].life -= 10;

			}
	var p =new ParticleGen2(this.x,
				this.y,
				5,5,
				5,5,
				10,10,
				new Color(0,RandomI(200,250),0));
	pgens.push(p);	

			
	
};


DeathCloud.prototype.Affect = function()
{
	for(var i=0;i<this.targetArray.length;i++)
	{
		
		if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<this.width)
			{
			this.targetArray[i].life -= 1;


			}
	}
			
}