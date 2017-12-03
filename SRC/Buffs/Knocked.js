function Knocked(target,lifetime,knock_starter,knock_speed)
{
	Buff.call(this,target,lifetime);
	
	this.update=function(){
		this.lifetime--;

		
		this.target.angle = CalculateSlope(knock_starter,this.target)
		//sets the knock direction
		this.target.direction.x = knock_speed * Math.cos(this.target.angle) *-1;
		this.target.direction.y = knock_speed * Math.sin(this.target.angle) *-1;
	}	

	this.draw=function(){}
}
