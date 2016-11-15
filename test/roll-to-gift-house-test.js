import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import SelectGiftResponse from '../src/responses/SelectGiftResponse'
import GameMap from '../src/GameMap'
import GiftHouse from '../src/lands/GiftHouse';

describe('roll to gift house test', () => {
    let player;
    let rollCommand;
    let priceGiftResponse;
    let pointsGiftResponse;
    let luckyGiftResponse;
    let giftHouse;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        giftHouse = new GiftHouse(1);
        gameMap = new GameMap();
        rollCommand = new RollCommand(gameMap);
        priceGiftResponse = new SelectGiftResponse(1);
        pointsGiftResponse = new SelectGiftResponse(2);
        luckyGiftResponse = new SelectGiftResponse(3);

        gameMap.move = () => {
            return giftHouse;
        };

    });


    it('should_wait_for_response_when_roll_to_gift_house', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(giftHouse);
        expect(player.status).to.equal('WAIT_FOR_RESPONSE');
    });

    it('should_able_to_choose_price_as_gift', () => {
        player.execute(rollCommand);

        player.respond(priceGiftResponse);

        expect(player.money).to.equal(1000 + 2000);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_able_to_choose_points_as_gift', () => {
        player.execute(rollCommand);

        player.respond(pointsGiftResponse);

        expect(player.points).to.equal(0 + 200);
        expect(player.status).to.equal('END_TURN');
    })


    it('should_able_to_choose_lucky_as_gift', () => {
        player.execute(rollCommand);

        player.respond(luckyGiftResponse);

        expect(player.isLucky).to.be.true;
        expect(player.luckyRounds).to.equal(5);
        expect(player.status).to.equal('END_TURN');
    })
});
