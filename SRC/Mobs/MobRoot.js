//Hopper.prototype = Object.create(Creature.prototype);
function MobRoot(x,y,size,speed,target,sps,life) 
{
		this.size = size*WindowScale;
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.speed=speed;
		this.colided=false;
		this.maxlife = life;
		this.life = life;
		this.lifeBefore=life;
		this.buffArray = [];
		this.sps = sps;
		this.target = target;
		this.direction = 
		{
			x:0,
			y:0
		}

		this.tracker = {
		interval:50,
		counter:0,
		x:0,
		y:0}
		//x,y,w,h
		//ex sprite[0][0] = 0,0,500,500;
		this.spsCoord = [];
		this.isBoss = false;
		this.stuned = false;
		this.display = true;
}

MobRoot.prototype.track=function()
{
	this.tracker.counter++;
	if(this.tracker.counter==this.tracker.interval)
	{
		this.tracker.x = this.target.x;
		this.tracker.y = this.target.y;	
		this.tracker.counter=0;
	}
	
}

MobRoot.prototype.directionUpdate = function()
{
	if(this.display){
	this.direction.x = this.speed*Math.cos(this.angle)*-1;
	this.direction.y = this.speed*Math.sin(this.angle)*-1;	
	}
	
}
MobRoot.prototype.drawLife = function()
{
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

MobRoot.prototype.sendBack = function()
{
	if(this.display)
	if(this.x + this.direction.x < CanvasObj.limitX1 ||
		this.x + this.size + this.direction.x > CanvasObj.limitX2 ||
		this.y + this.direction.y < CanvasObj.limitY1 ||
		this.y + this.size + this.direction.y > CanvasObj.limitY2 )
		{
				this.x = Random(CanvasObj.limitX1,CanvasObj.limitX2);
				this.y = Random(CanvasObj.limitY1,CanvasObj.limitY2);
		}
					
}

MobRoot.prototype.isColidedWith = function(obj)
{
	return(!(this.x+this.size<obj.x||obj.x+obj.size<this.x||
		this.y+this.size<obj.y||obj.y+obj.size<this.y));
}

MobRoot.prototype.colideCkeck = function(obj)
{
	if(this.display)
	if(!(this.x+this.size<obj.x||obj.x+obj.size<this.x||
		this.y+this.size<obj.y||obj.y+obj.size<this.y))
	{
	
		this.x -= this.direction.x;
		this.y -= this.direction.y;
		this.colided = true;
	}
	else
	this.colided = false;
}

MobRoot.prototype.colide=function()
{
	this.colideCkeck(c);
	for(var i=0;i<mobs.length;i++)
		if(mobs[i]!=this)
		this.colideCkeck(mobs[i]);
}

MobRoot.prototype.updateBuffs = function()
{
	for(var i=0;i<this.buffArray.length;i++)
		{
			if(this.buffArray[i].lifetime>0)
			{
				this.buffArray[i].update();	
			}
			else
				this.buffArray.splice(i,1);
			
		}
}

MobRoot.prototype.drawBuffs = function(){
	if(this.buffArray.length!=0)
		this.buffArray[0].draw();
}
MobRoot.prototype.checkClick= function()
{
	if(Mouse.x > this.x-this.size/2 && Mouse.x<this.x+this.size/2 &&
		Mouse.y > this.y-this.size/2 && Mouse.y<this.y+this.size/2)
		{
			c.LastTarget=this;
		}
}


MobRoot.prototype.showDamage=function()
{
	if(this.lifeBefore!=this.life)
	{
		var lifeChange = this.life-this.lifeBefore;
		var sizeMult = 1;
		var alpha = 1;
		var duration = 1;
		sizeMult = map(Math.abs(lifeChange),0,20,15,35);
		alpha = map(Math.abs(lifeChange),0,20,0.8,1);
		duration = map(Math.abs(lifeChange),0,20,30,60);
		var color;
		fadingTexts.push(new FadingText((lifeChange>0?"+":"")+Decimal(lifeChange,2),this.x,this.y,duration,(lifeChange>0?"rgba(0,255,0,"+alpha+")":"rgba(255,0,0,"+alpha+")"),sizeMult*WindowScale,1,-1));
	}
	this.lifeBefore = this.life;
}