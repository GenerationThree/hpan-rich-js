import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import GameMap from '../src/GameMap'
import Land from '../src/Land';


describe('roll to other land test', () => {
    let player;
    let player2;
    let rollCommand;
    let land;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        player2 = new Player(2, 1000);
        land = new Land(1, 500);
        gameMap = new GameMap();
        rollCommand = new RollCommand(gameMap);

        land.owner = player2;
        player2.lands.push(land);
        gameMap.move = () => {
            return land;
        };
    });

    it('should_end_turn_when_roll_to_other_player_land', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(land);
        expect(player.status).to.equal('END_TURN');
    });

    it('should_pay_on_other_player_land', () => {
        player.execute(rollCommand);

        expect(player.money).to.equal(1000 - 500 /2);
        expect(player2.money).to.equal(1000 + 500 /2);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_pay_on_other_player_land_with_level_3', () => {
        land.level = 3;
        player.execute(rollCommand);

        expect(player.money).to.equal(1000 - 500 / 2 * 2 * 2 * 2);
        expect(player2.money).to.equal(1000 + 500 /2 * 2 * 2 * 2);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_no_need_to_pay_on_other_player_land_when_lucky', () => {
        player.isLucky = true;
        player.execute(rollCommand);

        expect(player.money).to.equal(1000);
        expect(player2.money).to.equal(1000);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_no_need_to_pay_on_other_player_land_when_owner_in_prison', () => {
        player2.isInPrison = true;
        player.execute(rollCommand);

        expect(player.money).to.equal(1000);
        expect(player2.money).to.equal(1000);
        expect(player.status).to.equal('END_TURN');
    })
});