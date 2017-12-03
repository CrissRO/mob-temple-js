Door = function(x,y,width,height,Image,direction)
{
	this.x=x;
	this.y=y;
	this.Image=Image;
	this.width=width;
	this.height=height;
	this.state="closed";
	this.direction=direction;
	this.isMoving = false;
	this.speed = 10;
	this.fullOpen=false;
	this.draw=function()
	{
		ctx.drawImage(this.Image,this.x,this.y,this.width,this.height);
	}
	this.Open = function()
	{
		if(!this.fullOpen)
		{
			if(this.direction=="left")
				{
					if(this.x+this.width>= this.width/2)
					this.x-=this.speed;
				else{
					this.isMoving=false;
					this.state="open";
					this.x=this.width/2-this.width;
					}
				}
			else{
				if(this.x<= this.width+this.width/2)
				this.x+=this.speed;
				else{
					this.isMoving=false;
					this.state="open";
					this.x = this.width+this.width/2;
				}
			}	
		}
		else
		{
			if(this.direction=="left")
				{
					if(this.x+this.width>= 0)
					this.x-=this.speed;
				else{this.isMoving=false;this.state="open";}
				}
			else{
				if(this.x<= this.width*2)
				this.x+=this.speed;
				else{this.isMoving=false;this.state="open";}
			}	

		}
		
	}
	this.Close = function()
	{

		if(this.direction=="left")
			{
				if(this.x+this.width<= this.width)
				this.x+=this.speed;
				else{
					this.isMoving=false;
					this.state="closed";

				}
			}
		else{
				if(this.x>= this.width)
				this.x-=this.speed;
				else{this.isMoving=false;this.state="closed";}
			}
	}

	this.update = function()
	{
		if(this.x+this.w>-1 || this.x< canvas.width+1)
		this.draw();
		if(this.isMoving)
		{
			if(this.state=="closed")
				this.Open();
			else
				this.Close();
		}
	}
}