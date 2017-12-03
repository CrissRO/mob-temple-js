var InfoBox = function(size,content)
	{
		this.size = size*WindowScale;	
		this.selected = false;
		this.visibile = true;
		this.content = content;
		this.fontSize = 13*WindowScale;
		this.canFade = false;
		this.fadeCounter= 0.3;

		this.x;
		this.y;


		this.draw = function()
		{
			if(Mouse.x<(800*WindowScale)/2)
			this.x = Mouse.x;
			else
			this.x = Mouse.x-this.size;
		
			this.y = Mouse.y-this.size;

			//console.log(this.contentLines);
			ctx.beginPath();
			ctx.globalAlpha =this.fadeCounter;
			ctx.drawImage(ibox,this.x,this.y,this.size,this.size);
			ctx.globalAlpha =1;
			ctx.closePath();		

			ctx.beginPath();
			ctx.font=this.fontSize+"px Copperplate";
			ctx.fillStyle = "rgba(255,255,255,0.8)";
			Text(ctx,this.content,this.x+ this.fontSize,this.y + this.fontSize*2,this.size- this.fontSize*2,this.fontSize);
			ctx.closePath();	



		}
		this.update =function()
		{


			if(this.visibile)
			{this.draw();}

			if(this.canFade)
			{
				if(this.fadeCounter<1)this.fadeCounter+=0.05;
			}
			else
			{
					this.fadeCounter = 0.3;
					
			}
		
	}
	}