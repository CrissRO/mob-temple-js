function Effect(lifetime,caster,skill,arguments)
	{
		this.lifetime = lifetime;
		if(caster == c)
		efTimer[nrEffects] = this.lifetime;
		else
		DumefTimer[nrDumEfects] = this.lifetime;
		//console.log(efTimer);
		this.args = [0,0,0,0,0,0,0,0,0,0];
		for(var i=0;i<arguments.length;i++)
		{
			this.args[i] = arguments[i];
		}
			
		this.update=function()
		{
			if(this.lifetime>0)
			{
				skill(this.args[0],
						this.args[1],
						this.args[2],
						this.args[3],
						this.args[4],
						this.args[5],
						this.args[6],
						this.args[7],
						this.args[8],
						this.args[9]);
						this.lifetime--;
						if(caster==c)
						caster.AnimationProgress = lifetime-this.lifetime;
			}
			

		
		if(this.lifetime<=0)
		{
			if(caster==c){
			caster.Targets=[];
			caster.AnimationProgress=0;
			}
			
		}
		}
	}