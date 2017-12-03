/*
function Mob(size,x,y,speed,target,imgSet,life) 
	{
		
		this.size = size;//
		this.x = x;//
		this.y = y;//
		this.angle = 0;//
		this.speed=speed;//
		this.mainTarget=target;
		this.secTarget = {
			x:-1,
			y:-1
		}
		this.target=this.mainTarget;//
		this.colided=false;
		this.maxlife = life;
		this.life = life;
		this.hit = false;
		this.hitTime = 0;
		this.sprites = imgSet;
		this.stance = this.sprites[0];
		this.stuned = false;
		this.stunType = 'frozen';
		this.stunedTime = 0;
		this.thrown = false;
		this.knocked = false;
		this.knockedTime =0;
		this.isBoss=false;
		this.curentPlayer = Player1;
		this.coolDown = 30;
		this.maxCoolDown = 30;
		this.buffArray = [];
		this.knockSpeed =
		{
			x:0,
			y:0
		}
		this.vDirection = 'up';
		this.scale = 1;
		
		this.direction=
		{
			x:this.speed*Math.cos(this.angle)*-1,
			y:this.speed*Math.sin(this.angle)*-1
		}
		this.getX=function(){return this.x;}
		this.getY=function(){return this.y;}
		this.getSpeed=function(){return this.speed;}
		this.DrawLife=function()
		{
			var Width = ((this.size-2) * this.life)/this.maxlife;
			ctx.beginPath();
			ctx.fillStyle="rgba(0,0,0,0.7)";
			ctx.fillRect(this.x-this.size/2,this.y-this.size/2-8,this.size,8);
			ctx.fill();
			ctx.fillStyle="rgba(255,0,0,0.8)";
			ctx.fillRect(this.x-this.size/2+1,this.y-this.size/2-7,Width,6);
			ctx.fill();
			ctx.closePath();
		}
		this.draw = function()
		{
				ctx.beginPath();
				ctx.save();
				ctx.translate(this.x,this.y);
				ctx.rotate(this.angle-1.2);
				ctx.fillStyle = this.color;
				if(!this.thrown)
				ctx.drawImage(this.stance,this.size*WindowScale/-2,this.size*WindowScale/-2,this.size*WindowScale,this.size*WindowScale);
				else
				{
					ctx.drawImage(this.stance,this.size*WindowScale/-2,this.size*WindowScale/-2,this.size*WindowScale+this.scale,this.size*WindowScale+this.scale);	
					
					if(this.vDirection =='up')
					{
						if(this.scale<30*WindowScale)this.scale+=2*WindowScale;
						else {this.vDirection = 'down';}
					}
					else
					{
						
						if(this.scale>1*WindowScale)this.scale-=2*WindowScale;
						else {
							this.vDirection = 'up';
							this.thrown=false;
							var grey =RandomI(50,128);
							pgens[nrGen]= new ParticleGen(this.x-this.size/2,this.y-this.size/2,this.size,this.size,5,5,Random(-2,2),Random(-2,2),30,15,grey,grey,grey,15,true,true);
							nrGen++;
						}
					}
				}
				if(!this.hit&& !this.stuned)
				this.stance = this.sprites[0];
				ctx.restore();	
				this.DrawLife();
				ctx.closePath();
				this.fillStyle="#fff";
				ctx.fillRect(this.target.x,this.target.y,10,10);
		}
		this.sendBack=function()
		{
					if(this.x+this.direction.x<CanvasObj.limitX1||
					this.x+this.size+this.direction.x>CanvasObj.limitX2 ||
					this.y+this.direction.y<CanvasObj.limitY1||
					this.y+this.size+this.direction.y>CanvasObj.limitY2 
					)
					{
					this.x =Random(CanvasObj.limitX1,CanvasObj.limitX2);
					this.y =Random(CanvasObj.limitY1,CanvasObj.limitY2);
					this.secTarget.x = -1;
					this.secTarget.y = -1;
					this.target = this.mainTarget;

					}
					
		}
		this.atack = function()
		{
			if(this.coolDown<=0)
			{
			this.target.life-= 1;	
			this.coolDown = this.maxCoolDown;
			}
			
		}
		this.colide = function()
		{
			//console.log(Math.floor(this.x) +"  "+ Math.floor(this.y));
			var tempX,tempY,d;
			
			
			if(this.secTarget.x == -1 && !this.colided)
				for(var i=0;i<mobs.length;i++)
				{
					
					if(mobs[i]!=this)
					{

						if(Distance(this.x+this.direction.x,mobs[i].x,this.y+this.direction.y,mobs[i].y)<(this.size/2+mobs[i].size/2))
						{
							d=Distance(this.x+this.direction.x,mobs[i].x,this.y+this.direction.y,mobs[i].y);
							
							tempX =this.x+Math.cos(this.angle+mobsAngleMult/100*this.angle)*d*4;
							tempY =this.y+Math.sin(this.angle+mobsAngleMult/100*this.angle)*d*4;
							this.secTarget.x = tempX;
							this.secTarget.y = tempY;
							this.target = this.secTarget;
							mobsAngleMult+=10;
							break;
						}
					}
					
				}
			else{
				
				if(Distance(this.x,this.target.x,this.y,this.target.y)<this.size*WindowScale)
				{
				
					if(Distance(this.x+this.direction.x,c.x,this.y+this.direction.y,c.y)<(this.size+c.size)*2)	
					{
					this.secTarget.x = -1;
					this.secTarget.y = -1;
					this.target = this.mainTarget;	
					}
					else
					{
						if(Distance(this.x+this.direction.x,c.x,this.y+this.direction.y,c.y)<200*WindowScale)
						{
						d=Distance(this.x+this.direction.x,this.secTarget.x,this.y+this.direction.y,this.secTarget.y);
						tempX =this.x+Math.cos(this.angle+this.angle/2)*d*4;
						tempY =this.y+Math.sin(this.angle+this.angle/2)*d*4;
						this.secTarget.x = tempX;
						this.secTarget.y = tempY;
						this.target = this.secTarget;	
						}
						else
						{
						this.secTarget.x = -1;
					this.secTarget.y = -1;
					this.target = this.mainTarget;			
						}
					}
					
				}	
			}
				

			if(Distance(this.x+this.direction.x,c.x,this.y+this.direction.y,c.y)<this.size/2+c.size/2)
				{
					this.atack();
					this.x-=this.direction.x;
					this.y-=this.direction.y;
					this.colided=true;
					this.secTarget.x = -1;
					this.secTarget.y = -1;
					this.target = this.mainTarget;
				}
			else
				this.colided=false;
			
		

		}
		this.CheckClick= function()
		{
			if(Mouse.x > this.x-this.size/2 && Mouse.x<this.x+this.size/2 &&
				Mouse.y > this.y-this.size/2 && Mouse.y<this.y+this.size/2
				)
				{
					c.LastTarget=this;
				}
		}
		this.update = function()
		{
			
			if(this.life>0)
			{
				this.sendBack();
				this.draw();
				this.coolDown --;
				this.angle = CalculateSlope(this,this.target);
				this.direction.x = this.speed*Math.cos(this.angle)*-1;
				this.direction.y = this.speed*Math.sin(this.angle)*-1;
				this.colide();
				this.CheckClick();
				for(var i=0;i<this.buffArray.length;i++)
				{
					if(this.buffArray[i].lifetime>0)
					{
						this.buffArray[i].update();
						this.buffArray[i].draw();	
					}
					else
						this.buffArray.splice(i,1);
					
				}
				if(this.hit){this.hitTime+=0.2;this.stance = this.sprites[1];}
				if(this.hitTime>=3){this.hit=false;this.hitTime=0;}
				
				if(!this.knocked)
				{
					if(!this.colided&&!this.stuned)
					{
					this.y+=this.direction.y;
					this.x+=this.direction.x;
					}
				}
				else
				{
					this.knockedTime--;

					this.y-=this.knockSpeed.y;
					this.x-=this.knockSpeed.x;
					if(this.knockedTime<=0)
						this.knocked=false;
				}
					//ai grija la ordine
				if(this.stuned)
				{
					if(this.stunType=='frozen')
					{
						this.stance = this.sprites[2];
					}
					this.stunedTime-=0.1;
					if(this.stunedTime<=0)
						this.stuned = false;
				}

			}

			//ctx.fillStyle="#000000";
			//Rect(this.x,this.y,10,10);
			
		}
	}
*/