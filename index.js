const canvas = document.getElementById("canvas");
const planeImg = document.getElementById("image");
const popUp = document.getElementById("pop-up");
const playAgain = document.getElementById("btn");
const totalscore = document.getElementById("score");
const pen = canvas.getContext("2d");
var score = 0;

const plane = {
    h:50,
    w:70,
    x:100,
    y:150,
    speed:1,
    dx:0,
    dy:0
}
const wall = {
    width: 30,
    minHeight: 20,
    maxHeight: 230,
    gap: 100,
    x: 600,
    y: 0,
    dx: 0,
    dy: 0
}

var randomHeight =  Math.floor(Math.random()*(wall.maxHeight-wall.minHeight+1)+wall.minHeight);

function drawPlane(){
    pen.drawImage(planeImg,plane.x,plane.y,plane.w,plane.h);
}

function drawTopWall(){
    pen.fillRect(wall.x,wall.y,wall.width,randomHeight);
    pen.fillRect(wall.x,randomHeight+wall.gap,wall.width, canvas.height - randomHeight - wall.gap);
}

function newPosition(){
    plane.y += plane.dy;
    wall.x -= wall.dx;
    newWall();
    detectWalls();
}

function detectWalls(){
    if(plane.y + plane.h > canvas.height){
        plane.dy = 0;
    }else if(plane.y < 0){
        plane.dy = 1;
    }
}

function newWall(){
    if(randomHeight > plane.y && wall.x === (plane.x+plane.w)){
        wall.dx = 0;
        plane.dy = 0;
        popUp.style.display = "block";
        totalscore.textContent = score;
    }else if((randomHeight+wall.gap) < (plane.y+plane.h) && wall.x === (plane.x+plane.w)){
        wall.dx = 0;
        plane.dy = 0;
        popUp.style.display = "block";
        totalscore.textContent = score;
    }
    else if(wall.x < 0){
        wall.x = 600;
        randomHeight =  Math.floor(Math.random()*(wall.maxHeight-wall.minHeight+1)+wall.minHeight);
        score++;
    }
}

function update(){
    pen.clearRect(0,0,canvas.width,canvas.height);
    drawPlane();
    drawTopWall();
    newPosition();
    requestAnimationFrame(update);
}
update();

function moveUp(){
    plane.dy = -plane.speed;
}

document.addEventListener("keypress", function(e){
   moveUp();
   wall.dx = 2;
});

document.addEventListener("keyup", function(){
    plane.dy = plane.speed;
});

playAgain.addEventListener("click", function(){
    location.reload();
});