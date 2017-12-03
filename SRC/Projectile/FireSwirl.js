function FireSwirl(x, y,size,speed,angle,range,targetArray,caster)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.targetArray = targetArray;
	this.life = 100;
	this.sps = ProjectileSpriteSheet;
	this.spsCoord = [2*256,256*0,256,256];
	this.rotAngle = this.angle;
	this.caster=caster;
	this.o_speed = caster.speed;
	this.o_y = this.caster.y;
	this.o_x = this.caster.x;
}

FireSwirl.prototype = Object.create(Projectile.prototype);

FireSwirl.prototype.draw = function() {
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.rotAngle+Math.PI/2);
	ctx.drawImage(this.sps,
				this.spsCoord[0],this.spsCoord[1],
				this.spsCoord[2],this.spsCoord[3],
				-this.size/2,-this.size/2,
				this.size,this.size);
	ctx.restore();
	ctx.closePath();
};

FireSwirl.prototype.update = function() {
	if(this.life == 100)
	{
	this.caster.y =  -1000;
	this.caster.display = false;

	}
	if(this.life == 1)
	{
	this.caster.y =  this.y;
	this.caster.x =  this.x;
	this.caster.display = true;	
	}
	this.life--;
	this.rotAngle+=Math.PI/5;
	this.cut();
	this.x+=this.o_speed*Math.cos(this.angle+Math.PI);
	this.y+=this.o_speed*Math.sin(this.angle+Math.PI);

};


FireSwirl.prototype.nearCheck = function(){

	for(var i=0;i<this.targetArray.length;i++)
	{
		//console.log(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y));
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<100)
			return true;
	}
		
			

}

FireSwirl.prototype.cut= function(){

	
	for(var i=0;i<this.targetArray.length;i++)
			if(Distance(this.x,this.targetArray[i].x,this.y,this.targetArray[i].y)<100)
			{
			this.targetArray[i].life -= 3;
			this.targetArray[i].buffArray.push(new Knocked(this.targetArray[i],1,this,5))
			if(!ObjInArray(this.targetArray[i].buffArray,Burn))
			this.targetArray[i].buffArray.push(new Burn(this.targetArray[i],10))
			}
	
}


