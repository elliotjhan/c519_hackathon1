
class GameState {
  constructor() {
    this.getBlocks = this.getBlocks.bind(this);
    this.sailShip = this.sailShip.bind(this);
    this.loadShip = this.loadShip.bind(this);
    this.resetState = this.resetState.bind(this);
    this.startGame = this.startGame.bind(this);
    this.instructions = this.instructions.bind(this);
   
    this.shipDocked = false;
    this.shipFull = [];
    this.playerTurn = 0;
    this.players = [];
    this.round = 1; 
    //we should be able to get rid of numberOfPlayers and colorArray
    this.numberOfPlayers = null;
    this.colorArray = [];
  }
 
  createPlayer(colorArray){
     
    for (var i = 0; i < colorArray.length; i++){
      var playerElement = $('#template').clone();
      var player = new Player(colorArray[i]);
      this.players[i] = player;
     
      playerElement.css({
        'background-color': colorArray[i],
      })

      .addClass(`player player${i}`).removeClass('hidden').removeAttr('id', 'template').find('.sled').attr('id', `sled${i + 1}`);

      playerElement.find('.playerText').text('Player ' + (i+1));

      // //addition
      // playerElement.addClass(colrArray[i]+'-block');

      $('.stats').append(playerElement);

      var obeliskElement = $('#obbTemp').clone();
      obeliskElement.addClass(`stack${i + 1}`).addClass(`prime0 obelisk${i}`).removeAttr('id', 'obbTemp').removeClass('hidden').text('0');

      $('.obelisk-board').append(obeliskElement);

      var scoreBoxElement = $('#scoreTemp').clone();
      scoreBoxElement.addClass(`player${i}`).removeAttr('id', 'scoreTemp').removeClass('hidden');

      $('.score-sub').append(scoreBoxElement);

      this.players[i].domElements.scoreBox = scoreBoxElement;
      this.players[i].domElements.player = playerElement;//storing player dom element inside the player object for recall later
      this.players[i].domElements.obelisk = obeliskElement;//storing obelisk dom element inside the player object for recall later
    }
    this.markCurrentPlayer();
  }

  assignButtonHandlers(){
    $('#sail').on('click', this.sailShip);
    $('#load').on('click', this.loadShip);
    $('#get-block').on('click', this.getBlocks);
    $('#start-game-button2').on('click', game.startGame);
    $('#start-game-button3').on('click', game.startGame);
    $('#start-game-button4').on('click', game.startGame);

    $('.instructions').on('click', this.instructions);

    $('#game-reset').on('click', function() {
      $('.player').remove();
      $('.stack').remove();
      $('#start-modal').removeClass('hidden');
      $('#end-modal').addClass('hidden');
      this.resetState;
    });

    for(var i = 0; i < this.players.length; i++){
      this.players[i].blockCount = 2 + i;
      $(`#sled${i + 1}`).text(this.players[i].blockCount + '/5');
    };
  }

  startGame(event){
    
    this.numberOfPlayers = $(event.currentTarget).text();
    
    $('#start-modal').addClass('hidden');

    var colorArray = ['olive', 'darkorange', 'goldenrod', 'tan'];
    colorArray = colorArray.slice(0, (this.numberOfPlayers));

    this.createPlayer(colorArray);
    
    for(var i = 0; i < this.players.length; i++){
      
      this.players[i].blockCount = 2 + i;

      $(`#sled${i + 1}`).text(this.players[i].blockCount + '/5');
    }

    $('.dialogueBox').addClass('hidden');
  }

  loadShip(){

    if(this.shipFull[0]) {
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Ship is already full, please choose another action.')
      return;

    }else if (this.players[this.playerTurn].blockCount < 1) {
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('No blocks available to load ship, please choose another action.');
      return;

    }else{
      this.players[this.playerTurn].blockCount -= 1;
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Ship has been loaded!');
      $('.block-space').text('1/1');
      $(`#sled${this.playerTurn + 1}`).text(`${this.players[this.playerTurn].blockCount}/5`);
      $('.block-space').addClass('player' + this.playerTurn);

      this.shipFull.push(this.players[this.playerTurn].color);
      this.updateTurn();
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
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Blocks received!');

    }else{
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Sled is already full, please choose another action.');
      return;
    }
  }

  sailShip() {

    if(this.shipDocked){
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Ship is already docked. Please pick another action.');
      return;

    } else if (!this.shipFull[0]) {
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Ship is not loaded, please pick another action.');
      return;

    }else{
      $('.dialogueBox').removeClass('hidden');
      $('.dialogueBox').text('Ship has sailed! Blocks unloaded. Starting a new round.');
      $('.block-space').removeClass().addClass('block-space');

      for(var j = 0; j < this.players.length; j++){
        if (this.players[j].color === this.shipFull[0]) { 
          this.players[j].obeliskTotal++;
        };
        this.players[j].domElements.obelisk.text(this.players[j].obeliskTotal);
      };
        
      this.shipFull = [];
      this.shipDocked = true;
      this.updateTurn();
      this.resetRound();
      $('.block-space').text('0/1');
    }    
  }

