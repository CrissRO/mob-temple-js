function Jumping(target,lifetime)
{
	Buff.call(this,target,lifetime);
	this.o_speed = this.target.speed;
	this.o_size = this.target.size;
	this.max_lifetime=this.lifetime;
	
}


Jumping.prototype.update=function(){
		
		this.lifetime--;
		this.target.speed = this.o_speed*3;
		this.target.colided = false;
		if(this.lifetime >= this.max_lifetime / 2)
		{
			if(this.target.size < this.o_size*2)
			this.target.size++;
		}
		else
		{	

			if(this.target.size > this.o_size)
			this.target.size--;

			if(this.lifetime<=1)
			{
				
				this.target.size = this.o_size;
				this.target.speed = this.o_speed;
			}
		}
		
			
		
	}	

Jumping.prototype.draw=function(){}