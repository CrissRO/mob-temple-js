

	var dummyAssets = 
				[
				document.getElementById("ShockWave"),
				document.getElementById("Meteorite"),
				document.getElementById("Boulder"),
				document.getElementById("HealFlag"),
				document.getElementById("WarHealFlag"),
				document.getElementById("VenomBomb"),
				]

	var WarriorIcons =[
				document.getElementById("SlayIcon"),
				document.getElementById("ShockWaveIcon"),
				document.getElementById("ClapIcon"),
				document.getElementById("HealTotemIcon")
				];
	var MageIcons =[
				document.getElementById("ThunderIcon"),
				document.getElementById("FireballIcon"),
				document.getElementById("FreezeIcon"),
				document.getElementById("DrainLifeIcon")
				];
	var icons =[
				WarriorIcons,
				MageIcons
				];
				
	var BasicItem = document.getElementById("BasicItem");

	var CharacterButtons =[
							document.getElementById("WarBtn"),
							document.getElementById("MageBtn"),
							];
	var ibox = document.getElementById("InfoBox");
	var bg = document.getElementById("Bg");
	var BreakBG = document.getElementById("BreakBG");
	var bgCM = document.getElementById("CharMenu");
	var MenuBG =document.getElementById("MenuBG");
	var DoorLeft = document.getElementById("DoorLeft");
	var DoorRight = document.getElementById("DoorRight");
	var Logo = document.getElementById("Logo");
	var RaffleCover = document.getElementById("RaffleCover");
	var RollBtn = document.getElementById("RollBtn");
	var CloseBtn = document.getElementById("CloseBtn");
	var RaffleBox = document.getElementById("RaffleBox");
	var Blades = document.getElementById("Blades");
	var CursorSps = document.getElementById("CursorSps");
	var ButtonSps = document.getElementById("ButtonSps");
	var BladeIconSps = document.getElementById("BladeIconSps");

	/*New Mob Sprites*/
	var MobSpriteSheet = new Image();
	MobSpriteSheet.src ="Images/Icons/MobsSpriteSheet.png"
	
	/*Buffs*/

	var BuffSpriteSheet = new Image();
	BuffSpriteSheet.src = "Images/BuffSpriteSheet.png";
	
	var ShopItemsSps = new Image();
	ShopItemsSps.src = "Images/ShopItems.png";

	/*Projectiles*/
	var ProjectileSpriteSheet = new Image();
	ProjectileSpriteSheet.src = "Images/ProjetileImages/ProjectileSpriteSheet.png";
	var ProjectileSpriteSheet2 = new Image();
	ProjectileSpriteSheet2.src = "Images/ProjetileImages/ProjectileSpriteSheet2.png";
	/*Boss Sprites*/

	var GorillaSps = document.getElementById("GorillaSps");
	var BerserkStances = document.getElementById("BerserkStances");
	var SpiderMotherSps = document.getElementById("SpiderMotherSps");
	var HydraBody = document.getElementById("HydraBody");
	var HydraHead = document.getElementById("HydraHead");