//create a class called GameState (data and values related to game)
//constructor
  //properties (variables)
    //shipDocked (ship is docked) - boolean
    //shipFull (ship is full) - boolean
    //turn/ round trackers



class GameState {
  constructor() {
    this.shipDocked = false;
    this.shipFull = false;
    this.playerTurn = 0;
    this.players = [];
  }

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
  createPlayer(){
    var colorArray = ['brown', 'black'];
    for (var i = 0; i < colorArray.length; i++){
      var player = new Player(colorArray[i], i+1);
      this.players[i] = player;
    }
  }

  loadShip(){//player action1
    //check if ship has empty space
    //if yes
      //increment ship counter
      //decrement blocks
      //set isTurn to false
    //if no
      //display message - no space in ship

    if(//ship is full){
      alert('Ship is already full, please choose another action.');
    }else{
      this.blockcount--;

      //fill space on ship
      //increment blocksOnShip,
      //assign color

      this.isTurn = false;
    }
 }

 //player action2  
 getBlocks() {

   var blocks = this.players[this.playerTurn].blockCount;

   if(blocks < 5){
    blocks += 3;
     if (blocks > 5) {
      blocks = 5;
     }
    this.updateTurn();

   }else{
     alert('Sled is already full, please choose another action.');
     return;
   }
 }

  sailShip() {//player action3
    //sailShip (moving the ship to the game board)
    //call GameState moveShip(this.color) method -- moves the ship
    //set isTurn to false

    if(//ship is docked){
      alert('Ship is already docked. Please pick another action.');
      return;
    }else if(//ship is not full){
      alert('Ship is not loaded, please pick another action.');
      return;
    }else{
      //call gameState move ship, pass player color through
      alert('Ship has sailed! Blocks unloaded. Starting a new round.')
    }    
    this.updateTurn();
  }

  //allocate points
  allocatePoints(){

  }
  //change turns
    //if the round is not over
      //move to the other player
  changeTurns(color) {

  }  
  
  //resetRound 
    //if the ship is docked
      //move from current player to other player
      //undock the ship
  resetRound() {

  }



  updateObeliskTotal () {

  }

  updateTurn() {
    if (this.playerTurn === 0) {
      this.playerTurn = 1;
    } else {
      this.playerTurn = 0;
    }
  }

}