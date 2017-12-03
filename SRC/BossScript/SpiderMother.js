var SpiderMother = 
{

	x:canvas.width/2,
	y:canvas.height/2-100*WindowScale,
	size:250,
	phase:1,
	maxlife: 500,
	life:500,
	isBoss:true,
	sprite:SpiderMotherSps,
	trackInterval:10,
	trackCounter:0,

	phase1Counter:0,
	phase1Interval:300,
	eggs:[],
	nrSpiders:0,
	

	
	angle:0,
	target:0,
	TrackTargetPos:
	{
		x:100,
		y:100,
	},
	
	vMod:0,
	hMod:0,

	isInit:false,
	init:function()
	{
	
	},
	
	spawnEgg:function()
	{
		if(mobs.length<=10)
		{
			mobs.push(new Mob(50,this.TrackTargetPos.x,this.TrackTargetPos.y
							,0,
							this.target,
							assets[8],10));
			this.eggs.push(mobs[mobs.length-1]);

		}
		
/*
		Bdummyes[nrBDummyes] = new Dummy(,
										0,
										0,
										399,400,this.bornEgg,nrBDummyes,dummyAssets[1],"normal"
										);
		//Bdummyes[nrBDummyes].angle = CalculateSlope(this,this.TrackTargetPos)+Math.PI;

		BargsArray.push([Bdummyes[nrBDummyes].x,Bdummyes[nrBDummyes].y,20*WindowScale]);
		BargsEvalArray.push(["Bdummyes[i].x","Bdummyes[i].y",20*WindowScale]);

		Bdummyes[nrBDummyes].declareArgs(BargsArray[nrBDummyes]);
		nrBDummyes++;
		*/
	},

	bearEgg:function(posX,posY,expoRange)
	{

		//6 size,x,y,speed,target,imgSet,life
		
		//mobs.push(new Mob(50,posX,posY,1.7,this.target,assets[6],20));
		CreateMob(6,posX,posY);		
		var p = new ParticleGen(posX-expoRange/2,posY-expoRange/2,
								expoRange,expoRange,
											10,
											10,
											Random(-5,5),
											Random(-5,5),
											100,
											40,
											0,99,10,
											20,
											true,true);
			pgens.push(p);		
	},
	CheckClick:function()
	{
		if(Mouse.x > this.x-this.size/2 && Mouse.x<this.x+this.size/2 &&
				Mouse.y > this.y-this.size/2 && Mouse.y<this.y+this.size/2
				)
				{
					c.LastTarget=this;
				}
	},
	colidePlayer:function()
	{

		if(Distance(this.target.x,this.x,this.target.y,this.y)<=this.size/2*WindowScale)
			{
				this.angle = CalculateSlope(this,this.target);
				this.target.x+=this.target.speed * Math.sin(this.angle);
				this.target.y+=this.target.speed * Math.cos(this.angle);
				this.target.colided=true;
				this.target.life-=0.05;
				
			}
		else
			this.target.colided=false;
	},

	draw:function()
	{


		this.angle = CalculateSlope(this,this.target);

		ctx.save();
		ctx.fillStyle="#000000";
		ctx.translate(this.x,this.y);
		ctx.rotate(this.angle+Math.PI/2);
		ctx.drawImage(this.sprite,this.size*this.hMod,this.size*this.vMod,this.size,this.size,this.size*WindowScale/-2,this.size*WindowScale/-2,this.size*WindowScale,this.size*WindowScale);
		ctx.restore();
		//ctx.fillStyle="#000000";
		//ctx.fillRect(this.x-this.size/2*WindowScale ,this.y-this.size/2*WindowScale ,this.size*WindowScale, this.size*WindowScale);
		
		ctx.beginPath();
		ctx.fillStyle="rgba(255,0,0,0.5)";
		ctx.arc(this.TrackTargetPos.x,this.TrackTargetPos.y,50,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();

			

		
	if(this.life<0){this.life=0;}
	DrawLife(this.life,this.maxlife,this.x-this.size*WindowScale/2,this.y-this.size*WindowScale/2-30*WindowScale,this.size*WindowScale,30*WindowScale);
	},

	update:function()
	{

		if(!this.isInit){this.init();}
		this.colidePlayer();
		this.CheckClick();
		this.draw();
		this.trackCounter++;
		if(this.trackCounter==this.trackInterval)
		{
			this.trackCounter=0;
			this.TrackTargetPos.x = this.target.x;
			this.TrackTargetPos.y = this.target.y;
		}
		this.phase1Counter++;
		if(this.phase1Counter==this.phase1Interval)
		{
			this.phase1Counter=0;
			this.spawnEgg();
		}

		for(var i=0;i<this.eggs.length;i++)
		{
			if(this.eggs[i].life<=0)
			{
				
				this.bearEgg(this.eggs[i].x,this.eggs[i].y,100);
				this.eggs.splice(i,1);
				
			}
				
			else
			{
				this.eggs[i].life-=0.1;
				
			}
			
			

		}
			
	}
}