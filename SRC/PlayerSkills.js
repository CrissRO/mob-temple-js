/*Speels*/
		/*Simple atack*/
	function Atack(caster)
	{
		if(Distance(caster.LastTarget.x,caster.x,caster.LastTarget.y,caster.y) < 120*WindowScale)//range)
		{
			projectiles.push(new Cut(caster.x,caster.y,caster.LastTarget.size,50,caster.angle-Math.PI/2,100,caster.LastTarget));
		}
	}

	/*Clap*/
	function ClapCast(caster)
	{
		projectiles.push(new Clap(caster.x,caster.y,0,0,0,100,caster.targetArray));			
	}
	/*Thunder atack*/
	function ThunderCast(caster)
	{
		var d = Distance(caster.LastTarget.x,caster.x,caster.LastTarget.y,caster.y);
		projectiles.push(new Thunder(caster.x,caster.y,50,10,caster.angle-Math.PI/2,100,d,caster.LastTarget,caster));

	}
	/*Drain Life*/
	function DrainLifeCast(caster)
	{
		projectiles.push(new DrainLife(caster.LastTarget.x,caster.LastTarget.y,50,5,0,0,caster.LastTarget,caster));
		


	}			
	/*Freeze*/
	function Freeze(caster)
	{
		projectiles.push(new FreezingStorm(Mouse.x,Mouse.y,50,0,0,100,caster.targetArray));			
	}
	/*Freeze Animation*/

	/*ShockWave Throw*/
	function ShockWaveThrow(caster)
	{
		projectiles.push(new ShockWave(caster.x,caster.y,50,10,caster.angle-Math.PI/2,100,caster.targetArray));
	}
	/*Meteorite Throw*/
	function MeteoriteThrow(caster)
	{

		var d = Distance(Mouse.x,caster.x,Mouse.y,caster.y);
		projectiles.push(new Meteorite(caster.x,caster.y,50,0,caster.angle-Math.PI/2,100,d,caster.targetArray));			
	
		
	}


	function HealFlagThrow(caster)
	{

		projectiles.push(new HealFlag(Mouse.x,Mouse.y,50,0,0,100,new Array(caster)));				
		
	}




	