
class Player{
  constructor (color) {
    this.points = null;
    this.obeliskTotal = 0;
    this.color = color;
    this.blockCount = 0;

    this.domElements = {
      player: null,
      obelisk: null
    };
  }
  markTurn(){
    this.domElements.player.addClass('currentTurn');
  }
  unmarkTurn(){
    this.domElements.player.removeClass('currentTurn');
  }
}

