import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import BuyLandResponse from '../src/responses/BuyLandResponse'
import NotBuyLandResponse from '../src/responses/NotBuyLandResponse'
import GameMap from '../src/GameMap'
import Land from '../src/lands/NormalLand';


describe('roll to empty land test', () => {
    let player;
    let rollCommand;
    let buyLandResponse;
    let notBuyLandResponse;
    let land;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        land = new Land(1, 500);
        gameMap = new GameMap();
        rollCommand = new RollCommand(gameMap);
        buyLandResponse = new BuyLandResponse();
        notBuyLandResponse = new NotBuyLandResponse();
        
        gameMap.move = () => {
            return land;
        };
    });

    it('should_wait_for_response_when_roll_to_empty_land', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');
        
        player.execute(rollCommand);
        
        expect(player.currentLand).to.equal(land);
        expect(player.status).to.equal('WAIT_FOR_RESPONSE');
    });

    it('should_able_to_choose_not_to_buy_on_empty_land', () => {
        player.execute(rollCommand);

        player.respond(notBuyLandResponse);

        expect(land.owner).to.be.an('undefined');
        expect(player.money).to.equal(1000);
        expect(player.hasLand(land)).to.be.false;
        expect(player.status).to.equal('END_TURN');
    })

    it('should_able_to_choose_to_buy_on_empty_land', () => {
        player.execute(rollCommand);

        player.respond(buyLandResponse);

        expect(land.owner).to.equal(player);
        expect(player.money).to.equal(1000 - 500);
        expect(player.hasLand(land)).to.be.true;
        expect(player.status).to.equal('END_TURN');
    })

    it('should_not_able_to_buy_without_enough_money_on_empty_land', () => {
        player.money = 100;
        player.execute(rollCommand);

        player.respond(buyLandResponse);

        expect(land.owner).to.be.an('undefined');
        expect(player.money).to.equal(100);
        expect(player.hasLand(land)).to.be.false;
        expect(player.status).to.equal('END_TURN');
    })
});