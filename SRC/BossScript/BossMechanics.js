function BossLog(){console.log("Boss mechanic active!");}


	
	function TrackTarget(target)
	{
		var TargetObj = 
		{
			x:0,
			y:0,
		}
		if(TargetObj.x != undefined && TargetObj.y != undefined)
		{
			TargetObj.x = target.x;
			TargetObj.y = target.y;
		}
		else
		console.warn("target x or y undefined");

		return TargetObj;
	}


	function DrawLife(life,maxlife,x,y,w,h)
	{
		if(life>maxlife){life=maxlife;}
		percent = life*100/maxlife;
		ctx.fillStyle = "rgb(0,80,0)";
		ctx.fillRect(x,y,w,h);
		ctx.fillStyle = "rgb(0,153,0)";
		ctx.fillRect(x+1,y+2,percent*w/100,h-4);
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.font=15*WindowScale+"px Copperplate";
		ctx.fillText(Decimal(percent,1)+"%",x+w/2,y+h-h/4);
	}

