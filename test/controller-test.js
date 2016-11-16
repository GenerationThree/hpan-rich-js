import {expect} from 'chai'

import Controller from "../src/Controller";
import {beforeEach} from "../node_modules/mocha/mocha";
import Player from "../src/Player";


describe('controller test', () => {
    it('display', () => {
        let controller = new Controller();
        controller.currentPlayer = new Player(1);
        
        controller.displayMap();
    })

    it('should turn to next player', () => {
        let controller = new Controller();
        let player1 = new Player(1, 1000);
        let player2 = new Player(2, 1000);
        let player3 = new Player(3, 1000);
        
        controller.addPlayer(player1);
        controller.addPlayer(player2);
        controller.addPlayer(player3);
        
        controller.currentPlayer = player1;

        expect(controller.nextPlayer()).to.equal(player2);

        controller.currentPlayer = player3;

        expect(controller.nextPlayer()).to.equal(player1);
    })
})