import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import UpdateLandResponse from '../src/responses/UpdateLandResponse'
import NotUpdateLandResponse from '../src/responses/NotUpdateLandResponse'
import GameMap from '../src/GameMap'
import Land from '../src/Land';


describe('roll to own land test', () => {
    let player;
    let rollCommand;
    let updateLandResponse;
    let notUpdateLandResponse;
    let land;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        land = new Land(1, 500);
        gameMap = new GameMap();
        rollCommand = new RollCommand(gameMap);
        updateLandResponse = new UpdateLandResponse();
        notUpdateLandResponse = new NotUpdateLandResponse();
        
        land.owner = player;
        player.lands.push(land);
        gameMap.move = () => {
            return land;
        };
    });

    it('should_wait_for_response_when_roll_to_own_land', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(land);
        expect(player.status).to.equal('WAIT_FOR_RESPONSE');
    });

    it('should_able_to_choose_not_to_update_on_own_land', () => {
        player.execute(rollCommand);

        player.respond(notUpdateLandResponse);

        expect(player.money).to.equal(1000);
        expect(land.owner).to.equal(player);
        expect(land.level).to.equal(0);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_able_to_choose_to_update_on_own_land', () => {
        player.execute(rollCommand);

        player.respond(updateLandResponse);

        expect(player.money).to.equal(1000 - 500);
        expect(land.owner).to.equal(player);
        expect(land.level).to.equal(1);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_not_able_to_update_on_own_land_level_three', () => {
        land.level = 3;
        player.execute(rollCommand);

        player.respond(updateLandResponse);
 
        expect(player.money).to.equal(1000);
        expect(land.owner).to.equal(player);
        expect(land.level).to.equal(3);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_not_able_to_update_without_enough_money_on_own_land', () => {
        player.money = 100;
        player.execute(rollCommand);

        player.respond(updateLandResponse);

        expect(player.money).to.equal(100);
        expect(land.owner).to.equal(player);
        expect(land.level).to.equal(0);
        expect(player.status).to.equal('END_TURN');
    })
});