//test
class Player{
  constructor (color) {
    this.score = null;
    this.obeliskTotal = 0;
    this.color = color;
    this.blockCount = 0;

    this.domElements = {};
    this.domElements.player; 
    this.domElements.obelisk;
    
  }
  markTurn(){
    this.domElements.player.addClass('currentTurn');
  }
  unmarkTurn(){
    this.domElements.player.removeClass('currentTurn');
  }
}

