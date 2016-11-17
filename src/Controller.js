import GameMap from "./GameMap";
import Start from "./lands/Start";
import NormalLand from "./lands/NormalLand";
import Hospital from "./lands/Hospital";
import ToolHouse from "./lands/ToolHouse";
import GiftHouse from "./lands/GiftHouse";
import MagicHouse from "./lands/MagicHouse";
import Prison from "./lands/Prison";
import Mine from "./lands/Mine";

import RollCommand from "./commands/RollCommand";
import SellToolCommand from "./commands/SellToolCommand";
import SellLandCommand from "./commands/SellLandCommand";
import SetToolCommand from "./commands/SetToolCommand";
import QueryCommand from "./commands/QueryCommand";
import UseRobotCommand from "./commands/UseRobotCommand";
import BuyLandResponse from "./responses/BuyLandResponse";
import UpdateLandResponse from "./responses/UpdateLandResponse";
import NotBuyLandResponse from "./responses/NotBuyLandResponse";
import NotUpdateLandResponse from "./responses/NotUpdateLandResponse";
import BuyToolResponse from "./responses/BuyToolResponse";

export default class Controller {
    constructor() {
        this.gameMap = new GameMap();
        this.players = [];
        this.createLands();
    }

    createLands() {
        this.gameMap.lands.push(new Start(0));
        for (let i = 1; i < 14; i++) {
            this.gameMap.lands.push(new NormalLand(i, 200));
        }
        this.gameMap.lands.push(new Hospital(14));
        for (let i = 15; i < 28; i++) {
            this.gameMap.lands.push(new NormalLand(i, 200));
        }
        this.gameMap.lands.push(new ToolHouse(28));
        for (let i = 29; i < 35; i++) {
            this.gameMap.lands.push(new NormalLand(i, 500));
        }
        this.gameMap.lands.push(new GiftHouse(35));
        for (let i = 36; i < 49; i++) {
            this.gameMap.lands.push(new NormalLand(i, 300));
        }
        this.gameMap.lands.push(new Prison(49));
        for (let i = 50; i < 63; i++) {
            this.gameMap.lands.push(new NormalLand(i, 300));
        }
        this.gameMap.lands.push(new MagicHouse(63));
        this.gameMap.lands.push(new Mine(64, 20));
        this.gameMap.lands.push(new Mine(65, 80));
        this.gameMap.lands.push(new Mine(66, 100));
        this.gameMap.lands.push(new Mine(67, 40));
        this.gameMap.lands.push(new Mine(68, 80));
        this.gameMap.lands.push(new Mine(69, 60));
    }

    displayMap() {
        let symbols = this.gameMap.getSymbols(this.currentPlayer);

        let line = '';
        for (let i = 0; i < 29; i++) {
            line += symbols[i];
        }
        console.log(line);
        line = '';

        line += symbols[69];
        for (let i = 0; i < 27; i++) {
            line += ' ';
        }
        line += symbols[29];
        console.log(line);
        line = '';

        line += symbols[68];
        for (let i = 0; i < 27; i++) {
            line += ' ';
        }
        line += symbols[30];
        console.log(line);
        line = '';

        line += symbols[67];
        for (let i = 0; i < 27; i++) {
            line += ' ';
        }
        line += symbols[31];
        console.log(line);
        line = '';

        line += symbols[66];
        for (let i = 0; i < 27; i++) {
            line += ' ';
        }
        line += symbols[32];
        console.log(line);
        line = '';

        line += symbols[65];
        for (let i = 0; i < 27; i++) {
            line += ' ';
        }
        line += symbols[33];
        console.log(line);
        line = '';

        line += symbols[64];
        for (let i = 0; i < 27; i++) {
            line += ' ';
        }
        line += symbols[34];
        console.log(line);
        line = '';

        for (let i = 63; i > 34; i--) {
            line += symbols[i];
        }
        console.log(line);
        line = '';
    }

    run(rl) {
        rl.question(this.currentPlayer.name + 'command:', (command) => {
            let commands = command.toLowerCase().split(' ');
            switch (commands[0]) {
                case 'roll':
                    this.currentPlayer.execute(new RollCommand(this.gameMap));

                    if (this.currentPlayer.currentLand instanceof NormalLand && this.currentPlayer.currentLand.owner === undefined) {
                        rl.question(this.currentPlayer.name + ' buy this land:', (response) => {
                            response = response.toLowerCase();
                            if (response === 'y') {
                                this.currentPlayer.respond(new BuyLandResponse());
                            }
                            if (response === 'n') {
                                this.currentPlayer.respond(new NotBuyLandResponse());
                            }
                            this.currentPlayer = this.nextPlayer();
                            this.displayMap();
                            this.run(rl)
                        });
                    }
                    if (this.currentPlayer.currentLand.owner === this.currentPlayer) {
                        rl.question(this.currentPlayer.name + ' update this land:', (response) => {
                            response = response.toLowerCase();
                            if (response === 'y') {
                                this.currentPlayer.respond(new UpdateLandResponse());
                            }
                            if (response === 'n') {
                                this.currentPlayer.respond(new NotUpdateLandResponse());
                            }
                            this.currentPlayer = this.nextPlayer();
                            this.displayMap();
                            this.run(rl)
                        });
                    }
                
                    if (this.currentPlayer.currentLand instanceof ToolHouse) {
                        rl.question(this.currentPlayer.name + ' select tool (1,2,3):', (response) => {
                            response = parseInt(response);
                            this.currentPlayer.respond(new BuyToolResponse(response));
                            this.currentPlayer = this.nextPlayer();
                            this.displayMap();
                            this.run(rl)
                        });
                    }
                    if (this.currentPlayer.currentLand instanceof GiftHouse) {
                        rl.question(this.currentPlayer.name + ' select gift (1,2,3):', (response) => {
                            response = parseInt(response);
                            this.currentPlayer.respond(new SelectGiftResponse(response));
                            this.currentPlayer = this.nextPlayer();
                            this.displayMap();
                            this.run(rl)
                        });
                    }

                    this.currentPlayer = this.nextPlayer();
                    this.displayMap();
                    this.run(rl)

                    break;
                case 'selltool':
                    this.currentPlayer.execute(new SellToolCommand(parseInt(commands[1])));
                    this.displayMap();
                    this.run(rl)
                    break;
                case 'sell':
                    this.currentPlayer.execute(new SellLandCommand(parseInt(commands[1])));
                    this.displayMap();
                    this.run(rl)
                    break;
                case 'block':
                    this.currentPlayer.execute(new SetToolCommand(1, parseInt(commands[1]), this.gameMap));
                    this.displayMap();
                    this.run(rl)
                    break;
                case 'bomb':
                    this.currentPlayer.execute(new SetToolCommand(3, parseInt(commands[1]), this.gameMap));
                    this.displayMap();
                    this.run(rl)
                    break;
                case 'robot':
                    this.currentPlayer.execute(new UseRobotCommand(this.gameMap));
                    this.displayMap();
                    this.run(rl)
                    break;
                case 'query':
                    this.currentPlayer.execute(new QueryCommand());
                    console.log(this.currentPlayer.info);
                    this.run(rl)
                    break;
                default:
                    break;
            }

        })

    }

    addPlayer(player) {
        this.players.push(player);
    }

    nextPlayer() {
        let index = this.players.indexOf(this.currentPlayer);
        let nextIndex = (index + 1) === this.players.length ? 0 : index + 1;

        return this.players[nextIndex]
    }
}