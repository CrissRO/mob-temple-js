var bgCanvas = document.getElementById("bgCanvas");
var bgCtx = bgCanvas.getContext("2d");

var canvas = document.getElementById("myCanvas");
var $Canvas = $('#myCanvas');

var ctx = canvas.getContext("2d");
var WindowScale =1.1;//1.57 for 1920x1080;
var PlayerClass = "Mage";
var CurrentScene = "CharMenu";
bgCanvas.width=canvas.width = 800*WindowScale;
bgCanvas.height=canvas.height = 600*WindowScale;
canvas.style.background = "rgba(0,0,0,0)";
var mobs=[];//mobs.length=5;
var mobsAngleMult=0;
var pgens=[],nrGen=0;
var efects=[],nrEffects=0,efTimer =[];
var DumEfects=[],nrDumEfects=0,DumefTimer=[];
//console.Beep();
var dummyes=[],nrDummyes=0;
var argsArray=[];
var argsEvalArray=[];
var projectiles = [];
var fadingTexts=[];
var OrbArray=[];
var Spawner1;
var RoundStarted=true;
var Bdummyes=[],nrBDummyes=0;
var BargsArray=[];
var BargsEvalArray=[];

var chuncksArray =[];

var Player1;
var CurrentWave=0;
var MaxWave =1;
var c;
var isClear = false;
var keyMap = [];
var Panels=[];
var InfoBoxes =[];
var ReadyToTransition = false;
var CharacterSelected = false;
var CanvasObj =
	{
		limitX1:50*WindowScale,
		limitX2:800*WindowScale-50*WindowScale,
		limitY1:0,
		limitY2:600*WindowScale-30*WindowScale
		
	};

var CurrentMenuItem = "Menu";
/*Mouse*/
	var Mouse =
	{
		x:0,
		y:0,
		clicked:false,
		w:25,
		h:25,
		hMod:0,

		drawPointer : function()
		{
			ctx.drawImage(CursorSps,100*this.hMod,0,100,100,this.x,this.y,this.w,this.h);
			//var distance = Math.sqrt((Math.pow(c.x-this.x,2) + Math.pow(c.y-this.y,2)));
			/*
			switch(c.CurrentAbility)
				{
					
					case 2:
					
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					ctx.fillStyle = 'rgba(255,100,0,0.5)';
					ctx.beginPath();
					ctx.arc(this.x,this.y,50,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					break;
					
					case 3:
					
					ctx.fillStyle = 'rgba(255,255,255,0.5)';
					ctx.beginPath();
					ctx.arc(this.x-5,this.y-5,10,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();
					break;
					case 4:
					ctx.fillStyle = 'rgba(90,250,120,0.5)';
					
					ctx.beginPath();
					
					ctx.moveTo(c.x,c.y);
					ctx.lineTo(c.x +Math.cos(CalculateSlope(c,this)+Math.PI+0.5)*150,
								c.y +Math.sin(CalculateSlope(c,this)+Math.PI+0.5)*150
								);	
								
					ctx.bezierCurveTo(
					c.x +Math.cos(CalculateSlope(c,this)+Math.PI+0.25)*150,
					c.y +Math.sin(CalculateSlope(c,this)+Math.PI+0.25)*150,
					
					c.x +Math.cos(CalculateSlope(c,this)+Math.PI-0.25)*150,
					c.y +Math.sin(CalculateSlope(c,this)+Math.PI-0.25)*150,
					
					c.x +Math.cos(CalculateSlope(c,this)+Math.PI-0.5)*150,
					c.y +Math.sin(CalculateSlope(c,this)+Math.PI-0.5)*150
					);
					
					ctx.lineTo(c.x +Math.cos(CalculateSlope(c,this)+Math.PI-0.5)*200,
								c.y +Math.sin(CalculateSlope(c,this)+Math.PI-0.5)*200
								);				
						
					ctx.lineTo(c.x, 
								c.y
								);	
					
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					ctx.stroke();
					ctx.strokeStyle = 'rgba(90,250,120,1)';
					ctx.stroke();

					
					ctx.closePath();
					ctx.fill();
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					
					break;
					case 5:
					
					ctx.fillStyle = 'rgba(90,190,255,0.5)';
					ctx.strokeStyle = 'rgba(90,190,255,1)';
					ctx.beginPath();
					
					ctx.moveTo(c.x,c.y);
					ctx.lineTo(c.x +Math.cos(CalculateSlope(c,this)+Math.PI+0.5)*200,
								c.y +Math.sin(CalculateSlope(c,this)+Math.PI+0.5)*200
								);	
								
					ctx.bezierCurveTo(
					c.x +Math.cos(CalculateSlope(c,this)+Math.PI+0.25)*200,
					c.y +Math.sin(CalculateSlope(c,this)+Math.PI+0.25)*200,
					
					c.x +Math.cos(CalculateSlope(c,this)+Math.PI-0.25)*200,
					c.y +Math.sin(CalculateSlope(c,this)+Math.PI-0.25)*200,
					
					c.x +Math.cos(CalculateSlope(c,this)+Math.PI-0.5)*200,
					c.y +Math.sin(CalculateSlope(c,this)+Math.PI-0.5)*200
					);
					
					ctx.lineTo(c.x +Math.cos(CalculateSlope(c,this)+Math.PI-0.5)*200,
								c.y +Math.sin(CalculateSlope(c,this)+Math.PI-0.5)*200
								);				
							
					
					ctx.lineTo(c.x, 
								c.y
								);	
					
					
					ctx.stroke();

					
					ctx.closePath();
					ctx.fill();
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					break;
					
					case 6:
					ctx.fillStyle = 'rgba(255,255,255,0.8)';
					ctx.beginPath();
					ctx.arc(this.x-5,this.y-5,10,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();
					break;
					
					case 7:
					ctx.fillStyle = 'rgba(0,255,0,0.8)';
					ctx.beginPath();
					ctx.arc(this.x-5,this.y-5,10,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();
					break;
					
					case 8:
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					ctx.fillStyle = 'rgba(0,255,0,0.4)';
					
					
					ctx.fillRect(this.x-50,this.y-50,100,100);
					ctx.stroke();
					ctx.strokeStyle = 'rgba(0,0,0,0)';
					break;
					
					case 9:
					ctx.fillStyle = 'rgba(255,100,0,0.5)';
						ctx.beginPath();
					ctx.arc(c.x,c.y,100,0,2*Math.PI);
					ctx.closePath();
					ctx.fill();
					break;
				}
		*/
	}
	}