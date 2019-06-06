
class GameState {
  constructor() {
    this.shipDocked = false;
    this.shipFull = false;
    this.playerTurn = 0;
    this.players = [];
    this.round = 1;

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
      $('.block-space').text('1/1');
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
      this.resetRound();
      $('.block-space').text('0/1');
    }    

    console.log('this.players[this.playerTurn].obeliskTotal: ', this.players[this.playerTurn].obeliskTotal);
    $('.stack-one').text(this.players[0].obeliskTotal);
    $('.stack-two').text(this.players[1].obeliskTotal);
    console.log('round', this.round);
  }

  allocatePoints(){
    var p1Total = this.players[0].obeliskTotal;
    var p2Total = this.players[1].obeliskTotal;
    if(p1Total > p2Total) {
      this.players[0].score += 10;
      this.players[1].score += 1;
    } else if (p1Total < p2Total){
      this.players[1].score += 10;
      this.players[0].score += 1;
    } else {
      this.players[1].score += 5;
      this.players[0].score += 5;
    }
    $('.round-tracker').text(this.round);
    $('.score-one').text(this.players[0].score);
    $('.score-two').text(this.players[1].score);
  }

  resetRound() {
    $('.stack-one').text('0');
    $('.stack-two').text('0');
    this.round++;
    this.shipDocked = false;
    if(this.round > 6) {
      this.allocatePoints();
      this.round = 1;
    }
    $('.round-tracker').text(this.round);
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
  
  resetState() {

  }
}