  allocatePoints(){
    
    var winner;
    var sortArray = [];

    for(var i = 0; i < this.players.length; i++){

      sortArray.push(this.players[i]);
    };

    var k = 0;
    while (k < sortArray.length) {
      for (var j = 0; j < sortArray.length - 1; j++) {
        if (sortArray[j].obeliskTotal > sortArray[j + 1].obeliskTotal) {

          var x = sortArray[j];
          var y = sortArray[j + 1];

          sortArray[j] = y;
          sortArray[j + 1] = x;
        }
      }
      k++;
    }
    
    switch(sortArray.length){
      case 4: 

        if(sortArray[3].obeliskTotal > sortArray[2].obeliskTotal) {
          sortArray[3].points += 15;
          winner = 'Player 1';
          
          if(sortArray[2].obeliskTotal > sortArray[1].obeliskTotal) {
            sortArray[2].points += 10;
            

            if(sortArray[1].obeliskTotal > sortArray[0].obeliskTotal) {
              sortArray[1].points += 5;
              sortArray[0].points += 1;
              break;

            }else if(sortArray[1].obeliskTotal === sortArray[0].obeliskTotal) {
              sortArray[1].points += 3;
              sortArray[0].points += 3;
              break;
            };

          }else if(sortArray[2].obeliskTotal === sortArray[1].obeliskTotal) {
            if(sortArray[1].obeliskTotal === sortArray[0].obeliskTotal) {
              sortArray[0].points += 5;
              sortArray[0].points += 5;
              sortArray[0].points += 5;
              break;
            };
          };
        }else if(sortArray[3].obeliskTotal === sortArray[2].obeliskTotal){
          if (sortArray[2].obeliskTotal === sortArray[1].obeliskTotal){
            if (sortArray[1].obeliskTotal === sortArray[0].obeliskTotal){
              sortArray[3].points  += 7;
              sortArray[2].points  += 7;
              sortArray[1].points  += 7;
              sortArray[0].points  += 7;
              winner = 'Four-way Tie!'
              break;

            } else if (sortArray[1].obeliskTotal > sortArray[0].obeliskTotal){
              sortArray[3].points += 8;
              sortArray[2].points  += 8;
              sortArray[1].points  += 8;
              sortArray[0].points  += 1;
            };

          } else if (sortArray[2].obeliskTotal > sortArray[1].obeliskTotal){
            sortArray[3].points += 12;
            sortArray[2].points += 12;
            winner = 'Player 1 and 2 Tie for First!'

            if (sortArray[1].obeliskTotal === sortArray[0].obeliskTotal) {
              sortArray[1].points += 3;
              sortArray[0].points += 3;
              break;

            } else if (sortArray[1].obeliskTotal > sortArray[0].obeliskTotal) {
              sortArray[1].points += 5;
              sortArray[0].points += 1;
            };
          };
        };
      
        break;
      case 3: 

        if(sortArray[2].obeliskTotal > sortArray[1].obeliskTotal) {
          sortArray[2].points += 12;
          pointsToAward -= 12;
          
          if(sortArray[1].obeliskTotal > sortArray[0].obeliskTotal){
            sortArray[1].points += 7;
            sortArray[0].points += 2;
            break;

          }else if(sortArray[1].obeliskTotal = sortArray[0].obeliskTotal){
            sortArray[1].points += 5;
            sortArray[0].points += 5;
            break;
          };

        }else if(sortArray[2].obeliskTotal === sortArray[1].obeliskTotal){
          sortArray[2].points += 9;
          sortArray[1].points += 9;
          sortArray[0].points += 1;

          if(sortArray[1].obeliskTotal === sortArray[0].obeliskTotal){ 
            sortArray[2].points += 6;
            sortArray[1].points += 6;
            sortArray[0].points += 6;
          };
        };

        break;
      case 2: 
        
      pointsToAward = 11; 
       
        if(sortArray[1].obeliskTotal > sortArray[0].obeliskTotal) {
          sortArray[1].points += 10;
          sortArray[0].points += 1;
        }else{
          sortArray[1].points = 5;
          sortArray[0].points = 5;
        }

        break;
      default: console.log('error with array length.');
    };

    for(var i = 0; i < this.players.length; i++){
      this.players.domElements.scoreBox.text(this.players.score);
    }

  }

  resetRound() {
    $('.stack-one').text('0');
    $('.stack-two').text('0');
    this.round++;
    this.shipDocked = false;

    if(this.round > 6) {
      this.allocatePoints();
      this.round = 1;
      $('#end-modal').removeClass('hidden');
      $('.endgame').text('Play Again?')
    }
    $('.round-tracker').text(this.round);
  }

  updateTurn() {

    this.unmarkCurrentPlayer();
    this.playerTurn++;

    if (this.playerTurn === this.players.length) {

      this.playerTurn = 0;
    };

    this.markCurrentPlayer();
  }

  markCurrentPlayer(){
    this.players[this.playerTurn].markTurn();
  }  

  unmarkCurrentPlayer(){
    this.players[this.playerTurn].unmarkTurn();
  } 

  resetState() {

    this.shipDocked = false;
    this.shipFull = [];
    this.playerTurn = 0;
    this.round = 1;

    $('.round-tracker').text(this.round);
    $('.prime0').text('0');
    $('.block-space').text('0/1');
    $('#end-modal').addClass('hidden');
    $('.dialogueBox').addClass('hidden');

    for(var i = 0; i < this.players.length; i++){
      this.players[i].score = null;
      this.players[i].obeliskTotal = 0;
      this.players[i].blockCount = null;
    };
  }

  instructions() {
    alert("IMHOTEP, Builder of Egypt.\nThe goal is to get as many stones on the obelisk as possible\nin 6 rounds of play. Each player can perform one move: \nget more blocks, place a stone into the ship, or sail the ship.\nOnce he/she takes a move, play moves to the next player. \nAt the end of the game points are awarded in the following way: \n most stones - 15 points, 2nd most stones - 10 points, \n3rd most stones - 5 points, and 4th most stones - 1 point. \nWhen there are ties the points are divided. \nTO BEGIN THE GAME\nSelect the number of players from the buttons at the bottom \nof the entry screen.\nThe first player begins with 2 stones, the second player with \nthree stones, and the third and forth player begin with four stones.\n")
  }
}
