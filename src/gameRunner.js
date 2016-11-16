import Controller from './Controller'
import readline from 'readline'
import Player from "./Player";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("welcome to rich");

let controller = new Controller();

let initMoney;
let players;
rl.question('init money : (1000 ~ 50000)', (money) => {
    initMoney = money;
    rl.question('select players : (1,2,3,4)', (answer) => {
        players = answer.split(',');
        for (let i of players) {
            controller.players.push(new Player(parseInt(i), initMoney));
        }
        controller.currentPlayer = controller.players[0];
        controller.run(rl);
        // rl.close();

    })
});





