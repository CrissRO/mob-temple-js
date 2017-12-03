ExitShop=function(){
	CurrentScene="Game";
	RoundStarted=true;
	Spawner1.state="active";
	isClear=false;
}
BuyLife=function(){
	if(c!=undefined&&c.orbs>=10)
	{
	c.maxlife+=20;
	c.orbs-=10;	
	}
	
}
BuyAtack=function(){
	if(c!=undefined&&c.orbs>=0)
	{
	c.damageBonus+=1;
	c.orbs-=0;	
	for(var i=0;i<c.SkillDamage.length;i++)
		{
			c.CalculateSkillDamage(i);
		}


	}
	
}

BuyOrbBonus=function(){
	if(c!=undefined&&c.orbs>=20)
	{
	c.orbs-=20;
	c.orbBonus+=3;	
	}
	
}

BuyPotionSmall=function(){
	if(c!=undefined&&c.orbs>=3)
	{
	c.life+=10;
	c.orbs-=3;	
	}
	
}

BuyPotionMed=function(){
	if(c!=undefined&&c.orbs>=8)
	{
	c.life+=25;
	c.orbs-=8;	
	}
	
}
BuyPotionBig=function(){
	if(c!=undefined&&c.orbs>=14)
	{
	c.life+=50;
	c.orbs-=14;	
	}
	
}
ShopMenu=function()
{
	this.x=0;
	this.y=0;
	this.w=canvas.width;
	this.h=canvas.height;

	this.bH = (this.h-100)/2;
	this.bW = this.w/3;

	this.buttonW = 50;
	this.buttonH = 25;
	var childrenBox1 =[
		new ShopButton(this.x+this.w-this.buttonW*2,this.y+this.h-this.buttonH*2,this.buttonW,this.buttonH),
		new Label(this.x+this.buttonW,this.y+this.h-this.buttonH*2,this.buttonW,this.buttonH)
	
	]

	this.boxes=[
		new Box(0,0,this.w,100,new Color(128,128,128),
			new Array(
						new ShopButton(this.w-this.buttonW,
										0,
										this.buttonW,this.buttonH,ExitShop,"X"),
						new Label(0+this.buttonW,
										this.buttonH,
										this.buttonW*2,this.buttonH*2)
					),4,4
			),

		//buy life
		new Box(0,100,this.bW,this.bH,
				new Color(RandomI(0,255),RandomI(0,255),RandomI(0,255)),
				new Array(
						new ShopButton(0+this.bW-this.buttonW*2,
										100+this.bH-this.buttonH*2,
										this.buttonW,this.buttonH,BuyLife),
						new Label(0+this.buttonW,
										100+this.bH-this.buttonH*2,
										this.buttonW,this.buttonH,10)
					),0,1
				),
		//buy atack
		new Box(this.bW,100,this.bW,this.bH,
				new Color(RandomI(0,255),RandomI(0,255),RandomI(0,255)),
				new Array(
						new ShopButton(this.bW+this.bW-this.buttonW*2,
										100+this.bH-this.buttonH*2,
										this.buttonW,this.buttonH,BuyAtack),
						new Label(this.bW+this.buttonW,
										100+this.bH-this.buttonH*2,
										this.buttonW,this.buttonH,3)
					),0,0
				),
		//buy orb bonus
		new Box(this.bW*2,100,this.bW,this.bH,
				new Color(RandomI(0,255),RandomI(0,255),RandomI(0,255)),
				new Array(
						new ShopButton(this.bW*2+this.bW-this.buttonW*2,
										100+this.bH-this.buttonH*2,
										this.buttonW,this.buttonH,BuyOrbBonus),
						new Label(this.bW*2+this.buttonW,
										100+this.bH-this.buttonH*2,
										this.buttonW,this.buttonH,20)
					),1,0
				),

		new Box(0,100+this.bH,this.bW,this.bH,
				new Color(RandomI(0,255),RandomI(0,255),RandomI(0,255)),
				new Array(
						new ShopButton(0+this.bW-this.buttonW*2,
										100+this.bH*2-this.buttonH*2,
										this.buttonW,this.buttonH,BuyPotionSmall),
						new Label(0+this.buttonW,
										100+this.bH*2-this.buttonH*2,
										this.buttonW,this.buttonH,3)

					),1,2
				),
		new Box(this.bW,100+this.bH,this.bW,this.bH,
				new Color(RandomI(0,255),RandomI(0,255),RandomI(0,255)),
				new Array(
						new ShopButton(this.bW+this.bW-this.buttonW*2,
										100+this.bH*2-this.buttonH*2,
										this.buttonW,this.buttonH,BuyPotionMed),
						new Label(this.bW+this.buttonW,
										100+this.bH*2-this.buttonH*2,
										this.buttonW,this.buttonH,8)
					),0,2
				),
		new Box(this.bW*2,100+this.bH,this.bW,this.bH,
				new Color(RandomI(0,255),RandomI(0,255),RandomI(0,255)),
				new Array(
						new ShopButton(this.bW*2+this.bW-this.buttonW*2,
										100+this.bH*2-this.buttonH*2,
										this.buttonW,this.buttonH,BuyPotionBig),
						new Label(this.bW*2+this.buttonW,
										100+this.bH*2-this.buttonH*2,
										this.buttonW,this.buttonH,14)
					),1,1
				),
		
		
	]
};

ShopMenu.prototype.update = function() {

	if(c!=undefined)
	this.boxes[0].children[1].value = c.orbs;
	for(var i=0;i<this.boxes.length;i++)
		this.boxes[i].update();
};

ShopMenu.prototype.draw = function() {
	for(var i=0;i<this.boxes.length;i++)
		this.boxes[i].draw();
};