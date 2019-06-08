$(document).ready(initApp);

var game;

function initApp() {
  game = new GameState();

  game.assignButtonHandlers();
  game.resetState();

}