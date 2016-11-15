import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import GameMap from '../src/GameMap'
import Prison from '../src/lands/Prison';
import NormalLand from "../src/lands/NormalLand";

describe('roll to prison test', () => {
    let player;
    let rollCommand;
    let start;
    let prison;
    let land2;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        start = new NormalLand(0);
        prison = new Prison(1);
        land2 = new NormalLand(2);
        gameMap = new GameMap(start, prison, land2);
        rollCommand = new RollCommand(gameMap);

        player.roll = () => {
            return 1;
        }
    });

    it('should_end_turn_when_roll_to_prisond', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(prison);
        expect(player.status).to.equal('END_TURN');
    });

    it('should_stay_in_prision_for_two_rounds', () => {
        player.execute(rollCommand);
        expect(player.isInPrison).to.be.true;
        
        player.execute(rollCommand);
        expect(player.isInPrison).to.be.true;
        
        player.execute(rollCommand);
        expect(player.isInPrison).to.be.true;

        player.execute(rollCommand);
        expect(player.isInPrison).to.be.false;        
    })
});