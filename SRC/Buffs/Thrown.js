function Thrown(target,lifetime)
{
	Buff.call(this,target,lifetime);
	var max_lifetime = this.lifetime;
	var o_size = this.target.size;
	this.update=function(){
		this.lifetime--;

		if(this.lifetime >= max_lifetime / 2)
		{
			if(this.target.size < o_size*2)
			this.target.size+=2;
		}
		else
		{	

			if(this.target.size > o_size)
			this.target.size-=2;

			if(this.lifetime==1)
				this.target.life -= 1;	
		}
		
	}	

	this.draw=function(){}
}