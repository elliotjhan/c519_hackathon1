
class GameState {
  constructor() {
    this.shipDocked = false;
    this.shipFull = false;
    this.playerTurn = 0;
    this.players = [];
    this.round = 0;

    this.getBlocks = this.getBlocks.bind(this);
    this.sailShip = this.sailShip.bind(this);
    this.loadShip = this.loadShip.bind(this);
  }
 
  createPlayer(){
    var colorArray = ['brown', 'black'];
    for (var i = 0; i < colorArray.length; i++){
      var player = new Player(colorArray[i], i+1);
      this.players[i] = player;
    }
  }

  assignButtonHandlers(){
    $('#sail').on('click', this.sailShip);
    $('#load').on('click', this.loadShip);
    $('#get-block').on('click', this.getBlocks);

    for(var i = 0; i < this.players.length; i++){
      this.players[i].blockCount = 2 + i;
    }

  }

  loadShip(){
    
    if(this.shipFull) {
      alert('Ship is already full, please choose another action.');
    } else {
      this.players[this.playerTurn].blockCount -= 1;
      this.updateTurn();
      this.shipFull = true;
    }
 }

  getBlocks() {
   
    if (this.players[this.playerTurn].blockCount < 5) {
      this.players[this.playerTurn].blockCount += 3;

      if (this.players[this.playerTurn].blockCount > 5) {
        this.players[this.playerTurn].blockCount = 5;
      };

      this.updateTurn();

    } else {

      alert('Sled is already full, please choose another action.');
      return;
    }
  }

  sailShip() {
    
    if(this.shipDocked){
      alert('Ship is already docked. Please pick another action.');
      return;

    } else if (!this.shipFull) {
      alert('Ship is not loaded, please pick another action.');

      return;
    } else {
      alert('Ship has sailed! Blocks unloaded. Starting a new round.');
      this.updateTurn();

      console.log('this.players[this.playerTurn].obeliskTotal: ', this.players[this.playerTurn].obeliskTotal);

      this.players[this.playerTurn].obeliskTotal += 1;
      this.shipFull = false;
      this.shipDocked = true;
    }    

    console.log('this.players[this.playerTurn].obeliskTotal: ', this.players[this.playerTurn].obeliskTotal);
  }

  allocatePoints(){
    var p1Total = this.players[0].obeliskTotal;
    var p2Total = this.players[1].obeliskTotal;
  
    if(p1Total > p2Total) {
      this.players[0].score += 10;
      this.players[1].score += 1;
    } else {
      this.players[1].score += 10;
      this.players[0].score += 1;
    }
  }

  resetRound() {
    this.shipDocked = false;
    if(this.round === 6) {
      this.allocatePoints();
    }
  }

  updateTurn() {
    if (this.playerTurn === 0) {
      this.playerTurn = 1;

      $('.player-one').css({
        'background-color': 'red'
      });
      $('.player-two').css({
        'background-color': 'grey'
      })

    } else {
      this.playerTurn = 0;

      $('.player-two').css({
        'background-color': 'red'
      });
      $('.player-one').css({
        'background-color': 'grey'
      });
    }
  }

}

//create a class called GameState (data and values related to game)
//constructor
  //properties (variables)
    //shipDocked (ship is docked) - boolean
    //shipFull (ship is full) - boolean
    //turn/ round trackers

     //methods
  //moveship(color) method -- parameter of color from player.js
    //resetRound method
    //increase the obelisk total by one for that player
  // moveShip() {
  //   if(this.turn){
  //   this.resetRound();
  //   this.players[i]
  // }

  //createPlayer

   //player action1
    //check if ship has empty space
    //if yes
      //increment ship counter
      //decrement blocks
      //set isTurn to false
    //if no
      //display message - no space in ship
       //fill space on ship
      //increment blocksOnShip,
      //assign color
