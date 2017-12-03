/*Spawn Certain Mob*/			

function CreateMob(cons)
{
	switch(cons)
	{
		case Baboo:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							50,1,c,MobSpriteSheet,30));	
		break;

		case ArmoredBaboo:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							50,1,c,MobSpriteSheet,38));	
		break;

		case WarriorBaboo:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							75,1,c,MobSpriteSheet,45,mobs));	
		break;
		case ChampionBaboo:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							85,1,c,MobSpriteSheet,45,mobs));	
		break;

		case Spider:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							60,1,c,MobSpriteSheet,30));	
		break;
		case SpiderThreader:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							45,1,c,MobSpriteSheet,30));	
		break;
		case SpiderChemist:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							65,1,c,MobSpriteSheet,30));	
		break;
		case SpiderDeathfang:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							60,1,c,MobSpriteSheet,30));	
		break;

		case Lizzard:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							55,1,c,MobSpriteSheet,38));	
		break;
		case Basilisk:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							75,1,c,MobSpriteSheet,38));	
		break;
		case BasiliskFighter:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							85,1,c,MobSpriteSheet,38));	
		break;
		case BasiliskComander:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							100,1,c,MobSpriteSheet,38));	
		break;

		case Bird:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							50,3,c,MobSpriteSheet,38));	
		break;

		case FireBird:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							60,3,c,MobSpriteSheet,38));	
		break;
		case Harpy:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							70,1.5,c,MobSpriteSheet,38));	
		break;
		case HarpyMage:
		mobs.push(new cons(RandomI(CanvasObj.limitX1,CanvasObj.limitX2),
							RandomI(CanvasObj.limitY1,CanvasObj.limitY2),
							85,1.5,c,MobSpriteSheet,38));	
		break;
	}

}

function CreateArray(array)
{
	for(var i=0;i<array.length;i++)
		CreateMob(array[i]);

}
function MobSpawner(x,y,interval)
	{
		this.x=x;
		this.y=y;
		this.interval=interval*60;
		this.counter=0;
		this.WaveIndex = 0;
		this.list = WaveList[this.WaveIndex];
		this.state = 'active';
		this.ListCounter =0;
		this.endedRound = false;
		this.update=function()
		{
			if(this.state=='active')
			{
				if(this.list.length>0)
				{
					this.counter++;
					if(this.counter>=this.interval)
					{
						CreateMob(this.list[0])
						console.log(this.list);
						this.counter=0;
						this.list.splice(0,1);
						if(this.list.length<=0)
							this.endedRound=true;
					}
				}
				else
				{
					if(WaveList[this.WaveIndex+1]!=undefined&&this.endedRound)
					{
						console.log("nu mai este active");
					this.endedRound=false;
					this.state="inactive";
					this.list = WaveList[++this.WaveIndex];
					this.ListCounter=0;	
					}
					
					
					
				}
			}
			
		}
	}