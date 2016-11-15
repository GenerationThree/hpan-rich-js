import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import GameMap from '../src/GameMap'
import Mine from '../src/lands/Mine';

describe('roll to prison test', () => {
    let player;
    let rollCommand;
    let mine;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        mine = new Mine(1, 20);
        gameMap = new GameMap();
        rollCommand = new RollCommand(gameMap);

        gameMap.move = () => {
            return mine;
        };
    });

    it('should_end_turn_when_roll_to_mine', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(mine);
        expect(player.status).to.equal('END_TURN');
    });

    it('should_earn_points_on_mine', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.points).to.equal(20);
        expect(player.status).to.equal('END_TURN');
    });

});