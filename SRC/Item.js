var Item = 
{
	damageBase:150,
	level:0,
	spriteIndex:2,
	description:"Basic Item \n No PowerUps",
	
	crit:0,
	lifeSteal:0,
	luck:0,
	lifeRegen:0,
	
	cooldownRed:0,
	


	upgradeDamage:function()
	{
		return this.level * this.damageBase* 20/100 + this.damageBase;
	},

	addDamage:function()
	{
		var damage;
		var variation = this.upgradeDamage()* 10/100;
		damage = Random(this.upgradeDamage()-variation,this.upgradeDamage()+variation);
		console.log(damage);
		return damage;
	},
}