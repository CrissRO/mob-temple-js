function Log(){console.log("button clicked!");}

function SelectWar(){PlayerClass="Warrior";CurrentScene="Game";CharacterSelected=true;Mouse.hMod=1;}
function SelectMage(){PlayerClass="Mage";CurrentScene="Game";CharacterSelected=true;Mouse.hMod=2;}


function RaffleSelect(){console.log("Raffle Selected!");CurrentMenuItem = "Raffle";}
function CloseMenu(){console.log("Close Menu!");CurrentScene = "Game";}
