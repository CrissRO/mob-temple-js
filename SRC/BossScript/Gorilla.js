var Gorilla = 
{

	x:canvas.width/2,
	y:canvas.height/2-100*WindowScale,
	size:250,
	phase:1,
	maxlife: 500,
	life:500,
	isBoss:true,
	sprite:GorillaSps,
	tarckInterval:10,
	trackCounter:0,

	spellCounter:0,
	phase1Interval:50,
	throwHitRange:100*WindowScale,

	phase2Interval:100,
	PointA:{x:-100,y:-100},
	PointB:{x:0,y:0},
	stompPoints:[],
	stompRange:100*WindowScale,
	stompPointsNr:2,

	stanceCounter:0,
	stanceChange1: 31,
	stanceChange2: 23,


	berserk:0,
	berserkMod:0,
	berserkSprite:BerserkStances,

	angle:0,
	target:0,
	TrackTargetPos:
	{
		x:100,
		y:100,
	},
	RockPos:
	{
		x:100,
		y:100,
	},
	vMod:1,
	hMod:0,

	isInit:false,
	init:function()
	{
		for(var i=0;i<5;i++)
		this.stompPoints.push({x:-100,y:-100});
		
	},
	berserkDraw:function(x,y,w,h)
	{
		//75*WindowScale
		ctx.fillStyle = "rgba(0,0,0,0.8)";
		ctx.fillRect(x,y,w,h);
		ctx.drawImage(this.berserkSprite,100*this.berserkMod,0,100,100,x,y,w,h);
		ctx.fillStyle = "rgba(255,255,255,0.85)";
		ctx.font=15*WindowScale+"px Copperplate";
		if(this.berserk>100){this.berserk = 100;}
		ctx.fillText(Decimal(this.berserk,1)+"%",x+1/10*w,y+h);
	},
	roar:function()
	{

	},

	throwRock:function()
	{

//console.log(this.TrackTargetPos);
		this.angle = CalculateSlope(this,this.target);
		modifier = 1;
		if(this.hMod==1)
		{
			this.hMod--;
			modifier = 1;
		}
		else
		{
			this.hMod++;	
			modifier = -1;
		}
		
		this.vMod = 1;
		
		SO =
		{	

			x:( (-Gorilla.size/2) * Math.cos(this.angle) - (modifier*Gorilla.size/2) * Math.sin(this.angle))+Gorilla.x ,
			y:((modifier*Gorilla.size/2) * Math.cos(this.angle) + (-Gorilla.size/2) * Math.sin(this.angle))+Gorilla.y ,
			//x:(Gorilla.x),
			//y:(Gorilla.y+Gorilla.size/2)
		};

		dist = Distance(SO.x,this.TrackTargetPos.x,SO.y,this.TrackTargetPos.y);
		

		Bdummyes[nrBDummyes] = new Dummy(SO.x,SO.y,
										Math.cos(CalculateSlope(SO,this.TrackTargetPos)+Math.PI)*dist/50,
										Math.sin(CalculateSlope(SO,this.TrackTargetPos)+Math.PI)*dist/50,
										1,50,this.rockMove,nrBDummyes,dummyAssets[2],"arc"
										);
		Bdummyes[nrBDummyes].angle = CalculateSlope(this,this.TrackTargetPos)+Math.PI;

		BargsArray.push([Bdummyes[nrBDummyes].x]);
		BargsEvalArray.push(["Bdummyes[i].x"]);

		Bdummyes[nrBDummyes].declareArgs(BargsArray[nrBDummyes]);
		nrBDummyes++;
	//****hit rock//
		Bdummyes[nrBDummyes] = new Dummy(this.TrackTargetPos.x,this.TrackTargetPos.y,
										0,
										0,
										49,50,this.rockHit,nrBDummyes,"null","normal"
										);
		this.RockPos.x = this.TrackTargetPos.x;
		this.RockPos.y = this.TrackTargetPos.y;
		Bdummyes[nrBDummyes].angle = CalculateSlope(this,this.TrackTargetPos)+Math.PI;

		BargsArray.push([Bdummyes[nrBDummyes].x]);
		BargsEvalArray.push(["Bdummyes[i].x"]);

		Bdummyes[nrBDummyes].declareArgs(BargsArray[nrBDummyes]);
		nrBDummyes++;
	},

	rockMove:function()
	{
		//console.log("move");
	},

	rockHit:function()
	{
		//console.log("throwHit");
			var gArray = [RandomI(120,150),RandomI(120,150),RandomI(120,150)];
			var p = new ParticleGen(Gorilla.RockPos.x-Gorilla.throwHitRange/2,
									Gorilla.RockPos.y-Gorilla.throwHitRange/2,
											Gorilla.throwHitRange,Gorilla.throwHitRange,
											7,
											7,
											Random(-15,15),
											Random(-15,15),
											250,
											40,
											gArray[0],gArray[1],gArray[2],
											20,
											false,true);
			pgens.push(p);		

			dist =Distance(Gorilla.RockPos.x,Gorilla.target.x,Gorilla.RockPos.y,Gorilla.target.y);
			if(dist<=Gorilla.throwHitRange/2)
			{
				percent =100-(100*dist/(Gorilla.throwHitRange/2));
				console.log(percent);
				Gorilla.target.life-=10*percent/100 ;
			}
				
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

	stomp:function()
	{
		this.hMod=0;
		if(this.berserk >= 30 && this.berserk<50){
			this.phase2Interval = 70;
			this.berserkMod =0;
			this.stompPointsNr = 3;
		}
		else if(this.berserk >= 50&& this.berserk < 70)
		{
			this.phase2Interval = 50;
			this.berserkMod =1;
			this.stompPointsNr = 4;
		}
		else if(this.berserk >= 70 && this.berserk < 90)
		{
			this.phase2Interval = 35;
			this.stanceChange2 = 15;
			this.berserkMod =2;
			this.stompPointsNr = 5;
		}
		else if(this.berserk >= 90)
		{
			this.phase2Interval = 20;
			this.stanceChange2 = 15;
			this.berserkMod =3;
		}

		if(this.berserk<100)
		this.berserk+=Random(0.5,3);
		
		if(this.berserk>=100)
		this.barserk = this.berserk -(this.berserk-100);

		//console.log(this.berserk);
		for(var i=0;i<this.stompPointsNr;i++)
		{
			dist =Distance(Gorilla.stompPoints[i].x,Gorilla.target.x,Gorilla.stompPoints[i].y,Gorilla.target.y);
			if(dist<=Gorilla.stompRange/2)
			{
				percent =100-(100*dist/Gorilla.stompRange/2);

				Gorilla.target.life-=10*percent/100 ;
			}

			var gArray = [RandomI(120,150),RandomI(120,150),RandomI(120,150)];
			var p = new ParticleGen(this.stompPoints[i].x-this.stompRange/2,this.stompPoints[i].y-this.stompRange/2,
											this.stompRange,this.stompRange,
											7,
											7,
											Random(-10,10),
											Random(-10,10),
											250,
											40,
											gArray[0],gArray[1],gArray[2],
											20,
											false,true);
			pgens.push(p);				
		}
		
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
		if(this.phase==1)
		{
			ctx.beginPath();
			ctx.fillStyle = "rgba(255,255,0,0.5)";
			ctx.arc(this.RockPos.x, this.RockPos.y,this.throwHitRange/2,0,Math.PI*2);
			ctx.fill();
			ctx.closePath();
		}

		if(this.phase==2)
		{
		for(var i=0;i<this.stompPointsNr;i++)
		{
			ctx.beginPath();
			ctx.fillStyle = "rgba(255,255,0,0.5)";
			ctx.arc(this.stompPoints[i].x, this.stompPoints[i].y,this.stompRange/2,0,Math.PI*2);
			ctx.fill();
			ctx.closePath();	
		}
			
			
		this.berserkDraw(10,10,75*WindowScale,75*WindowScale);	
		}
	if(this.life<0){this.life=0;}
	DrawLife(this.life,this.maxlife,this.x-this.size*WindowScale/2,this.y-this.size*WindowScale/2-30*WindowScale,this.size*WindowScale,30*WindowScale);
	},

	update:function()
	{
		if(this.life<=this.maxlife/2){this.phase=2;console.log("se intmpla!");}
		
		this.colidePlayer();
		this.CheckClick();
		if(!this.isInit){this.isInit=true;this.init();}
		this.draw();
		this.trackCounter++;
		this.spellCounter++;
		this.stanceCounter++;
		if(this.stanceCounter==this.stanceChange2&&this.phase == 2)
		{
			this.stanceCounter=0;
			this.vMod = 0;
			this.hMod = 1;
		}
		if(this.stanceCounter==this.stanceChange1&&this.phase == 1)
		{
			this.stanceCounter=0;
			this.vMod = 1;
		}
		
		
		if(this.phase==1)
			{	
				if(this.spellCounter==this.phase1Interval)
				{
				this.throwRock();
				this.spellCounter=0;
				}
			}
		else
			{
				if(this.spellCounter==this.phase2Interval)
				{
				this.stomp();
				this.spellCounter=0;

				for(var i=0;i<this.stompPointsNr;i++)
				{
					this.stompPoints[i].x = Random(CanvasObj.limitX1+this.stompRange,CanvasObj.limitX2-this.stompRange);
					this.stompPoints[i].y = Random(CanvasObj.limitY1+this.stompRange,CanvasObj.limitY2-this.stompRange);
				}

				for(var i=0;i<this.stompPointsNr;i++)
				while(Distance(this.x,this.stompPoints[i].x,this.y,this.stompPoints[i].y) < this.size)
					{
						this.stompPoints[i].x = Random(CanvasObj.limitX1+this.stompRange,CanvasObj.limitX2-this.stompRange);
					this.stompPoints[i].y = Random(CanvasObj.limitY1+this.stompRange,CanvasObj.limitY2-this.stompRange);
					}
				}	
			}
		if(this.trackCounter==this.tarckInterval)
		{
			this.trackCounter=0;
			
			this.TrackTargetPos.x = TrackTarget(this.target).x;
			this.TrackTargetPos.y = TrackTarget(this.target).y;
		}


	}
}