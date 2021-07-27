var dog,sadDog,happyDog, database;
var foodS=0,foodStock=0;
var addFood,feedDogBtn;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  feedDogBtn=createButton("FeedDog");
  feedDogBtn.position(650,95);
  feedDogBtn.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  console.log("the time is "+ hour())
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();

  if(food_stock_val <= 0){ 
    foodObj.updateFoodStock(food_stock_val *0); 
  }
  else{ 
    foodObj.updateFoodStock(food_stock_val -1);
  }

  //write code here to update food stock and last fed time
  database.ref('/').update({ 
    food:foodObj.getFoodStock(),
    Feedtime:hour()
   })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
