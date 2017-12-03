var Panel = function(x,y,size,infoBox,sprite,needsSps,sX,sY,sW,sH,type,skill)//for drawing images(like icons,thumbnails)
	{
		this.x=x;
		this.y=y;
		this.infoBox = infoBox;
		this.size=size*WindowScale;	
		this.selected = false;
		this.visibile=true;
		this.active = false;
		this.sprite=sprite;
		this.skillIndex;
		this.type;

		//to do fix type/skiillindex undefined
		if(typeof type ===undefined)
			this.type="";
		else
		{
			this.type=type;
			console.log("type got");
			console.log(this.type);
		}
			

		if(typeof skill ===undefined)
			this.skillIndex=0;
		else
			this.skillIndex=skill;

		if(typeof needsSps === undefined)
		this.needsSps = false;
		else
		this.needsSps = needsSps;
		
		if(typeof sX === undefined)
		this.sX= 0;
		else
		this.sX = sX;

		if(typeof sY === undefined)
		this.sX= 0;
		else
		this.sY = sY;

		if(typeof sW === undefined)
		this.sW= 0;
		else
		this.sW = sW;

		if(typeof sH === undefined)
		this.sH= 0;
		else
		this.sH = sH;

		this.mouseOver=function()
		{
				if(Mouse.x>this.x&&
				Mouse.x<this.x+this.size&&
				Mouse.y>this.y&&
				Mouse.y<this.y+this.size)
				{
				
					this.infoBox.visibile=true;
					this.infoBox.canFade=true;
					this.active=true;
				}
				else
				{
					this.infoBox.visibile=false;
					this.infoBox.canFade=false;
					this.infoBox.update();

					this.active=false;
				}
				
		}
		this.draw = function()
		{

			ctx.beginPath();
			
				
								//console.log(c.SkillAvabile);
				//console.log(c.SkillAvabile[0]);
				//console.log(this.skillIndex);
				//console.log(this.type);
				if(!this.needsSps)
				ctx.drawImage(this.sprite,this.x,this.y,this.size,this.size);
				else
				ctx.drawImage(this.sprite,this.sX,this.sY,this.sW,this.sH,this.x,this.y,this.size,this.size);


				if(!this.active)
				{
				ctx.fillStyle = "rgba(0,0,0,0.6)";
				ctx.fillRect(this.x,this.y,this.size,this.size);	

				}


				if(this.type=="Skill" && !c.SkillAvabile[this.skillIndex] )
				{

						ctx.fillStyle = "rgba(0,0,0,1)";
						ctx.fillRect(this.x+1/10*this.size,this.y+1/10*this.size,this.size-2/10*this.size,this.size-2/10*this.size);	
						ctx.fillStyle = "rgba(255,0,0,1)";
						ctx.font=this.size-4/10*this.size+"px Impact";
						ctx.fillText(parseInt((c.SkillCoolDowns[this.skillIndex]-(Date.now()-c.CoolDownCounter[this.skillIndex])/1000)+1),this.x+this.size/4,this.y+this.size-2/10*this.size);
				}

			
			ctx.closePath();
			

			
		}
		this.update =function()
		{
			
			this.x=x;
			this.y=y;
			this.mouseOver();
			
		}
	}