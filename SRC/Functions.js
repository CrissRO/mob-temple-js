	/*DrawEllipse*/
	fill = function(r,g,b,a)
	{
	ctx.fillStyle="rgba("+r+","+g+","+b+","+a+")";
	}

	Rect= function(x,y,w,h)
	{
	ctx.fillRect(x,y,w,h);
	}
	function Ellipse(x,y,w,h)
	{
		ctx.beginPath();
		ctx.moveTo(x,y-h/2);
		ctx.bezierCurveTo(
		x+w/2,y-h/2,
		x+w/2,y+h/2,
		x,y+h/2
		);
		ctx.bezierCurveTo(
		x-w/2,y+h/2,
		x-w/2,y-h/2,
		x,y-h/2
		);
		ctx.closePath();
	}
	/*Draw Line Between Two Points*/

	function Connect(object1,object2)
	{
		ctx.beginPath();
		ctx.strokeStyle="#FF0000";
		ctx.moveTo(object1.x,object1.y);
		ctx.lineTo(object2.x,object2.y);
		ctx.stroke();
		ctx.strokeStyle="#000000";
		ctx.closePath();
	}


	/*Calculate distance between 2 points*/
	function Distance(ax,bx,ay,by)
	{
		//console.log(Math.sqrt((Math.pow(ax-bx,2) + Math.pow(ay-by,2))));
		return Math.sqrt((Math.pow(ax-bx,2) + Math.pow(ay-by,2)));
	}

	/*Get Random between x,y*/
	function Random(min,max)
	{
		//console.log(Math.random()*(max-min)+min);
		return Math.random()*(max-min)+min;
	}
	/*Random int between x,y*/
	function RandomI(min,max)
	{
		//console.log(Math.random()*(max-min)+min);
		return parseInt(Math.random()*(max-min)+min);
	}
	/*Calculate angle from obkject to mouse*/

	function CalculateSlope(object1,object2)
	{
		var ca,co,angle;
		ca = object1.x-object2.x;
		co = object1.y-object2.y;
		//console.log(Math.atan2(co,ca)/Math.PI*180);
		angle =Math.atan2(co,ca);
		return angle;
	}

	Decimal=function(float,nrDecimals)
	{
		pi = parseInt(float);
		pz = float-pi;
		pi+=parseInt(pz*Math.pow(10,nrDecimals))/Math.pow(10,nrDecimals);
		return pi;
	}
	
	map=function(x,xmin,xmax,ymin,ymax)
	{
	return ymin+(((((x-xmin)*100)/(xmax-xmin))*(ymax-ymin))/100);
	}

	delay = function(time)
	{
		
		var sTime = Date.now();
		while((Date.now()-sTime)/1000<time)
		{
			
		}
		
	}





	ShiftElements = function(_Array,start)
	{

		for(var i = _Array.length;i>=start;i--)
		{
			_Array[i+1] = _Array[i];
		}

		_Array.splice(_Array.length-1,1);

		return _Array;

	}
	//console.log(ShiftElements(Points,1));
	

	AddObjInOrder = function(_Array,Obj,VName)
	{
		
		if(Obj!=undefined)
		{
			if(_Array.length!=0)
			{
				if(_Array[0][VName]<=Obj[VName])
				{
					if(_Array.length>3)
					{
						var shifted = false;
						for(var i=1;i<_Array.length-1;i++)
						{
							if(Obj[VName]>=_Array[i-1][VName] && Obj[VName]<_Array[i+1][VName] &&!shifted)
							{
								ShiftElements(_Array,i)[i] = Obj;
								shifted = true;
							}
						}
					}
					else
					{ 	var i = 0;
						console.log(Obj[VName]);
						while(Obj[VName] > _Array[i][VName])
						{i++;console.log(i);}
						ShiftElements(_Array,i)[i] = Obj;
						
					}
					
				}
				else
				{
					
					ShiftElements(_Array,0)[0] = Obj;
				}	
			}
			else
			{
				_Array[0] = Obj;

			}	
		}
		else
	//	console.log(Obj);

		return _Array;

	}

/*
	for(var i= 0;i<Points.length;i++)
	{
		AddObjInOrder(PointsX,Points[i],Points[i].x,"x");
	}
	console.log(PointsX);
*/

	CheckPoint = function(x,y,PointArray)
	{
	
	}

	//CheckPoint(100,100, Points);

	//text wrapper

	function Text(ctx,text,x,y,maxWidth,lineHeight)
	{
	var wordsArray = text.split(' ');
	var line =' ';
		ctx.beginPath();
		for(var i=0;i<wordsArray.length;i++)
		{
			var testLine = line + wordsArray[i]+' ';
			var metric = ctx.measureText(testLine);
			var testWidth = metric.width;
			//daca nu incape pe rand...
			if(testWidth>maxWidth && i>0 || wordsArray[i] == "\n")
			{
				//scrie liia precedenta

				ctx.fillText(line,x,y);

				line = wordsArray[i] + ' ';
				//creste coord randului
				y+=lineHeight;
			}
			else{
				//daca incape pe rand sau chair mai are loc 
				//folosim linia de test care urmeaza sa fie marita
				line=testLine;
			}
			
		}
		ctx.fillText(line,x,y);
		ctx.closePath();
	}

	function ObjInArray(array,value)
	{
		for(var i=0;i<array.length;i++)
			if(array[i] instanceof value)
				return true;

		return false;
	}