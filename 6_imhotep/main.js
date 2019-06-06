$(document).ready(initApp);


function initApp() {
  var game = new GameState();
  $('.round-tracker').text(game.round);
  $('.score-one').text('0');
  $('.score-two').text('0');
  $('.stack-one').text('0');
  $('.stack-two').text('0');
  $('.block-space').text('0/1');
  
  $('#start-game-button2').on('click', game.startGame);
  $('#start-game-button3').on('click', game.startGame);
  $('#start-game-button4').on('click', game.startGame);
}