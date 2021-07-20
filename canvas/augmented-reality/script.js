var VIDEO=null;
var SIZE=500;
var CANVAS_A;
var CANVAS_PIANO;
var CANVAS_B;

var CANVAS_BG;
var CANVAS_HIT;

var BACKGROUND;
var DIFF_THRESHOLD=50;

var AUDIO_CONTEXT;
var MASTER_GAIN;
var ANALYSER;

function main(){
	//removeOverlay();
	
	CANVAS_A=initializeCanvas("canvasA",SIZE,SIZE);
	CANVAS_PIANO=initializeCanvas("canvasPiano",SIZE,SIZE);
	CANVAS_B=initializeCanvas("canvasB",SIZE,SIZE);
	
	CANVAS_HIT=initializeCanvas("canvasHitTest",SIZE,SIZE);
	CANVAS_BG=initializeCanvas("canvasBg",SIZE,SIZE);
	ButtonHandler.helperCanvas=CANVAS_HIT;
	
	ButtonHandler.createPianoKey(
		[SIZE*0.05,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"SI",{callback:playNote,freq:246});
	ButtonHandler.createPianoKey(
		[SIZE*0.15,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"DO",{callback:playNote,freq:261.626});
	ButtonHandler.createPianoKey(
		[SIZE*0.25,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"RE",{callback:playNote,freq:294.33});
	ButtonHandler.createPianoKey(
		[SIZE*0.35,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"MI",{callback:playNote,freq:327.03});
	ButtonHandler.createPianoKey(
		[SIZE*0.45,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"FA",{callback:playNote,freq:348.83});
	ButtonHandler.createPianoKey(
		[SIZE*0.55,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"SOL",{callback:playNote,freq:392.44});
	ButtonHandler.createPianoKey(
		[SIZE*0.65,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"LA",{callback:playNote,freq:436.04});
	ButtonHandler.createPianoKey(
		[SIZE*0.75,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"SI",{callback:playNote,freq:490.55});
	ButtonHandler.createPianoKey(
		[SIZE*0.85,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"DO",{callback:playNote,freq:523.25});
	ButtonHandler.createPianoKey(
		[SIZE*0.95,SIZE*0.1],0.1*SIZE,0.2*SIZE,
		"RE",{callback:playNote,freq:587});
	
	ButtonHandler.addButtonListeners(CANVAS_B);
	
	initializeCamera();
	var ctxA=CANVAS_A.getContext("2d");
	var ctxB=CANVAS_B.getContext("2d");
	var ctxPiano=CANVAS_PIANO.getContext("2d");
	var ctxBg=CANVAS_BG.getContext("2d");
	
	
	
	
	setInterval(function(){
		drawScene(ctxA,ctxPiano,ctxB,ctxBg);
	},33);  // 30 frames per second
}

function captureBackground(){
	BACKGROUND=CANVAS_A.getContext("2d").
	           getImageData(0,0,SIZE,SIZE);
}

function drawScene(ctxA,ctxPiano,ctxB,ctxBg){
	if(VIDEO!=null){
		var min=Math.min(VIDEO.videoWidth, VIDEO.videoHeight);
		var sx=(VIDEO.videoWidth-min)/2;
		var sy=(VIDEO.videoHeight-min)/2;
		ctxA.save();
		ctxA.scale(-1,1);
		ctxA.translate(-SIZE,0);
		ctxA.drawImage(VIDEO,sx,sy,min,min,
		                    0,0,SIZE,SIZE);
		ctxA.restore();
	}else{
		// show loading
	}
	
	ButtonHandler.drawButtons(ctxPiano);
	
	
	if(BACKGROUND!=null){
		var aImgData=ctxA.getImageData(0,0,SIZE,SIZE);
		var diff=getDifference(BACKGROUND,aImgData);
		ctxB.putImageData(diff,0,0);
		ButtonHandler.pixelHitTest(diff);
		
		ctxBg.putImageData(BACKGROUND,0,0);
	}else{
		
		ctxBg.clearRect(0,0,	
			  ctxBg.canvas.width,ctxBg.canvas.height);
		
		ctxBg.textAlign="center";
		ctxBg.beginPath();
		ctxBg.fillStyle="red";
		ctxBg.font=ctxBg.canvas.width*0.1+"px Arial";
		ctxBg.fillText("No Background",ctxBg.canvas.width/2,ctxBg.canvas.height*0.2);
		ctxBg.fillText("Detected",ctxBg.canvas.width/2,ctxBg.canvas.height*0.3);
		
		
		ctxBg.fillStyle="black";
		ctxBg.font=ctxBg.canvas.width*0.08+"px Arial";
		ctxBg.fillText("Click here first to",ctxBg.canvas.width/2,ctxBg.canvas.height*0.6);
		ctxBg.fillText("capture the background",ctxBg.canvas.width/2,ctxBg.canvas.height*0.7);
		ctxBg.fillText("then get in the screen!",ctxBg.canvas.width/2,ctxBg.canvas.height*0.8);
	}
}

function getDifference(aImgData,bImgData){
	for(var y=0;y<aImgData.height;y++){
		for(var x=0;x<aImgData.width;x++){
			var aPx=getPixelValue(aImgData.data,x,y);
			var bPx=getPixelValue(bImgData.data,x,y);
			if(euclDistance(aPx,bPx)<DIFF_THRESHOLD){
				// quite similar values
				bImgData.data[(y*aImgData.width+x)*4+3]=0
			}
		}
	}
	return bImgData;
}


// Many past functions
// None of them are used yet!


function euclDistance(A,B){
	var dist=0;
	for(var i=0;i<A.length;i++){
		dist+=(A[i]-B[i])*(A[i]-B[i]);
	}
	return Math.sqrt(dist);
}


function playNote(freq,duration=1){
	if(AUDIO_CONTEXT==null){
		AUDIO_CONTEXT=new (AudioContext || webkitAudioContext || window.webkitAudioContext)()
		ANALYSER=AUDIO_CONTEXT.createAnalyser();
		ANALYSER.fftSize=Math.pow(2,13);
		MASTER_GAIN=AUDIO_CONTEXT.createGain();
		MASTER_GAIN.connect(AUDIO_CONTEXT.destination);
		MASTER_GAIN.gain.setValueAtTime(0.2,AUDIO_CONTEXT.currentTime);
		MASTER_GAIN.connect(ANALYSER);
		
	}
	
	var osc=AUDIO_CONTEXT.createOscillator();
	var gainNode=AUDIO_CONTEXT.createGain();
	gainNode.gain.setValueAtTime(0,AUDIO_CONTEXT.currentTime);
	
	gainNode.gain.linearRampToValueAtTime(1,AUDIO_CONTEXT.currentTime+0.05);
	gainNode.gain.linearRampToValueAtTime(0,AUDIO_CONTEXT.currentTime+
		duration);
	
	osc.type="triangle";
	
	osc.frequency.value=freq;
	osc.start(AUDIO_CONTEXT.currentTime);
	// sound will stop in 1 seconds
	osc.stop(AUDIO_CONTEXT.currentTime+duration);
	
	osc.connect(gainNode);
	gainNode.connect(MASTER_GAIN);
}

function addEventListeners(canvas){
	canvas.addEventListener("mousedown",onMouseDown);
}

function onMouseDown(event){
	var loc=getMouseLocation(event);
	var ctx=event.target.getContext("2d");
	COLOR_KEY=getColorAtLocation(ctx,loc);
}

function getMouseLocation(event){
	var rect=event.target.getBoundingClientRect();
	return [
		SIZE*(event.clientX-rect.left)/(rect.right-rect.left),
		SIZE*(event.clientY-rect.top)/(rect.bottom-rect.top)
	];
}

function getColorAtLocation(ctx,location){
	var data=ctx.getImageData(
				location[0],location[1],1,1).data;
	//[r,g,b,a] // 4D data point
	return data;
}

function initializeCanvas(canvasName,width,height){
	let canvas = document.getElementById(canvasName);
	canvas.width=width;
	canvas.height=height;
	return canvas;
}

function initializeCamera(){
	var promise=navigator.mediaDevices.getUserMedia({video:true});
	promise.then(function(signal){
		VIDEO=document.createElement("video");
		VIDEO.srcObject=signal;
		VIDEO.play();
	}).catch(function(err){
		alert("Camera Error");
	});
}



function getAverageLocation(locations){
	var avg=[0,0];
	
	for(var i=0;i<locations.length;i++){
		avg[0]+=locations[i][0];
		avg[1]+=locations[i][1];
	}
	avg[0]/=locations.length;
	avg[1]/=locations.length;
	return avg;
}

function markPixelLocations(ctx,locations){
	var imgData=ctx.getImageData(0,0,SIZE,SIZE);
	for(var i=0;i<locations.length;i++){
		var x=locations[i][0];
		var y=locations[i][1];
		imgData.data[(y*SIZE+x)*4+0]=255;
		imgData.data[(y*SIZE+x)*4+1]=0;
		imgData.data[(y*SIZE+x)*4+2]=0;
		imgData.data[(y*SIZE+x)*4+3]=255;
	}
	ctx.putImageData(imgData,0,0);
}

function getLocationsOfPixelsWithColor(ctx,color){
	var locations=[];
	var imgData=ctx.getImageData(0,0,SIZE,SIZE);
	
	for(var y=0;y<imgData.height;y++){
		for(var x=0;x<imgData.width;x++){
			var px=getPixelValue(imgData.data,x,y);
			if(euclDistance(px,color)<THRESHOLD){
				locations.push([x,y]);
			}
		}
	}
	
	return locations;
}

function drawRGBColorSpace(colors, ctx){
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	
	// preparing canvas
	ctx.save();
	ctx.scale(0.7,0.7);
	ctx.translate(ctx.canvas.width*0.35,ctx.canvas.height*0.15);
	ctx.scale(ctx.canvas.width/255,-ctx.canvas.height/255);
	ctx.translate(0,-255);
	
	drawAxis(ctx,[0,255],"rgb(0,0,255)");
	drawAxis(ctx,[255,0],"red");
	drawAxis(ctx,zOffset,"rgb(0,255,0)");

	drawColorDataPoints(ctx,colors);
	drawColorKey(ctx,COLOR_KEY);
	
	ctx.restore();
	
	ctx.textAlign="right";
	ctx.textBaseline="top";
	ctx.fillStyle="black";
	ctx.beginPath();
	ctx.font=ctx.canvas.width*0.1+"px Arial";
	ctx.fillText("RGB",ctx.canvas.width,0);
}

function drawColorKey(ctx,color){
	var xySize=getXYSize(color);
	xySize.size*=3;
	ctx.strokeStyle="rgb("+color[0]+","+
		+color[1]+","+
		+color[2]+")";
		
	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.rect(xySize.x-xySize.size/2,xySize.y-		xySize.size/2, xySize.size,xySize.size);
	ctx.stroke();
}

function drawColorDataPoints(ctx,colors){
	ctx.lineWidth=1;
	
	// sort data points (farthest to nearest)
	colors.sort(function(a,b){
		return a[1]-b[1];
	});

	// draw data points
	for(var i=0;i<colors.length;i++){
			
		ctx.fillStyle="rgba(0,0,0,0.1)";
		
		
		if(euclDistance(colors[i],COLOR_KEY)<
			THRESHOLD){
			ctx.fillStyle="red";
		}
		
		var xySize=getXYSize(colors[i]);
	
		ctx.beginPath();
		ctx.rect(xySize.x-xySize.size/2,xySize.y-xySize.size/2,
				 xySize.size,xySize.size);
		ctx.fill();
		
	}	
}

function drawAxis(ctx,to,color){
	ctx.strokeStyle=color;
	ctx.lineWidth=5;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(to[0],to[1]);
	ctx.stroke();
}

function getXYSize(color){
	var x=color[0]; //red is index 0
	var y=color[2]; //blue is index 2
	
	x+=zOffset[0]*(color[1]/255); // green is index 1
	y+=zOffset[1]*(color[1]/255); // green is index 1
	
	var size=2+5*(color[1]/255);
	
	return {
		x:x,
		y:y,
		size:size
	}
}

function getColorsFrom(ctx){
	var colors=[];
	/*
	[
		[r,g,b,a], // <- feature vector
		[r,g,b,a],
		[r,g,b,a],
		[r,g,b,a],
		[r,g,b,a]
	]
	// r,g,b,a are between 0 and 255
	// all alphas (a) are 255
	*/
	
	var imgData=ctx.getImageData(0,0,SIZE,SIZE);
	
	for(var y=0;y<imgData.height;y++){
		for(var x=0;x<imgData.width;x++){
			var px=getPixelValue(imgData.data,x,y);
			colors.push(px);
		}	
	}
	
	
	return colors;
}

function getPixelValue(data,x,y){
	return[
		data[(y*SIZE+x)*4+0],
		data[(y*SIZE+x)*4+1],
		data[(y*SIZE+x)*4+2],
		data[(y*SIZE+x)*4+3],
	]
}

function removeOverlay(){
	let element = document.getElementById("overlay")
	element.style.display="none";
}


// BUTTON HANDLER


class ButtonHandler{
	static buttons=[];
	static helperCanvas;
	static mouse=[0,0];
	static debug=true;
	static canvas;
	static createButton(location,width,height,name,frequency,properties){
		if(properties==null){
			properties={
				strokeStyle:"black",
				defaultColor:"white",
				downColor:"red",
				hoverColor:"lightGray",
				frequency:frequency
			}
		}
		ButtonHandler.buttons.push(new Button(location,width,height,name,properties));
	}
	
	static pixelHitTest(diff){
		var hitPixels=[];
		for(var y=0;y<diff.height;y++){
			for(var x=0;x<diff.width;x++){
				var px=getPixelValue(diff.data,x,y);
				var alpha=diff.data[(y*diff.width+x)*4+3];
				if(alpha>0){
					hitPixels.push([x,y]);
				}
			}
		}
		
		var ctx=ButtonHandler.helperCanvas.getContext("2d");
		
		var imgData=ctx.getImageData(0,0,
					diff.width,diff.height);
		
		var hitColorKeys=[];
		for(var i=0;i<hitPixels.length;i++){
			var px=getPixelValue(imgData.data,hitPixels[i][0],hitPixels[i][1]);
			var color=formatPixelFromArray(px);
			//var color=getColor(ctx,hitPixels[i]);
			hitColorKeys[color]=true;
		}
		
		for(var i=0;i<ButtonHandler.buttons.length;i++){
			var btn=ButtonHandler.buttons[i];
			btn.wasDown=btn.down;
			btn.down=false;
			if(hitColorKeys[btn.color]==true){
				btn.down=true;
				if(!btn.wasDown){
					btn.properties.callback(
						btn.properties.freq
					);
				}
			}
		}
		
		markPixelLocations(ctx,hitPixels);
	}
	
	static createPianoKey(name,location,width,height,options){
		ButtonHandler.buttons.push(new PianoKeyButton(name,location,width,height,getRandomColor(),options));
	} 
	
	static addButtonListeners(canvas){
		ButtonHandler.canvas=canvas;
		canvas.addEventListener("mousemove",ButtonHandler.onMouseMove);
		canvas.addEventListener("mousedown",ButtonHandler.onMouseDown);
		canvas.addEventListener("mouseup",ButtonHandler.onMouseUp);
	}
	
	static drawButtons(ctx){
		for(let i=0;i<ButtonHandler.buttons.length;i++){
			ButtonHandler.buttons[i].draw(ctx);
		}
		let helperCtx=ButtonHandler.helperCanvas.getContext("2d");
		helperCtx.clearRect(0,0,helperCtx.canvas.width,helperCtx.canvas.height);
		for(let i=0;i<ButtonHandler.buttons.length;i++){
			ButtonHandler.buttons[i].drawHitArea(helperCtx);
		}
		
		if(ButtonHandler.debug){
			helperCtx.beginPath();
			helperCtx.lineWidth=SIZE*0.01;
			helperCtx.arc(...(ButtonHandler.mouse),SIZE*0.04,0,Math.PI*2);
			helperCtx.stroke();
		}
		
		helperCtx.font=(SIZE*0.12)+"px Arial";
		helperCtx.fillStyle="black";
		helperCtx.textBaseline="top";
		helperCtx.textAlign="center";
		helperCtx.fillText("Hit-test Canvas",SIZE*0.5,SIZE*0.35);

	}
	
	static onMouseMove(event){
		if(event!=null){
			ButtonHandler.mouse=getMouseLocation(event);
		}
		let ctx=ButtonHandler.helperCanvas.getContext("2d");
		let color=getColor(ctx,ButtonHandler.mouse);
		let result=ButtonHandler.handleButtonHover(color);
		if(result){
			ButtonHandler.canvas.style.cursor="pointer";
		}else{
			ButtonHandler.canvas.style.cursor="auto";
		}
		ctx=ButtonHandler.canvas.getContext("2d");
	}
	
	static onMouseDown(event){
		ButtonHandler.mouse=getMouseLocation(event);
		let ctx=ButtonHandler.helperCanvas.getContext("2d");
		let color=getColor(ctx,ButtonHandler.mouse);
		ButtonHandler.handleButtonDown(color);
		
		ctx=ButtonHandler.canvas.getContext("2d");
		
	}
	
	static onMouseUp(event){
		ButtonHandler.mouse=getMouseLocation(event);
		let ctx=ButtonHandler.helperCanvas.getContext("2d");
		let color=getColor(ctx,ButtonHandler.mouse);
		ButtonHandler.handleButtonUp(color);

		ctx=ButtonHandler.canvas.getContext("2d");
	}

	static handleButtonHover(color){
		let isOnTop=false;
		for(let i=0;i<ButtonHandler.buttons.length;i++){
			if(ButtonHandler.buttons[i].color==color){
				ButtonHandler.buttons[i].hover=true;
				isOnTop=true;
			}else{
				ButtonHandler.buttons[i].hover=false;
			}
		}
		return isOnTop;
	}

	static handleButtonDown(color){
		for(let i=0;i<ButtonHandler.buttons.length;i++){
			if(ButtonHandler.buttons[i].color==color){
				ButtonHandler.buttons[i].down=true;
				ButtonHandler.buttons[i].properties.callback(
					ButtonHandler.buttons[i].properties.freq
				);
			}else{
				ButtonHandler.buttons[i].down=false;
			}
		}
	}
	
	static handleButtonUp(color){
		for(let i=0;i<ButtonHandler.buttons.length;i++){
			ButtonHandler.buttons[i].down=false;
		}
	}
}

class Button{
	constructor(location,width,height,name,callback,properties){
		this.location=location;
		this.width=width;
		this.height=height;
		this.name=name;
		this.color=getRandomColor();
		this.hover=false;
		this.down=false;
		this.callback=callback;
		this.properties=properties;
	}
	
	draw(ctx){
		ctx.save();
		ctx.translate(...this.location);
		ctx.beginPath();
		ctx.strokeStyle=this.properties.strokeStyle;
		if(this.down==true){
			ctx.fillStyle=this.properties.downColor;
		}else{
			if(this.hover==false){
				ctx.fillStyle=this.properties.defaultColor;
			}else{
				ctx.fillStyle=this.properties.hoverColor;
			}
		}
		ctx.rect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.fill();
		ctx.stroke();
		ctx.font=(this.height*0.5)+"px Arial";
		ctx.fillStyle="black";
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		ctx.fillText(this.name,0,0);
		ctx.restore();
	}
	
	drawHitbox(ctx){
		ctx.save();
		ctx.translate(...this.location);
		ctx.beginPath();
		ctx.rect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.fillStyle=this.color;
		ctx.fill();
		ctx.restore();
	}
}


class PianoKeyButton extends Button{
	constructor(name,location,width,height,color,options){
		super(name,location,width,height,color,options);
	}
	draw(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle="black";
		ctx.lineWidth=3;
		ctx.fillStyle="white";
		if(this.hover){
			ctx.fillStyle="gray";
		}
		if(this.down){
			ctx.fillStyle="red";
		}
		ctx.translate(this.location[0],this.location[1]);
		//ctx.rect(-this.width/2,-this.height/2,this.width,this.height);
		ctx.moveTo(-this.width/2,-this.height/2);
		ctx.lineTo(-this.width/2,+this.height/2);
		ctx.arc(0,+this.height/2,this.width/2,0,Math.PI);
		ctx.lineTo(+this.width/2,+this.height/2);
		ctx.lineTo(+this.width/2,-this.height/2);
		ctx.closePath();
		
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.font=(this.width*0.5)+"px Arial";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillText(this.name,0,0);
		ctx.restore();
	}
	
	drawHitArea(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle=this.color;
		ctx.translate(this.location[0],this.location[1]);
		ctx.moveTo(-this.width/2,-this.height/2);
		ctx.lineTo(-this.width/2,+this.height/2);
		ctx.arc(0,+this.height/2,this.width/2,0,Math.PI);
		ctx.lineTo(+this.width/2,+this.height/2);
		ctx.lineTo(+this.width/2,-this.height/2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
}


function formatPixelFromArray(arr){
	return "rgb("+arr[0]+","+arr[1]+","+arr[2]+")";
}

function getRandomColor(){
	let red=Math.floor(Math.random()*255);
	let green=Math.floor(Math.random()*255);
	let blue=Math.floor(Math.random()*255);
	return "rgb("+red+","+green+","+blue+")";
}

function getColor(ctx,location){
	let data=ctx.getImageData(...location,1,1).data;
	return "rgb("+data[0]+","+data[1]+","+data[2]+")";
}