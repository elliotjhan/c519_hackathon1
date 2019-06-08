
class Player{
  constructor (color) {
    this.score = null;
    this.obeliskTotal = 0;
    this.color = color;
    this.blockCount = 0;
    this.domElement;
  }
  markTurn(){
    this.domElement.addClass('currentTurn');
  }
  unmarkTurn(){
    this.domElement.removeClass('currentTurn');
  }
}

//this .domElement
