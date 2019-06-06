$(document).ready(initApp);


function initApp() {
  
  var game = new GameState();

  game.createPlayer();
  game.assignButtonHandlers();
}