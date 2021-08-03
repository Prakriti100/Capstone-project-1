var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, runnerColided, runnerisRunning;

var racetrack,racetrackImg;

var hurdle, hurdleImg ;

var gameOverimg, gameOver;

var gameOverSound, JumpSound;

var score = 0;



function preload(){
runnerisRunning = loadAnimation("Sally_Running1.PNG","Sally_Running2.PNG","Sally_Running3.PNG");
runnerColided = loadImage("Sally_Collided.PNG");

racetrackImg = loadImage("racing track.jpg");

hurdleImg = loadImage("hurdle.png");

gameOverimg = loadImage("Game Over.jpg");




gameOverSound = loadSound("GameOverSound.wav");
JumpSound = loadSound("JumpSound.wav");


}

function setup() {

createCanvas(windowWidth, windowHeight);

runner = createSprite(70,150);
runner.addAnimation("SallyRunning",runnerisRunning);
runner.addAnimation("SallyCollided",runnerColided);
runner.scale = 0.5;

runner.setCollider("circle",0,0,runner.width,runner.height);

racetrack = createSprite(windowWidth, windowHeight);
racetrack.addImage("racetrack",racetrackImg);
racetrack.velocityX = -(10 + 3*score/100);


gameOver = createSprite(650,150);
gameOver.addImage(gameOverimg);


gameOver.scale = 0.5;
gameOver.visible = false;

hurdle = new Group();

score = 0; 
}

function draw() {
background(50)


textSize = 25;
fill(300);
text("Score:" + score,900,20);

if (gameState === PLAY){
 score = score + Math.round(getFrameRate()/60);
 racetrack.velocityX = -(10 + 3*score/100)

 if(keyDown("space")&& runner.y >= 160){
     runner.velocityY = -12;
 }
 runner.velocityY = runner.velocityY + 0.8;

 if (racetrack.x < 0){
     racetrack.x = racetrack.width/2;
 }
 
 runner.collide(racetrack);

 spawnObstacles();

 if(hurdle.isTouching(runner)){
     gameState = END;
 }
}

else if (gameState === END){
    gameOver.visible = true;
    text("Press Up to restart",100,50);
    textSize(25);

    racetrack.velocityX = 0;
    runner.velocityY = 0;
    hurdle.setVelocityXEach(0);

    runner.changeAnimation("Collided",runnerColided);

    hurdle.setLifetimeEach(-1);

    if(keyDown("Up")){
        reset();
    }
}

 drawSprites();
}

function spawnObstacles(){
    if(frameCount % 60 === 0);
    var hurdlesG = createSprite(600,120,40,10);
    hurdlesG.x = Math.round(random(80,120));
    hurdlesG.addImage(hurdleImg);

    hurdlesG.scale = 0.3;
    hurdlesG.velocityX = -(10 + 3*score/100);

    hurdlesG.lifetime = 200;

    hurdlesG.depth = runner.depth;
    runner.depth = runner.depth + 1;

    hurdle.add(hurdlesG);
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  hurdle.destroyEach();
  
  runner.changeAnimation("running",runnerImg);
  
 
  
  score = 0;
}