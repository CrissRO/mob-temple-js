Color=function(r,g,b,a)
{
	this.r=r;
	this.g=g;
	this.b=b;
	if(a!=undefined)
	this.a=a;
	else
	this.a=1;
}

Color.prototype.Get = function() {
	return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
};


Red = new Color(255,0,0,1);
Green = new Color(0,255,0,1);
Blue = new Color(0,0,255,1);
Black = new Color(0,0,0,1);
White= new Color(255,255,255,1);