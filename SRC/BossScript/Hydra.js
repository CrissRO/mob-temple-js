
var Hydra = 
{

	x:canvas.width/2,
	y:canvas.height/2-100*WindowScale,
	size:250,
	phase:1,
	maxlife: 500,
	life:500,
	isBoss:true,
	sprite:HydraBody,
	HeadSprite:HydraHead,
	tarckInterval:10,
	trackCounter:0,
	HeadSize:100,
	spellCounter:0,
	HeadAngles:[],
	HeadX:[],
	HeadY:[],
	Bombs:[],
	angle:0,
	BodyAngle:0,
	target:0,
	TrackTargetPos:
	{
		x:100,
		y:100,
	},

	hMod:0,

	isInit:false,
	init:function()
	{
		//wthis.HeadSize=map(WindowScale,1,1.57,100,150);
		this.size*=WindowScale;
		
	},

	breathFire:function()
	{
		var p = new ParticleGen(this.HeadX[1]+this.x,
								this.HeadY[1]+this.y,
								40,40,
								15,
								15,
								Math.cos(this.HeadAngles[1])*5,
								Math.sin(this.HeadAngles[1])*5,
								5,
								40,
								RandomI(180,255),26,3,
								40,
								true,false);

			pgens.push(p);	
			//console.log(this.HeadX[1]);
		
	},

	breathIce:function()
	{
		var p = new ParticleGen(this.HeadX[0]+this.x,
								this.HeadY[0]+this.y,
								40,40,
								15,
								15,
								Math.cos(this.HeadAngles[0])*6,
								Math.sin(this.HeadAngles[0])*6,
								5,
								40,
								100,150,RandomI(190,255),
								40,
								true,false);

			pgens.push(p);	
			//console.log(this.HeadX[1]);
		
	},
	rockMove:function(Dummy)
	{
		//console.log(Dummy);
		if(Dummy.x<CanvasObj.limitX1||Dummy.x>CanvasObj.limitX2)
		{
			Dummy.dx*=-1;
			Dummy.angle =Math.atan2(Dummy.dy,Dummy.dx);
		}
			
		if(Dummy.y<CanvasObj.limitY1||Dummy.y>CanvasObj.limitY2)
		{
			Dummy.dy*=-1;
			Dummy.angle =Math.atan2(Dummy.dy,Dummy.dx);
		}
		var p = new ParticleGen(Dummy.x,
								Dummy.y,
								20,20,
								15,
								15,
								0.1,
								0.1,
								5,
								10,
								0,255,3,
								10,
								true,false);

			pgens.push(p);	
			
	},
	venomBombThrow:function(HeadIndex)
	{

		dist = Distance(this.HeadX[HeadIndex]+this.x,this.TrackTargetPos.x,this.HeadY[HeadIndex]+this.y,this.TrackTargetPos.y);
			console.log(dist);

		Bdummyes[nrBDummyes] = new Dummy(this.HeadX[HeadIndex]+this.x,this.HeadY[HeadIndex]+this.y,
										Math.cos(this.HeadAngles[HeadIndex])*dist/40,
										Math.sin(this.HeadAngles[HeadIndex])*dist/40,
										1,500,this.rockMove,nrBDummyes,dummyAssets[5],"normal"
										);
		Bdummyes[nrBDummyes].angle = CalculateSlope(this,this.TrackTargetPos)+Math.PI;
		this.Bombs.push(Bdummyes[nrBDummyes]);

		BargsArray.push([Bdummyes[nrBDummyes]]);
		BargsEvalArray.push(["Bdummyes[i]"]);

		Bdummyes[nrBDummyes].declareArgs(BargsArray[nrBDummyes]);
		nrBDummyes++;

	//****hit rock//
	/*
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

*/

	},
	CheckClick:function()
	{
		if(Mouse.x > this.x-this.size/2 && Mouse.x<this.x+this.size/2 &&
				Mouse.y > this.y-this.size/2 && Mouse.y<this.y+this.size/2
				)
				{
					c.LastTarget=this;
					if(Mouse.clicked)
					{
						this.venomBombThrow(2);
						this.venomBombThrow(3);
						//Mouse.clicked=false;
					}
					this.breathFire();
					this.breathIce();
					
				
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

		var SO = 
		{
			x:0,
			y:0,
			x1:0,
			y1:0,

		}

		this.BodyAngle = CalculateSlope(this,this.target)+Math.PI/2;
		//body
		ctx.save();
		ctx.fillStyle="#000000";
		ctx.beginPath();
		ctx.translate(this.x,this.y);
		ctx.rotate(this.BodyAngle);
		ctx.drawImage(this.sprite,this.size/-2,this.size/-2,this.size,this.size);
		ctx.closePath();
		ctx.restore();

		//head ice
		SO.x = this.x+this.size/2;
		SO.y = this.y+this.size/2-this.size/6;
		this.angle = CalculateSlope(SO,this.target);
		SO.x1 = this.size/2*Math.cos(this.BodyAngle) - (SO.y-this.y)*Math.sin(this.BodyAngle) ;
		SO.y1 = (SO.y-this.y)*Math.cos(this.BodyAngle) + this.size/2*Math.sin(this.BodyAngle) ;
		this.HeadX[0] = SO.x1;
		this.HeadY[0] = SO.y1;
		this.HeadAngles[0] = this.angle+Math.PI;

		ctx.save();
		ctx.fillStyle="#000000";
		ctx.beginPath();
		ctx.translate(SO.x1+this.x,SO.y1+this.y);
		ctx.rotate(this.angle-Math.PI/2);
		ctx.drawImage(this.HeadSprite,0,0,150,150,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale,this.HeadSize*WindowScale);
		//ctx.fillRect(this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale,this.HeadSize);
		ctx.closePath();
		ctx.restore();
		//head fire
		SO.r = this.size/2;
		SO.x = this.x-this.size/2;
		SO.y = this.y+this.size/2;
		this.angle = CalculateSlope(SO,this.target);
		SO.x1 = -1*this.size/2*Math.cos(this.BodyAngle) - this.size/2*Math.sin(this.BodyAngle) ;
		SO.y1 = this.size/2*Math.cos(this.BodyAngle) + -1*this.size/2*Math.sin(this.BodyAngle) ;
		this.HeadX[1] = SO.x1;
		this.HeadY[1] = this.size/2*Math.cos(this.BodyAngle) + -1*this.size/2*Math.sin(this.BodyAngle) ;;
		this.HeadAngles[1] = this.angle+Math.PI;

		ctx.save();
		ctx.beginPath();
		ctx.translate(SO.x1+this.x,SO.y1+this.y);
		ctx.rotate(this.angle-Math.PI/2);
		ctx.drawImage(this.HeadSprite,300,0,150,150,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale,this.HeadSize*WindowScale);
		ctx.closePath();
		ctx.restore();

		//right venom
		SO.x = this.x+this.size/6;
		SO.y = this.y+this.size/2;
		this.angle = CalculateSlope(SO,this.target);
		SO.x1 = this.size/6*Math.cos(this.BodyAngle) - this.size/2*Math.sin(this.BodyAngle) ;
		SO.y1 = this.size/2*Math.cos(this.BodyAngle) + this.size/6*Math.sin(this.BodyAngle) ;
		this.HeadX[2] = SO.x1;
		this.HeadY[2] = SO.y1;
		this.HeadAngles[2] = this.angle+Math.PI;

		ctx.save();
		ctx.beginPath();
		ctx.translate(SO.x1+this.x,SO.y1+this.y);
		ctx.rotate(this.angle-Math.PI/2);
		ctx.drawImage(this.HeadSprite,150,0,150,150,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale,this.HeadSize*WindowScale);
		ctx.closePath();
		ctx.restore();

		//left venom
		SO.x = this.x-this.size/6;
		SO.y = this.y+this.size/2;
		this.angle = CalculateSlope(SO,this.target);
		SO.x1 = -1*this.size/6*Math.cos(this.BodyAngle) - this.size/2*Math.sin(this.BodyAngle) ;
		SO.y1 = this.size/2*Math.cos(this.BodyAngle) + -1*this.size/6*Math.sin(this.BodyAngle) ;
		this.HeadX[3] = SO.x1;
		this.HeadY[3] = SO.y1;
		this.HeadAngles[3] = this.angle+Math.PI;

		ctx.save();
		ctx.beginPath();
		ctx.translate(SO.x1+this.x,SO.y1+this.y);
		ctx.rotate(this.angle-Math.PI/2);
		ctx.drawImage(this.HeadSprite,150,0,150,150,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale/-2,this.HeadSize*WindowScale,this.HeadSize*WindowScale);
		ctx.closePath();
		ctx.restore();
		//ctx.fillStyle="#000000";
		//ctx.fillRect(this.x-this.size/2*WindowScale ,this.y-this.size/2*WindowScale ,this.size*WindowScale, this.size*WindowScale);

		
	if(this.life<0){this.life=0;}
	DrawLife(this.life,this.maxlife,this.x-this.size/2,this.y-this.size/2-30*WindowScale,this.size,30*WindowScale);
	},

	update:function()
	{
		if(!this.isInit){this.init();this.isInit=true;}
		this.draw();
		this.colidePlayer();
		this.CheckClick();

		this.trackCounter++;
		if(this.trackCounter==this.tarckInterval)
		{
			this.trackCounter=0;
			
			this.TrackTargetPos.x = TrackTarget(this.target).x;
			this.TrackTargetPos.y = TrackTarget(this.target).y;
		}
	}
}