class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    
    this.phase = 1;
    this.count = 0;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  getBall() {
    database.ref("ball").on("value", function(data) {
      ball = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  updateBall(x,y) {
    database.ref("ball").update({
      'x': x,
      'y': y
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    goal=createSprite(width/2,height/2,600,200)
    p1 = createSprite(width / 2 - 50, height - 100);
    p1.addImage("striker", striker_img);
    p1.scale = 0.07;
    p2 = createSprite(width / 2 + 100, height/2 +50);
    p2.addImage("goli", goli_img);
    p2.scale = 0.5;
   
    p1.setCollider("rectangle",0,0,100,130);
    p2.setCollider("rectangle",0,0,200,300);
    p1.debug = true;
    p2.debug = true;

    ball=createSprite(width / 2 - 50, height - 150,30,30)
     
  }

  
  
  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      this.showLeaderBoard();

      //player1 is striker player2 is goalie
      if(this.phase == 1){
        //  p1.position.x = allPlayers['player1'].positionX;
        //  p1.position.y = allPlayers['player1'].positionY;

          p2.position.x = allPlayers['player2'].positionX;
          p2.position.y = allPlayers['player2'].positionY;
          
        if(player.index == 2){
          if (keyIsDown(LEFT_ARROW)) {
            player.positionX -= 5;
            player.update();
          }
      
          if (keyIsDown(RIGHT_ARROW)) { 
            player.positionX += 5;
            player.update();
          }
        }
       
        if(this.count == 5){
          this.phase = 2;
          this.count = 0;
        }
      }
      //player2 is striker player1 is goalie
      else {

      }
    } 
    drawSprites();
    
  }

 showLeaderBoard() {
  var leader1, leader2;
  var players = Object.values(allPlayers);
  leader1 = players[0].name + "&emsp;" + players[0].score;
  leader2 = players[1].name + "&emsp;" + players[1].score;
  this.leader1.html(leader1);
  this.leader2.html(leader2);
 } 
  

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  }

