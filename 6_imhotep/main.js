$(document).ready(initApp);

var game;

//test
function initApp() {
  game = new GameState();

  game.assignButtonHandlers();
  game.resetState();

}