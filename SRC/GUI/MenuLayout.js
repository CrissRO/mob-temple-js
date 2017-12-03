var CM = 
{
	state:"closed",


	warriorBtn:new Button(0,0,200,200,"Warrior",CharacterButtons[0],SelectWar,ctx),
	mageBtn:new Button(500,200,200,200,"Mage",CharacterButtons[1],SelectMage,ctx),

	btnArray:new Array(0),
	isInit:false,
	init:function()
	{
		this.btnArray.push(this.warriorBtn);
		this.btnArray.push(this.mageBtn);
		for(var i=0;i<this.btnArray.length;i++)
		{
		
		//this.btnArray[i].y-=500-this.btnArray[i].height;	
		//console.log(this.btnArray[i]);
		
		this.btnArray[i].x=canvas.width/2-this.btnArray[i].w/2;
		this.btnArray[i].y=(this.btnArray[i].h+50*WindowScale)*i+50*WindowScale;
		
		}
		
	},

	draw:function()
	{

		ctx.drawImage(MenuBG,0,0,800*WindowScale,600*WindowScale);
		if(!this.isInit){this.init();this.isInit=true;}
		for(var i=0;i<this.btnArray.length;i++)
			this.btnArray[i].draw();

	},

	update:function()
	{

		this.draw();


		if(ReadyToTransition)
		for(var i=0;i<this.btnArray.length;i++)
			this.btnArray[i].update();





	},


};


var BreakMenu=
{	

	RaffleBtn:new Button(300,100,100,50,"RaffleBtn",ButtonSps,RaffleSelect,ctx,true,250*2,125*0,250,125),
	RunesBtn:new Button(300,200,100,50,"RunesBtn",ButtonSps,Log,ctx,true,250*0,125*1,250,125),
	UpgradeBtn:new Button(300,300,100,50,"UpgradeBtn",ButtonSps,Log,ctx,true,250*3,125*0,250,125),
	SkillsBtn:new Button(300,400,100,50,"SkillsBtn",ButtonSps,Log,ctx,true,250*1,125*1,250,125),
	CloseBtn:new Button(300,500,100,50,"CloseBtn",ButtonSps,CloseMenu,ctx,true,250*2,125*1,250,125),

	btnArray:new Array(0),
	isInit:false,

	init:function()
	{
		this.btnArray.push(this.RaffleBtn);
		this.btnArray.push(this.RunesBtn);
		this.btnArray.push(this.UpgradeBtn);
		this.btnArray.push(this.SkillsBtn);
		this.btnArray.push(this.CloseBtn);
		for(var i=0;i<this.btnArray.length;i++)
		{
		
		//this.btnArray[i].y-=500-this.btnArray[i].height;	
		//console.log(this.btnArray[i]);
		
		this.btnArray[i].x=canvas.width/2-this.btnArray[i].w/2;
		this.btnArray[i].y=(this.btnArray[i].h+50*WindowScale)*i+100*WindowScale;
		
		}
	},

	draw:function()
	{
		ctx.drawImage(BreakBG,0,0,800*WindowScale,600*WindowScale);
		if(!this.isInit){this.init();this.isInit=true;}
		for(var i=0;i<this.btnArray.length;i++)
			this.btnArray[i].draw();
	},

	update:function()
	{
		for(var i=0;i<this.btnArray.length;i++)
			this.btnArray[i].update();
	},
};
Roll=function(){if(!Raffle.isRaffleOn)Raffle.start();};
ExitRaffle=function(){if(Raffle.finished){Raffle.close();CurrentMenuItem="Menu";}};

var RaffleMenu=
{	

	

	_RollBtn:new Button(Raffle.x-Raffle.eW+100*WindowScale,
						Raffle.h,
						Raffle.eW,Raffle.eH/2,
						"string",
						ButtonSps,
						Roll,
						ctx,true,250*1,125*0,250,125),
	_ExitRaffleBtn:new Button(Raffle.x+Raffle.eW+100*WindowScale,
						Raffle.h,
						Raffle.eW,Raffle.eH/2,
						"string",
						ButtonSps,
						ExitRaffle,
						ctx,true,250*2,125*1,250,125),


	btnArray:new Array(0),
	isInit:false,

	init:function()
	{
		this.btnArray.push(this._RollBtn);
		this.btnArray.push(this._ExitRaffleBtn);
		
		for(var i=0;i<this.btnArray.length;i++)
		{
		this.btnArray[i].y = canvas.height-this.btnArray[i].h*2;
		console.log(this.btnArray[i].y);	
		}
		
	

		
	},

	draw:function()
	{
		//
		if(!this.isInit){this.init();this.isInit=true;}
		for(var i=0;i<this.btnArray.length;i++)
			this.btnArray[i].draw();
	},

	update:function()
	{
		Raffle.update();
		this.draw();

		for(var i=0;i<this.btnArray.length;i++)
			this.btnArray[i].update();
	},
};

/*

 	var _RollBtn = new Button(Raffle.x-Raffle.eW,Raffle.y+Raffle.eH*4,Raffle.eW,Raffle.eH/2,"string",RollBtn,Roll,ctx);
 	var _ExitRaffleBtn = new Button(Raffle.x+Raffle.eW,Raffle.y+Raffle.eH*4,Raffle.eW,Raffle.eH/2,"string",CloseBtn,ExitRaffle,ctx);

*/