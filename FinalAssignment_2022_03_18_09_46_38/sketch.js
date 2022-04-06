let segments; 

//Classe orig..thirds
/*= [
   {"startTime": 0, "stopTime": 5, "color": "red"},
   {"startTime": 5, "stopTime": 10, "color": "blue"},
   {"startTime": 10, "stopTime": 15, "color": "yellow"}
]*/
 
 
class ColorWheel{
   
  constructor(segments /*,w,h*/){
    this.segments = segments;
    //this.width = w;
    //this.height = h;
    //this.posx = width/2;    //}mouseinputs in arcBuilder
    //this.posy = height/2;
    this.angle = 2*PI;
  }
  
  drawSegment(index, color){  
    fill(color);
    noStroke();
    arc(mouseX, mouseY, mouseY, mouseY/3, (this.angle/this.segments.length)*index, ((this.angle/ this.segments.length)+((this.angle/ this.segments.length)*index)));
  }
  
  
//Segmentcolour in connection to the time 
  
  update(time){
    for(let i = 0; i < this.segments.length; i++) {
      if(this.segments[i].startTime <= time && this.segments[i].stopTime > time){
        this.drawSegment(i, color(this.segments[i].color));
      }
    }
  }
  
}


//global variables for later use
let colorWheel;
let maxTime = 0;
let data;

//JSON values
function preload(){
    data = loadJSON("segments.json");
}

function setup() {
  createCanvas(400, 400);
  segments = data.segments; 
  colorWheel = new ColorWheel(segments /*,width/4, height/4*/);
    
  //print(segments)

//Flexibility in changing time values; colour changes w time
  
  for(let i = 0; i < segments.length; i++) {
    if(segments[i].stopTime > maxTime){
       maxTime = segments[i].stopTime;
    }
  } 
}



function draw() {
  background(0,0,0,20);
  //frameRate(1);
  let t = frameCount % maxTime;
  
  colorWheel.update(t);
  
  
}