var ball;
var DataBase;

function preload(){
bgImg=loadImage('Bg.jfif')
BoyImg=loadImage('Boy.png')
}
function setup(){
    createCanvas(500,500);
    ball = createSprite(50,50,10,10);
    ball.shapeColor = "red";
    DataBase=firebase.database()
    var Dref=DataBase.ref('BallPosition')
    Dref.on("value",readData)
    ball.addImage(BoyImg)
    ball.scale=0.25;
}

function draw(){
    background(bgImg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
DataBase.ref("BallPosition").update({
    X:ball.x +x,Y:ball.y +y
})
}
function readData(data){
    var position=data.val();
    console.log(position);
    ball.x=position.X;
    ball.y=position.Y;
}
