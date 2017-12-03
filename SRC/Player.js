	function Player(size,x,y,color,image,atackImage,maxlife,targetArray) 
	{

		this.arguments=[
						["Mouse.x","Mouse.y","c.LastTarget","c"],
						["c.x","c.y","Mouse.x","Mouse.y","this.size","c"],
						["c.x","c.y","c.size*2","c"],
						["Mouse.x","Mouse.y","c.LastTarget","c"],
						];
		this.skills = [Atack,ShockWaveThrow,Clap,Atack];
		this.size = size;
		this.OriginalSpeed = 5;
		this.speed=5;
		this.x = x;
		this.y = y;
		this.color =color;
		this.horizontalMod = 1;
		this.verticalMod = 1;
		this.animCounter =0;
		this.action = "standing";
		this.angle = 0;
		this.knock = 3;
		this.CurrentAbility = 1;
		this.LastTarget= this;
		this.Targets = [];
		this.AnimationProgress =0;
		this.image=image;
		this.atackImage=atackImage;
		this.stance =this.image;
		this.animate = 15;
		this.casting =false;
		this.colided = false;
		this.orbs =0;
		this.target = 0;
		this.maxlife = maxlife;
		this.life = this.maxlife;
		this.lifeBefore = this.life;
		this.orbBonus=0;
		this.direction = {
			x:0,
			y:0
		}
		this.buffArray = [];
		this.descArray =[];
		
		this.skillLevels = [1,1,1,1];
		this.CoolDownCounter = [0,0,0,0];

		this.damageBonus =0;
		this.SkillDamage = [1,1,1,1];
		this.SkillCoolDowns = [0.1,3,3,1];
		this.SkillAvabile = [true,true,true,true];
		this.DamageTexts = [];
		this.SkillTypes=[];

		this.item = Item;
		
		this.targetArray=targetArray;

		this.OrbLevels = [10,25,50,200];
		this.OrbLevel = 0;

		this.CalculateSkillDamage=function(SkillIndex)
		{
			var damage;
			damage = this.SkillDamage[SkillIndex]+this.damageBonus; 
			this.DamageTexts[SkillIndex] = String(damage);
			console.log(damage)
			return damage;
		}

		this.CalculateDamage=function(SkillIndex)
		{
			var damage;
			damage = this.SkillDamage[SkillIndex]+this.damageBonus;
			console(typeof(damage)+" "+damage); 
			return damage;
		}

		for(var i=0;i<this.SkillDamage.length;i++)
		{
			this.CalculateSkillDamage(i);
		}
		this.loadDescriptions=function()
		{
			this.descArray =[];
			switch(PlayerClass)
			{

				case "Warrior":

					var Slay = " Slay \n Level: " +this.skillLevels[0]+" \n Slay an enemy with your sword \n Deals: "+this.DamageTexts[0]+" damage ";
					this.descArray.push(Slay);
					var ShockWave = " ShockWave \n Level: " +this.skillLevels[1]+" \n Slam the ground with your sword creating a wave of force that rips your enemyes apart \n Deals: "+this.DamageTexts[1]+" damage ";
					this.descArray.push(ShockWave);
					var Stomp = " Stomp \n Level:  " +this.skillLevels[2]+" \n Stomp te ground with your foot throwing enemyes that sround you \n Deals: "+this.DamageTexts[2]+" damage ";
					this.descArray.push(Stomp);
					var HealFlag = " Heal Flag \n Level:  " +this.skillLevels[3]+" \n Place a healing flag that, while in it's rage, cures your wounds  \n Heals: "+this.DamageTexts[3]+" hit points ";
					this.descArray.push(HealFlag);

				break;
				case "Mage":
					var Shock = " Shock \n Level: " +this.skillLevels[0]+" \n Shock your enemy with the power of thunder \n Deals: "+this.DamageTexts[0]+" damage ";
					this.descArray.push(Shock);
					var FlameCall = " Flame Call \n Level: " +this.skillLevels[1]+" \n Burns an area with the power of fire \n Deals: "+this.DamageTexts[1]+" damage ";
					this.descArray.push(FlameCall);
					var Freeze = " Freeze \n Level:  " +this.skillLevels[2]+" \n Calls a cold wind that stuns your enemyes in place \n Deals: "+this.DamageTexts[2]+" damage ";
					this.descArray.push(Freeze);
					var DrainLife = " Drain Life \n Level:  " +this.skillLevels[3]+" \n Heals your wounds while dealing damage to the enemy  \n Heals: "+this.DamageTexts[3]+" hit points ";
					this.descArray.push(DrainLife);

				break;
			}


		}

		this.loadDescriptions();

		if(PlayerClass=="Warrior"){this.verticalMod = 2;}

		
		this.activateSkill=function()
		{
			for(var i=1;i<=4;i++)
					if(c.CurrentAbility==i && this.SkillAvabile[i-1])
					{

								this.skills[i-1](this);
								this.SkillAvabile[i-1] = false;
								this.CoolDownCounter[i-1] = Date.now();
									/*
								c.skills[i-1](
										eval(c.arguments[i-1][0]),
										eval(c.arguments[i-1][1]),
										eval(c.arguments[i-1][2]),
										eval(c.arguments[i-1][3]),
										eval(c.arguments[i-1][4]),
										eval(c.arguments[i-1][5]),
										eval(c.arguments[i-1][6]),
										eval(c.arguments[i-1][7]),
										eval(c.arguments[i-1][8]),
										eval(c.arguments[i-1][9])
										);
								this.SkillAvabile[i-1] = false;
								this.CoolDownCounter[i-1] = Date.now();	
								*/
					}

							
			}

				
		
		this.useSkill=function(targetable)
		{

			if(!targetable)
			{
				if(Mouse.clicked&&
				Mouse.x>CanvasObj.limitX1&&Mouse.x<CanvasObj.limitX2&&
				Mouse.y>CanvasObj.limitY1&&Mouse.y<CanvasObj.limitY2)
				{
					Mouse.clicked = false;
					this.activateSkill();

				}
			}
			else
			{
				//console.(c.LastTarget);
				if(Mouse.clicked && c.LastTarget!=0)
				{
					//console.log("magie");
					Mouse.clicked=false;
					this.activateSkill();
						
				}
			}

			
			
		}



		this.DrawLife=function(life,maxlife,x,y,w,h)
		{
			if(life>maxlife){life=maxlife;}
			percent = life*100/maxlife;
			ctx.fillStyle = "rgb(80,0,0)";
			ctx.fillRect(x,y,w,h);
			ctx.fillStyle = "rgb(204,0,0)";
			ctx.fillRect(x,y+1,percent*w/100,h-2);
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.font=12*WindowScale+"px Copperplate";
			ctx.fillText(Decimal( this.life,1),x+w/2,y+h-h/4);
		}

		this.DrawOrbs=function(x,y,w,h)
		{
			if(this.orbs>this.OrbLevels[this.OrbLevel+1]){
				this.OrbLevel++;
			}
			percent = this.orbs*100/this.OrbLevels[this.OrbLevel+1];

			ctx.fillStyle = "rgb(0,0,80)";
			ctx.fillRect(x,y,w,h);
			ctx.fillStyle = "rgb(0,0,204)";
			ctx.fillRect(x,y+1,percent*w/100,h-2);
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.font=12*WindowScale+"px Copperplate";
			ctx.fillText(this.orbs,x+w/2,y+h-h/4);
		}


		this.colide =function()
		{
			if(this.x-this.speed<CanvasObj.limitX1)
				this.x+=this.speed;
			if(this.x+this.size+this.speed > CanvasObj.limitX2)
				this.x-=this.speed;
			if(this.y-this.speed<CanvasObj.limitY1 )
				this.y+=this.speed;
			if(this.y+this.size+this.speed > CanvasObj.limitY2)
				this.y-=this.speed;
		}
		this.showDamage=function(){
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
			if(this.life>this.maxlife)
				this.life=this.maxlife;

		}
		this.draw = function()
		{
			/*
				chuncksArray[Math.round((this.x+this.size/2)/100)-1][Math.round((this.y+this.size/2)/100)-1].clear();
				chuncksArray[Math.round((this.x+this.size/2)/100)][Math.round((this.y+this.size/2)/100)-1].clear();
				chuncksArray[Math.round((this.x+this.size/2)/100)-1][Math.round((this.y+this.size/2)/100)].clear();
				chuncksArray[Math.round((this.x+this.size/2)/100)][Math.round((this.y+this.size/2)/100)].clear();
			*/	
				ctx.save();
				ctx.translate(this.x,this.y);
				this.angle = CalculateSlope(Mouse,this)+Math.PI/2;
				ctx.rotate(this.angle);
				ctx.fillStyle = this.color;
				//ctx.fillRect(this.size/-2,this.size/-2,this.size,this.size);
				ctx.drawImage(this.stance,50*this.horizontalMod,50*this.verticalMod,50,50,this.size*WindowScale/-2,this.size*WindowScale/-2,this.size*WindowScale,this.size*WindowScale);
				if(!Mouse.clicked)this.animate--;
				if(!Mouse.clicked && this.animate<=0)
				{
					this.stance=this.image;
					this.animate = 15;
				}
				ctx.restore();
				if(this.life<0){this.life=0;}
				this.DrawLife(this.life,this.maxlife,CanvasObj.limitX1+120*WindowScale,CanvasObj.limitY2-15*WindowScale,100*WindowScale,20*WindowScale);
				this.DrawOrbs(CanvasObj.limitX1+120*WindowScale,CanvasObj.limitY2-15*WindowScale+20*WindowScale,100*WindowScale,20*WindowScale);

				this.showDamage();	
				if(this.buffArray.length!=0)
					this.buffArray[0].draw();				
		}
		var skillNr =0;
		this.update = function()
		{
			
			for(var i=0;i<4;i++)
				if((Date.now()-this.CoolDownCounter[i])/1000>=this.SkillCoolDowns[i])
					this.SkillAvabile[i]=true;
			
			this.colide();
			this.useSkill(this.SkillTypes[c.CurrentAbility-1]);
			this.LastTarget=0;
			
			if(keyMap[65])
				if(!this.casting && !this.colided)
				this.direction.x=-1*this.speed;
			if(keyMap[87])
				if(!this.casting && !this.colided)
				this.direction.y=-1*this.speed;
			if(keyMap[68])
				if(!this.casting && !this.colided)
				this.direction.x=this.speed;
			if(keyMap[83])
				if(!this.casting && !this.colided)
				this.direction.y=this.speed;

			if(!keyMap[65] && !keyMap[68])
				this.direction.x = 0;
			if(!keyMap[83] && !keyMap[87])
				this.direction.y = 0;

			this.updateBuffs();	
			
			this.x+=this.direction.x;
			this.y+=this.direction.y;
			
			
			if(!this.casting)
			{
				for(var i=49;i<=52;i++)
				{
					if(keyMap[i])
				{
					c.CurrentAbility=i-48;
					
				}	
				
				}
			}
		}
}


Player.prototype.updateBuffs = function()
{
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
}