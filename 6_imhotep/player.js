
class Player{
  constructor (color, startPosition) {
    this.score = null;
    this.obeliskTotal = null;
    this.color = color;
    this.blockCount = null;
  }
}


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
