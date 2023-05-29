let points =[[1, -3], [5, -4], [4, -3],[9,1],[7,2],[8,5],[5,4],[5,5],[3,4],[4,9],[2,7],[0,10],[-2,7],[-4,8],[-3,3],[-5,6],[-5,4],[-8,5],[-7,2],[-9,1],[-4,-3],[-5,-4],[0,-3],[2,-7],[2,-6],[1,-3]];

var stroke_colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
var fill_colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
// 類別
class odj{ 
  constructor(args){ //設定基本資料
   this.p = args.p || {x:random(width),y:random(height)} //物件位置
   this.v = {x:random(-1,1),y:random(-1,1)} //移動速度由亂數產生
   this.size = random(5,10) // 放大倍率
   this.stroke = random(stroke_colors)
   this.color = random(fill_colors)
  }
  draw() //把物件畫出來
  {
    push() //重新設定
    translate(this.p.x,this.p.y)
    scale((this.v.x<0?1:-1),-1) 
    fill(this.color)
    stroke(this.stroke)
    strokeWeight(3)
    beginShape()
     for(var i = 0;i<points.length;i++){
       //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
       vertex(points[i][0]*this.size,points[i][1]*this.size)
      }
     endShape(close)
    pop()
  }
  update(){ 
    this.p.x = this.p.x + this.v.x 
    this.p.y = this.p.y + this.v.y
    
    if(this.p.x<=0 || this.p.x>=width) 
    {
      this.v.x = -this.v.x
    }
    if(this.p.y<=0 || this.p.y>=width) 
    {
      this.v.y = -this.v.y
    }
  }
  isBallInRanger(){ 
    let d = dist(mouseX,mouseY,this.p.x,this.p.y) 
    if(d<this.size*15){ 
      return true 
    }else{
      return false 
    }
  }

}


var ball //單一物件
var balls =[] //放物件資料

function setup() { //設定倉庫內資料
  createCanvas(windowWidth,windowHeight);
  for(j=0;j<30;j++) //產生物件
  {
    ball = new odj({}) 
    balls.push(ball) //放入balls
  }
}

function draw() { 
  background(220);
  

  for(let ball of balls){
    ball.draw()
    ball.update()
  }
}


function mousePressed(){
  for(let ball of balls){
    if(ball.isBallInRanger()){
     
      balls.splice(balls.indexOf(ball),1) 
    }
  }

}