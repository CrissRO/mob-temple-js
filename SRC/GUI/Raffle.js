RafElement = function(x,y,w,h,Image)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.name;
	this.Image = Image;
	this.properties =[0,0,0,0,0];
	this.color = "rgba("+RandomI(0,255)+","+RandomI(128,255)+","+RandomI(128,255)+","+1+")";
	this.description = "description lorem ipsum bla bla bla rahat gunoi cacat! habar nu am cat damage da, oricum e un cacat de joc si asta e un cacat de itema \n sabia cacat ataca cu 3 cacati pe secunda pisamas pe ea sa o sa dracu ! ";
}
var ItemsName = ["Elven Quick Blade","Dark King Blade","Dragon Tooth Blade","Nature Leaf Blade","Steel Blade","Crystal Sabre"];

var Swords =[
				[70,3,0,0,0],//uncommon 1
				[110,5,1,0.1,0],//epic
				[150,7,1.5,0.3,10],//legendar
				[90,3,0.5,0,0],//rare
				[70,0,0,0,0],//common
				[80,2,0,0,0],//uncommon 2

			];

var PropNames =[
				["Damage ","Critical(%) ","Life Steal(%) ","HP Regen ","Luck(%)"],
				];



var Raffle  = 
{
	x:canvas.width/4,
	y:50,
	eW:70,
	eH:70,
	h:0,
	w:0,
	updateCounter:0,
	pickedElement:0,
	elements : [
			new RafElement(0,0,20,20,WarriorIcons[0]),
			new RafElement(0,0,20,20,WarriorIcons[0]),
			new RafElement(0,0,20,20,WarriorIcons[0]),
			new RafElement(0,0,20,20,WarriorIcons[0]),
			new RafElement(0,0,20,20,WarriorIcons[0]),
			new RafElement(0,0,20,20,WarriorIcons[0]),
			],
	limits:[],
	speeds:[10,2],
	CurrentSpeed:0.00001,
	updatePoints:[],
	isRaffleOn:false,
	RanOnce:false,
	pickPoint:0,
	picked:false,
	colorsNr:[0,0,0,0,0,0],
	showDelay:0,
	showStart:0,
	//showPoints:[false,false,false,false,true],

	showedStats:false,
	statString:" ",
	statIndex:0,
	pickedQuality:false,
	updQuality:0,
	updQualityCounter:0,
	bonusQuality:0,
	percentBonus:0,//bonusvalue for each prop
	finished:false,
	isInit:false,
	fontSizes:[23,18,15],
	set:function()
	{


		this.statIndex=0;
		this.statString=" ";
		this.finished=true;
		this.RanOnce = false;
		this.isRaffleOn=false;
		this.updateCounter=0;
		this.picked=false;
		this.updatePoints[0] = RandomI(600,800);
		this.updatePoints[1] = RandomI(200,400);
		this.updatePoints[2] = RandomI(30,100);


		this.limits[0] = this.x;


		this.limits[1] = this.x + this.eW*this.elements.length-this.eW;
		this.pickPoint = this.x + (this.eW*this.elements.length-this.eW/2)/2;
		//this.CurrentSpeed=20;
		
		 
		this.CurrentSpeed = (this.eW*20)/100;
		this.speeds[0] = (this.eW*10)/100;
		this.speeds[1] = (this.eW*5)/100;

		for(var i=0;i<this.elements.length;i++)
		{
			this.elements[i].w = this.eW;
			this.elements[i].h = this.eH;
			this.elements[i].x = this.x + this.eW*i;
			this.elements[i].y = this.y+this.eH/2 ;
			this.elements[i].name = ItemsName[i];
			switch(PlayerClass)
			{
				case "Warrior" : 
					for(var j=0;j<this.elements[i].properties.length;j++)
					this.elements[i].properties[j] = Swords[i][j];
					console.log(this.elements[i].properties);
				break;
			}
		}
		
		//console.log(this.h);
	},
	init:function()
	{
		this.eW =this.eH = 70*WindowScale;
		this.w = this.eW*3*WindowScale ;
		this.h = canvas.height-this.eH*3 ;
		//console.log(this.h);
		this.set();

	},
	start:function()
	{
		this.set();
		if(!this.RanOnce)
		{
			this.isRaffleOn=true;
		this.RanOnce = true;	
		}
		
	},
	run:function()
	{
		

		this.updateCounter++;
		if(this.updateCounter<this.updatePoints[0])
			this.isRaffleOn=true;
		else
			this.isRaffleOn=false;

		if(this.updateCounter>this.updatePoints[0]-this.updatePoints[1])
			this.CurrentSpeed = this.speeds[0];
		if(this.updateCounter>this.updatePoints[0]-this.updatePoints[2])
			this.CurrentSpeed = this.speeds[1];

		for(var i=0;i<this.elements.length;i++)
		{
		this.elements[i].x -= this.CurrentSpeed;
		if(this.elements[i].x +this.elements[i].w < this.limits[0])
			this.elements[i].x = this.limits[1]-this.CurrentSpeed;
		}

	},

	pick:function()
	{
		//var pickedElement;
		for(var i=0;i<this.elements.length;i++)
		{
		
		if(this.elements[i].x +this.elements[i].w >this.pickPoint && this.elements[i].x < this.pickPoint)
		{
		
		this.picked=true;
		this.pickedElement = this.elements[i];
		//this.colorsNr[i]+=1;
		//pickedElement.y+=pickedElement.h;
		c.item.description = this.elements[i].description;

		c.item.spriteIndex= i;
		Panels[0].sX = 200*c.item.spriteIndex;

		this.setNumberRoll();

		console.log(this.pickedElement.properties);
		
		}
		
		}
		//this.start();
		//return pickedElement;
	},
	setNumberRoll:function()
	{
		this.pickedQuality = false;
		this.updQuality = RandomI(50,200);
		this.updQualityCounter = 0;
		this.bonusQuality=0;
		this.showStart=Date.now();
	},
	runNumberRoll:function()
	{
		if(this.updQualityCounter<this.updQuality)
		{
		this.updQualityCounter++;	
		this.bonusQuality=RandomI(-50,50);
		}
		else
		{
			this.pickedQuality=true;
		}

	},
	drawStats:function()
	{

	},
	addToStats:function()
	{
		if(((Date.now()-this.showStart)/1000)>this.statIndex+1)
		{
		
		this.percentBonus = this.bonusQuality/100*this.pickedElement.properties[this.statIndex];
		this.statString = this.statString + PropNames[0][this.statIndex]+" : "+Decimal(this.pickedElement.properties[this.statIndex],1)+" + "+Decimal(this.percentBonus,1)+" >>> "+Decimal((this.pickedElement.properties[this.statIndex]+this.percentBonus),2)+" \n \n ";
		this.statIndex++;	
		var p = new ParticleGen(this.x-this.eW,
										this.y+this.eH*2,
											this.limits[1]-this.x-this.eW,
											this.eH*4,
											3,
											3,
											Random(-3,3),
											Random(-3,3),
											80,
											20,
											0,0,150,
											20,
											true,true);
			pgens.push(p);
			
		}
		


	},
	draw:function()
	{
		
		
		ctx.drawImage(RaffleBox,this.x-this.eW,this.y+this.eH*2,(this.limits[1]-this.x+this.eW*2),this.h*WindowScale);
		fill(0,0,0,1);
		Rect(this.x-this.eW,this.y,this.limits[1]-this.x+this.eW*2,this.eH*2);
		for(var i=0;i<this.elements.length;i++)
		{
		//console.log(this.elements[i].h);
		ctx.beginPath();
		ctx.fillStyle = this.elements[i].color;
		ctx.drawImage(Blades,200*i,0,200,200,this.elements[i].x,this.elements[i].y,this.elements[i].w,this.elements[i].h);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "#ff0000";
		Rect(this.pickPoint-5,this.y,10,this.eH);
		}
		ctx.drawImage(RaffleCover,this.x-this.eW,this.y,this.limits[1]-this.x+this.eW*2,this.eH*2);
		if(this.picked)
		{
			fill(255,255,255,1);
			ctx.font=this.fontSizes[0]*WindowScale+"px Copperplate";
			Text(ctx,this.pickedElement.name,this.x+this.eW,this.y+(this.eH+this.eH/2*2.5)*WindowScale,this.eW*4,this.fontSizes[0]*WindowScale);		
			if(!this.pickedQuality)
				this.runNumberRoll();

			ctx.font=this.fontSizes[1]*WindowScale+"px Copperplate";
			Text(ctx,"Quality: "+this.bonusQuality +" %",this.x+this.eW*2,this.y+this.eH*2.5*WindowScale,this.eW*3,this.fontSizes[1]*WindowScale);		
			
			
			if(this.pickedQuality)
			{
				if(this.statIndex<PropNames[0].length)
				{
					this.addToStats();
					//this.pickedElement.properties[this.statIndex] += this.percentBonus;
					//quality bonus must be aded to item

				}
				else
				{
					this.finished=true;
				}
				ctx.beginPath();
				fill(255,255,255,1);
				ctx.font=this.fontSizes[2]*WindowScale+"px Copperplate";
				Text(ctx,this.statString,this.x,this.y+this.eH*3*WindowScale,this.limits[1]-this.x,this.fontSizes[2]*WindowScale);				
				ctx.closePath();
			}
			
			
		}

	},
	close:function()
	{	
		if(this.pickedElement)
		{
		var statBonus=this.pickedQuality/100;
		c.item.description = this.pickedElement.name;
		switch(PlayerClass)
		{
			case "Warrior":
			c.item.damageBase = this.pickedElement.properties[0]+this.pickedElement.properties[0]*statBonus;
			c.item.description = c.item.description + " \n Atack: " + c.item.damageBase +" \n ";

			c.item.crit = this.pickedElement.properties[1]+this.pickedElement.properties[1]*statBonus;
			c.item.description = c.item.description + " \n Crit Chance(%): " + c.item.crit +" \n ";

			c.item.lifeSteal = this.pickedElement.properties[2]+this.pickedElement.properties[2]*statBonus;
			c.item.description = c.item.description + " \n Life Steal: " + c.item.lifeSteal +" \n ";

			c.item.lifeRegen = this.pickedElement.properties[3]+this.pickedElement.properties[3]*statBonus;
			c.item.description = c.item.description + " \n Life Regen: " + c.item.lifeRegen +" \n ";

			c.item.luck = this.pickedElement.properties[4]+this.pickedElement.properties[4]*statBonus;
			c.item.description = c.item.description + " \n Luck(%): " + c.item.luck +" \n ";

			
			break;
		}

		InfoBoxes[0].content = c.item.description;	
		}
		
	},
	update:function()
	{
		if(!this.isInit){this.isInit=true;this.init();}
		this.draw();
		if(this.isRaffleOn)
			this.run();
		else if(this.RanOnce&& !this.picked)
			 this.pick();
		
			
	},

}

