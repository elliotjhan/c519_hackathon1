// create a class called Player (data and values related to players)
// constructor 
  //properties (variables)
    //player score
    //obelisk total
    //color
    //blocks (number of pieces the player has at his or her disposal)
    //isTurn (if it is the player's turn it will be true) - boolean, intialized to false
    //bind the sailShip method

//methods
//loadTheShip 
  //check if ship has empty space
    //if yes
      //increment ship counter
      //decrement blocks
      //set isTurn to false
    //if no
      //display message - no space in ship

//getBlocks (user decides to get more blocks)
  //add three to blocks
  //call sled method

//sled (controls the blocks in the sled)
  //if blocks > 5
    //if yes, blocks = 5
  //set isTurn to false

//sailShip (moving the ship to the game board)
  //call GameState moveShip(this.color) method -- moves the ship
  //set isTurn to false

//

class Player{
  constructor (color, startPosition) {
    this.score = null;
    this.obeliskTotal = null;
    this.color = color;
    this.blockCount = null;
    this.isTurn = false; 
    
    //bind sail ship method
    this.loadShip = this.loadShip.bind(this);
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

  getBlocks() {//player action2
    
    if(this.blockCount < 5){

      this.blockCount += 3;

      if (this.blockCount > 5) {
        this.blockCount = 5;
      }

    }else{
      alert('Sled is already full, please choose another action.');
      return;
    }
    this.isTurn = false;
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

    this.isTurn = false;
  }

  sledControl() {//auxiliary function


  }

}

var black = new Player('black')