 var PLAY = 1;
 var END = 0;
 var gameState = 1;
var score
var sword;
var enemyGroup;
var fruitGroup


function preload()
{
  swordimage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
   fruit2 = loadImage("fruit2.png");
   fruit3 = loadImage("fruit3.png");
   fruit4 = loadImage("fruit4.png");
  monsteri = loadAnimation("alien1.png","alien2.png");
  gameo = loadImage("gameover.png");
  knifesound = loadSound("knifeSwooshSound.mp3");
 gameover = loadSound("gameover.mp3");
}

function setup()
{
  createCanvas = (600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordimage);
  sword.scale = 0.55
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  sword.setCollider("rectangle",18,-15,40,90,38)
  //sword.debug = true;
}


function draw()
{
  background ("lightblue");
  
  if (gameState === PLAY)
    {
  
  
  Fruits();
  Enemy();
      sword.x = World.mouseX;
      sword.y = World.mouseY;
      
      if(sword.isTouching(fruitGroup)){
        fruitGroup.destroyEach();
        score = score +2;
       knifesound.play();
      }
      if(sword.isTouching(enemyGroup)){
        gameState = END;
        gameover.play();
      }
    }
  
  if (gameState === END)
    {
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
       enemyGroup.velocityX = 0;
      fruitGroup.velocityX = 0;
      sword.addImage(gameo);
      sword.scale = 1
      sword.x = 200;
      sword.y = 200;
     
    }
  
  
  
  
  drawSprites();
  
  text("Score: "+score,300,30);
}


function Fruits()
{
  if(World.frameCount%80===0)
    {
      fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      r = Math.round(random(1,4));
      if (r == 1){
        fruit.addImage(fruit1);
      }
       else if  (r == 2){
        fruit.addImage(fruit2);
      }
       else if (r == 3){
        fruit.addImage(fruit3);
      }
      else if (r == 4){
        fruit.addImage(fruit4);
      }
      
      fruit.y =Math.round(random(50,340));
            
      fruit.velocityX = -(7+(score/4));
      fruit.lifetime = 60;
      fruitGroup.add(fruit);
      
    }
}

 function Enemy()
{
  if(World.frameCount%200===0)
  {
    monster=createSprite(400,200,20,20);
    monster.addAnimation("move",monsteri);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.lifetime=50;
    
    enemyGroup.add(monster);
  }
  
  
}
