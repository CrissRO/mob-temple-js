ParticleGen2 = function(x,y,pw,ph,dx,dy,amount,life,color)
{
	this.x = x;
	this.y = y;

	this.pw=pw;
	this.ph=ph;

	this.dx=dx;
	this.dy=dy;

	this.amount = amount;

	this.life = life;

	this.color = color;

	this.particles=[];
	for(var i=0;i<this.amount;i++)
		this.particles.push(new Particle2(this.x,this.y,this.pw,this.ph,Random(this.dx*-1,this.dx),Random(this.dy*-1,this.dy),RandomI(this.life-10,this.life),this.color))
	
}

ParticleGen2.prototype.update = function() {

		this.life--;
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].update();
			if(this.particles[i].life==0)
				this.particles.splice(i,1);
		}

};

ParticleGen2.prototype.draw = function() {
	for(var i=0;i<this.particles.length;i++)
			this.particles[i].draw();

};