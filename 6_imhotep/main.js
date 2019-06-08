$(document).ready(initApp);

var game;
function initApp() {
  game = new GameState();
  $('.round-tracker').text(game.round);
  $('.score-one').text('0');//dry
  $('.score-two').text('0');
  $('.stack-one').text('0');//dry
  $('.stack-two').text('0');
  $('.block-space').text('0/1');
  
  //move click handlers into a function in the class
  $('#start-game-button2').on('click', game.startGame);
  $('#start-game-button3').on('click', game.startGame);
  $('#start-game-button4').on('click', game.startGame);
}