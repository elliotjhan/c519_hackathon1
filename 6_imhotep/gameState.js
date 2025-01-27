
class GameState {
  constructor() {
    this.shipDocked = false;
    this.shipFull = false;
    this.playerTurn = 0;
    this.players = [];
    this.round = 1;

    this.numberOfPlayers = null;
    this.colorArray = [];

    this.getBlocks = this.getBlocks.bind(this);
    this.sailShip = this.sailShip.bind(this);
    this.loadShip = this.loadShip.bind(this);
    this.resetState = this.resetState.bind(this);
    this.startGame = this.startGame.bind(this);
   
  }
 
  createPlayer(colorArray){
    
    
    for (var i = 0; i < colorArray.length; i++){
      var playerElement = $('#template').clone();
      var player = new Player(colorArray[i], i+1);
      this.players[i] = player;
     
      
      
      playerElement.css({
        'background-color': colorArray[i],
      })
      .addClass(`player player${i+1}`).removeClass('hidden').removeAttr('id', 'template').find('.sled').attr('id', `sled${i + 1}`);

      playerElement.find('.playerText').text('Player ' + (i+1));

      $('.stats').append(playerElement);

      var obeliskElement = $('#obbTemp').clone();
      obeliskElement.addClass(`stack${i + 1}`).removeAttr('id', 'obbTemp').removeClass('hidden').text('0');

      console.log(obeliskElement);
      $('.obelisk-board').append(obeliskElement);


    };
    $('.player1').addClass('redBorder');
  }

  assignButtonHandlers(){
    $('#sail').on('click', this.sailShip);
    $('#load').on('click', this.loadShip);
    $('#get-block').on('click', this.getBlocks);

    $('#game-reset').on('click', this.resetState);

    for(var i = 0; i < this.players.length; i++){
      
      this.players[i].blockCount = 2 + i;

      $(`#sled${i + 1}`).text(this.players[i].blockCount + '/5');
      console.log('player block count: ', this.players[i].blockCount + '/5');
      
    };
    
    
  }


  startGame(event){
    

    this.numberOfPlayers = $(event.currentTarget).text();

    console.log('startGame called');
    var numberOfPlayers = this.numberOfPlayers;
    
    $('#start-modal').css('display', 'none');

    switch (numberOfPlayers){
      case '2': this.colorArray = ['olive', 'darkorange'];
        break;
      case '3': this.colorArray = ['olive', 'darkorange', 'goldenrod'];
        break;
      case '4': this.colorArray = ['olive', 'darkorange', 'goldenrod', 'tan'];
        break;
    }

    this.createPlayer(this.colorArray);
    this.assignButtonHandlers();
  }

  loadShip(){
    if(this.shipFull) {
      alert('Ship is already full, please choose another action.');
    } else {
      this.players[this.playerTurn].blockCount -= 1;
      $('.block-space').text('1/1');

      console.log('before')
      console.log(`#sled${this.playerTurn + 1}`)
      console.log(`${this.players[this.playerTurn].blockCount}/5`)

      $(`#sled${this.playerTurn + 1}`).text(`${this.players[this.playerTurn].blockCount}/5`);

      console.log('after')
      console.log(`#sled${this.playerTurn + 1}`)
      console.log(`${this.players[this.playerTurn].blockCount}/5`)

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

      $(`#sled${this.playerTurn + 1}`).text(`${this.players[this.playerTurn].blockCount}/5`);
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
      this.players[this.playerTurn].obeliskTotal += 1;
      this.shipFull = false;
      this.shipDocked = true;
      this.resetRound();
      $('.block-space').text('0/1');
    }    

    $('.stack-one').text(this.players[0].obeliskTotal);
    $('.stack-two').text(this.players[1].obeliskTotal);

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
      //this.playerTurn = 1;
      $('.player1').removeClass('redBorder');
      $('.player2').addClass('redBorder');

    } 
    if (this.playerTurn === 1) {
      //this.playerTurn = 2;
      $('.player2').removeClass('redBorder');
      if(this.playerTurn === this.players.length -1) {
        $('.player1').addClass('redBorder');
      } else {
        $('.player3').addClass('redBorder');
      }
    } 
    if (this.playerTurn === 2) {
      //this.playerTurn = 3;
      $('.player3').removeClass('redBorder');
      if(this.playerTurn === this.players.length -1) {
        $('.player1').addClass('redBorder');
      } else {
        $('.player4').addClass('redBorder');
      }

    } if (this.playerTurn === 3) {
      //this.playerTurn = 0;
      $('.player4').removeClass('redBorder');
      $('.player1').addClass('redBorder');
    }
    
    if(this.playerTurn === this.players.length - 1 ) {
      this.playerTurn = 0;
    } else {
      this.playerTurn++
    }
}  
  resetState() {
    this.shipDocked = false;
    this.shipFull = false;
    this.playerTurn = 0;
    this.round = 1;

    $('.round-tracker').text(this.round);
    $('.score-one').text('0');
    $('.score-two').text('0');
    $('.stack-one').text('0');
    $('.stack-two').text('0');
    $('.block-space').text('0/1');

    for(var i = 0; i < this.players.length; i++){
      this.players[i].score = null;
      this.players[i].obeliskTotal = 0;
      this.players[i].blockCount = null;
    };
  }

  displayBlocks(){ 
    $('.sled-one').text(this.players[0].blockCount + '/5');
    $('.sled-two').text(this.players[1].blockCount + '/5');
  }
}
