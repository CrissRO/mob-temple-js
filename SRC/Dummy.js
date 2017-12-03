/*Dummy*/

	var Dummy = function(x,y,dx,dy,casttime,life,skill,argIndex,sprite,drawType)
	{
		console.log("new dummy");
		this.argIndex=argIndex;
		this.drawType=drawType;
		this.optArg =[];
		this.x=x;
		this.y=y;
		this.dx=dx;
		this.dy=dy;
		this.scale =10;
		this.angle;
		this.casttime = casttime;
		this.sprite = sprite;
		this.counter=0;
		this.life = life;
		this.maxlife = life;
		this.skill=skill;
		this.arg = [-999999,0,0,0,0,0,0,0,0,0];
		this.argsDeclared = false;
		this.declareArgs=function(arg)
		{
			for(var i=0;i<arg.length;i++)
		{
			this.arg[i] = arg[i];
			//console.log(arg[i]);
		}
		this.arg[i+1] = this;
		//verifies if it has valid arguments
		if(this.arg[0]!=-999999)
			this.argsDeclared=true;
		}
		
		this.refreshArgs=function()
		{
			if(typeof argsArray[this.argIndex] != 'undefined')
			{
				for(var i=0;i<argsArray[this.argIndex].length;i++)
				{
					this.arg[i] = argsArray[this.argIndex][i];
					//console.log(argsArray[argIndex][i]);
				}
				this.arg[i+1] = this;
			}
			
		}
		this.draw =function()
		{

		if(sprite!="null"&&sprite!=undefined)
		{

			if(this.drawType=="arc")
			{
				if(this.life>this.maxlife/2)
					this.scale+=2;
				else
					this.scale-=2;
			}
			if(this.drawType=="normal"){}
			ctx.beginPath();
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.angle+Math.PI/2);
			ctx.drawImage(this.sprite,-15-this.scale*WindowScale,-15-this.scale*WindowScale*WindowScale,(30+this.scale)*WindowScale,(30+this.scale)*WindowScale);
			ctx.restore();
			ctx.closePath();
		}
		
		}
		this.update=function()
		{
			if(this.argsDeclared)
			{
				
				this.refreshArgs();
				
				this.x+=this.dx;
				this.y+=this.dy;
				
				this.counter++;
				this.life--;
				if(this.counter>=this.casttime)
				{
					this.counter=0;
					if(this.skill!=null||this.argIndex!=null)
					this.skill(this.arg[0],this.arg[1],this.arg[2],this.arg[3],this.arg[4],this.arg[5],this.arg[6]);
					
					//console.log('cast');
				}
			}
			else
			{
			console.warn("Function arguments not declared")	;
			}	
		}
		
	}
