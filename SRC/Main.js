$(function(){
	
	
	
		//$Canvas.css('marginLeft') = "100px";
	
	var CanvasLOffset = parseInt($Canvas.css('marginLeft'));
	var CanvasTOffset = parseInt($Canvas.css('marginTop'));

	var Ox = parseInt($Canvas.css('offsetWidth'));
	var p = document.getElementById("Player");
	var pa = document.getElementById("PlayerA");
	
	var initGame =false;
	bgCtx.drawImage(bg,0,0,800*WindowScale,600*WindowScale);
	var a;//mob spawner
	var Boss1;
	var inGame = false;
	var isMenuAnimations =true;
	var DL = new Door(0,0,canvas.width/2,canvas.height,DoorLeft,"left");
	var DR = new Door(canvas.width/2,0,canvas.width/2,canvas.height,DoorRight,"right");
	var LogoElem = new FadingElement(canvas.width/7,canvas.height/5,canvas.width*0.75,canvas.height*0.75,Logo,0.1);
 	var Doors = [DL,DR];
 	var WeaponInfo;
 	var iconIndex =0;
 	var StartRaffle = false;
 	for(var i=0;i<Math.round(canvas.width/100);i++)
 		chuncksArray[i] = [];

 	for(var i=0;i<Math.round(canvas.width/100);i++)
 		for(var j=0;j<Math.round(canvas.height/100);j++)
 			chuncksArray[i][j] = new Chunck(i*100,j*100,100,100);


 	Raffle.set();
 	var _ShopMenu = new ShopMenu();
 	//console.log(map(1.41,1.22,1.44,23,40.8));
 	//console.log(Raffle.elements);
 	//function Roll(){if(!Raffle.isRaffleOn)Raffle.start();}
 	//function ExitRaffle(){if(Raffle.finished){Raffle.close();CurrentMenuItem="Menu"}}
 	//var _RollBtn = new Button(Raffle.x-Raffle.eW,Raffle.y+Raffle.eH*4,Raffle.eW,Raffle.eH/2,"string",ButtonSps,Roll,ctx,true,250*1,125*1,250,125);
 	//var _ExitRaffleBtn = new Button(Raffle.x+Raffle.eW,Raffle.y+Raffle.eH*4,Raffle.eW,Raffle.eH/2,"string",ButtonSps,ExitRaffle,ctx,true,250*1,125*1,250,125);
	function Tranzition(isFull)
	{
		if(!inGame)
		{
			
			if(Mouse.clicked)
			{	
				if(LogoElem.alpha==0)
				{
				DR.isMoving=true;
				DL.isMoving=true;
					
				}
				else
				{
					LogoElem.fadeIn = false;
					LogoElem.isFading = true;

				}
			

			
			}
			if(isFull)
					{
					DR.isMoving=true;
					DL.isMoving=true;
					DR.fullOpen=true;
					DL.fullOpen=true;	
					}	
			if(DL.state=="open"&&DR.state=="open" )
				ReadyToTransition=true;

			if(DL.state=="open"&&DR.state=="open" && isFull)
				isMenuAnimations=false;

			if(DL.state=="closed"&&DR.state=="closed" && ReadyToTransition && CharacterSelected)
			{
				ReadyToTransition=false;
				DR.isMoving=true;
				DL.isMoving=true;
				DR.fullOpen=true;
				DL.fullOpen=true;	
				inGame = true;
			}

			if(DL.state=="closed"&&DR.state=="closed" && !CharacterSelected &&ReadyToTransition)
			{
				ReadyToTransition=false;
				LogoElem.fadeIn = true;
					LogoElem.isFading = true;

			}
		}
		
	}
/*Main Update*/
/*Initialize*/
	function Initialize()
	{
	c = new Player(50,200,200,'green',p,pa,500,mobs);
	//Warrior/Mage
	PlayerSkillInit(PlayerClass);
	Spawner1 = new MobSpawner(400,50,1);
	initGame=true;

	Player1 = c;
	Gorilla.target = c;
	SpiderMother.target = c;
	Hydra.target = c;
	
	

	//mobs.push(new Mob(50,200,200,1.57,c,assets[6],10));
}
/*Player Skiils init*/
	function PlayerSkillInit(Cclass)
	{

		MarginLeft = 550*WindowScale;
		MarginTop = CanvasObj.limitY2-15*WindowScale;
		LatMod = 50*WindowScale;
		

		if(Cclass=="Warrior")
		{
			/*
		c.arguments=[
						["Mouse.x","Mouse.y","c.LastTarget","c"],
						["c"],
						["c.x","c.y","c.size*4","c"],
						["Mouse.x","Mouse.y","50","500","80","10","c"],
						];
						*/
		c.skills = [Atack,ShockWaveThrow,ClapCast,HealFlagThrow];
		//c.SkillTypes = [true,false,false,false];//true-needs a target,false-doesent need
		iconIndex=0;
		}
		else if(Cclass=="Mage")
		{
			/*
		c.arguments=[
						["Mouse.x","Mouse.y","c.LastTarget","c"],
						["c.x","c.y","Mouse.x","Mouse.y","c.size","c.size*2","c"],
						["c.x","c.y","Mouse.x","Mouse.y","c.size*4","c"],
						["Mouse.x","Mouse.y","c.LastTarget","c"],
						];
						*/
		c.skills = [ThunderCast,MeteoriteThrow,Freeze,DrainLifeCast];	
		//c.SkillTypes = [true,false,false,true];//true-needs a target,false-doesent need
		iconIndex=1;
		}


		SkillInfo=new InfoBox(200,c.item.description);
		SkillBox=new Panel(CanvasObj.limitX1+20,MarginTop,40,SkillInfo,BladeIconSps,true,c.item.spriteIndex*200,0*200,200,200);	
		
		InfoBoxes.push(SkillInfo);
		Panels.push(SkillBox);
		//c.item.spriteIndex++;
		

		for(var i=0;i<4;i++)
		{
			SkillInfo=new InfoBox(200,c.descArray[i]);
			SkillBox=new Panel(MarginLeft+LatMod*i,MarginTop,40,SkillInfo,icons[iconIndex][i],false,null,null,null,null,"Skill",i);	
			
			InfoBoxes.push(SkillInfo);
			Panels.push(SkillBox);
		}

	}


	var OrderedMobs =[];
/*Main Update*/

	document.addEventListener('keydown',function(event)
	{
		
		keyMap[event.keyCode] = true;
		
		
	});
	document.addEventListener('keyup',function(event)
	{
		
		keyMap[event.keyCode] = false;
		

		
	});



    var upd=0,
    	timestep=0,
    	gameFramerate=1000/30,
    	start = Date.now();	
	var sum=0;
    GameLoop();
    	
    function GameLoop(){


	    

	    if(!document["hidden"])
	    {

			requestAnimationFrame(GameLoop,canvas);
			
	    	var current = Date.now(),
		  	elapsed = current - start;

		  	start=current;
		  	timestep += elapsed;

		  	while(timestep >= gameFramerate)
		  	{
		  		Update();	
		  		if(CurrentScene=="Game")
		  		{
	  			Render();
	  		
	  			RenderGUI();	
		  		}
	  			
		  		upd++;
		  		timestep -= gameFramerate;
		  	}	

	    }

    }
    var t1,t2;
    function Render()
    {

    	ctx.clearRect(0,0,canvas.width,canvas.height);
		
    	for(var i=0;i<pgens.length;i++)
    	{
			pgens[i].draw();
    	}
    	for(var i=0;i<projectiles.length;i++)
			projectiles[i].draw();
		for(var i=0;i<mobs.length;i++)
			mobs[i].draw();

		for(var i=0;i<OrbArray.length;i++)
			OrbArray[i].draw();

		if(c!==undefined)
		c.draw();

		
		for(var i=0;i<fadingTexts.length;i++)
			fadingTexts[i].draw();	

		
    }

    function RenderGUI()
    {
		for(var i=0;i<Panels.length;i++)
			Panels[i].draw();
		for(var i=0;i<Panels.length;i++)
		{
			if(InfoBoxes[i].visibile)
			InfoBoxes[i].update();
		}
		Mouse.drawPointer();
    }
	function Update()
	{
	if(keyMap[81])
	switch(gameFramerate)
	{
		case 20:
		gameFramerate = 1000/10;
		keyMap[81]=false;
		break;
		case 100:
		gameFramerate = 1000/200;
		keyMap[81]=false;
		break;
		case 5:
		gameFramerate = 1000/50;
		
		keyMap[81]=false;
		break;
	}
	if(upd%8000==0)
	{
	ctx.clearRect(0, 0, canvas.width, canvas.height);	
	}
	

	

	canvas.onmousemove =function(event)
	{
		Mouse.x = event.x-CanvasLOffset;
		Mouse.y = event.y-CanvasTOffset;
		
	}
	canvas.onmousedown =function(event)
	{
		Mouse.clicked=true;

		
	}
	canvas.onmouseup =function(event)
	{
		Mouse.clicked=false;
		//c.action="atack";
	}

	switch(CurrentScene)
	{

	case "Game":
		if(!initGame){
			
			Initialize();
		}
		//WeaponInfo.content = c.item.description;

		
		//Tranzition(CharacterSelected);

	//ctx.drawImage(bg,0,0,800*WindowScale,600*WindowScale);	
		
		
		//Update paricles
		for(var i=0;i<pgens.length;i++)
		{
			pgens[i].update();

			if(pgens[i].life==0)
			pgens.splice(i,1);		
		}
		//Update projectiles
		for(var i=0;i<projectiles.length;i++)
		{
			projectiles[i].update();
			//projectiles[i].draw();
			if(projectiles[i].life==0||!projectiles[i].alive)
			projectiles.splice(i,1);
		}

		
		for(var i=0;i<mobs.length;i++)
		{
		//console.log(mobs);
		mobs[i].update();
		//mobs[i].draw();
			if(mobs[i].life<=0)
			{
				var p= new ParticleGen2(mobs[i].x,
							mobs[i].y,
							5,5,
							2,2,
							50,15,
							new Color(180,25,200));
				pgens.push(p);									
				for(var j=0;j<RandomI(1,5+c.orbBonus);j++)
				OrbArray.push(new Orb(mobs[i].x,mobs[i].y,RandomI(5,10),RandomI(7,10),mobs[i].target));
				mobs.splice(i,1);

				
				
			}
		}

		
		for(var i=0;i<OrbArray.length;i++)
			if(OrbArray[i].alive)
				OrbArray[i].update();
			else
			{
				OrbArray[i].target.orbs++;
				console.log(OrbArray[i].target.orbs);
				OrbArray.splice(i,1);

			}
		
		
		c.update();

			
		for(var i=0;i<Panels.length;i++)
		{
			Panels[i].update();

			
		}
		

		Spawner1.update();

		//console.log(mobs.length);
		for(var i=0;i<fadingTexts.length;i++)
		{
			if(fadingTexts[i].lifetime>0)
			{
				fadingTexts[i].update();
				//fadingTexts[i].draw();
			}
			else 
				fadingTexts.splice(i,1);	

		}
		if(isClear){RoundStarted=false;}
		if(mobs.length<=0 &&Spawner1.state!="active")
		{
			CurrentScene="Break";
		}


	break;	
	case "Break":
	
	ctx.drawImage(BreakBG,0,0,800*WindowScale,600*WindowScale);
	switch(CurrentMenuItem)
	{
		case "Menu":
		_ShopMenu.update();
		_ShopMenu.draw();
		break;
		case "Raffle":
		RaffleMenu.update();
		for(var i=pgens.length;i>0;i--)
			{
			pgens[i-1].update();
			if(!pgens[i-1].alive)
			{pgens.splice(i-1,1);nrGen--;}			
		}
		break;
	}


	
	
	break;
	case "CharMenu":
	
		Mouse.hMod=0;
		CM.update();
		break;

	}

	Tranzition(CharacterSelected);
	
	for(var i=0;i<Doors.length;i++)
	{
		Doors[i].update();
	}
	LogoElem.update();		
	
	
	
	Mouse.drawPointer();
	//Connect(Mouse,c);
	

	}
	
});