var monkey, monkey_running, invisibleGround, backG, backG_image, banana_image, bananaGroup, obstacle_image, obstacleGroup, score;

var gameState;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  backG_image = loadImage("jungle.jpg");
  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("stone.png");
  score = 0; 
  gameState = 2;
}

function setup() {
  createCanvas(600, 400);
  backG = createSprite(0,100,20,20);
  backG.addImage("moving", backG_image);
  backG.x = backG.width/2;
  monkey = createSprite(50,350);
  invisibleGround = createSprite(200,385,400,5);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score, 500, 50);
  
  if (gameState > 0) {
    
    if(keyDown("space") && monkey.y>320) {
      monkey.velocityY = -20;    
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    backG.velocityX = -9;  
    if(backG.x < 100) {
      backG.x = backG.width/2;
    }
 
    spawnBanana();
    spawnObstacles();
  
    if (bananaGroup.isTouching(monkey)) {
        score = score + 2;
        bananaGroup.destroyEach();
    }
  
    switch (score) {
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;    
      case 30: monkey.scale = 0.16;
        break; 
      case 40: monkey.scale = 0.18;
        break; 
      case 50: monkey.scale = 0.20;
        break; 
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey) && gameState > 0) {
      monkey.scale = 0.10;
      score = 0;
      gameState = gameState -1;
      obstacleGroup.destroyEach();
    }
  }
  
  else if (gameState == 0) {
    //set velcity of each game object to 0
    backG.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1); 

    textSize(24);
    textAlign(CENTER);
    text("Game Over", 300, 180);
    text("press 'r' to restart", 300, 220);
  }
   
  if(keyDown("r") && gameState == 0) {
    reset();
  }
    
  monkey.collide(invisibleGround);
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,350,40,40);
    obstacle.velocityX = -9;
    obstacle.addImage(obstacle_image);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  //write code here to spawn the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(banana_image);
    banana.scale = 0.1;
    banana.velocityX = -9;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }  
}

function reset() {
  gameState = 2;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
}