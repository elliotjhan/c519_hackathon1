



function initApp() {
  
  var game = new GameState();
  game.createPlayer();
  return game.players;
  
}
var x = initApp();
console.log(x);