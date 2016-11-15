import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import SellLandCommand from '../src/commands/SellLandCommand'
import Land from '../src/Land.js'

describe('sell land test', () => {
    let player;
    let sellLandCommand;
    let land;
    let land2;

    beforeEach(() => {
        player = new Player(1);
        sellLandCommand = new SellLandCommand(1);
        land = new Land(1);
        land2 = new Land(2);
    })

    it('should wait for response after executing sell land command', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(sellLandCommand);

        expect(player.status).to.equal('WAIT_FOR_COMMAND');
    })

    it('should not sell land when not having it', () => {
        player.lands.push(land2);

        player.execute(sellLandCommand);

        expect(player.lands.length).to.equal(1);
    })
});