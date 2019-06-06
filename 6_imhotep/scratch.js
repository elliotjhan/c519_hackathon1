class Game {
    constructor(){
        this.players = [];
    }
    
    createPlayer(color){

        color = new Player(color);
        this.players.push(color);

    }
};



class Player {

    constructor(color){
        this.color = color;
    }
};

var game = new Game();

game.createPlayer('black');

console.log(game.players);