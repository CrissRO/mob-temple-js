function DrainLife(x, y,size,speed,angle,range,target,caster)
{
	Projectile.call(this,x,y,size,speed,angle,range);
	this.explosionRange = 100 * WindowScale;

	this.life = 1;
	this.sps = ProjectileSpriteSheet2;
	this.caster=caster;
	this.target = target;
	//this.spsCoord = [256*1,256*0,256,256];
	//this.length = length;
	//this.maxLife= this.life;
	//this.speed = this.length/this.maxLife;
	
}

DrainLife.prototype = Object.create(Projectile.prototype);



DrainLife.prototype.update = function() {
	this.angle = CalculateSlope(this,this.caster)+Math.PI;
	this.x += this.speed * Math.cos(this.angle);
	this.y += this.speed * Math.sin(this.angle);
	var p =new ParticleGen2(this.x,
							this.y,
							5,5,
							5,5,
							25,15,
							new Color(0,RandomI(220,250),RandomI(0,40)));
	pgens.push(p);	

	if(Distance(this.x,this.caster.x,this.y,this.caster.y)<=10)
	{
		this.target.life-=5;
		this.caster.life+=5;
		this.alive=false;
	}

};

DrainLife.prototype.draw = function() {
	
};


