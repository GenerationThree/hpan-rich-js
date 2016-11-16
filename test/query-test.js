import {expect} from 'chai'
import {beforeEach} from 'mocha';

import Player from '../src/Player'
import QueryCommand from '../src/commands/QueryCommand'
import Tool from '../src/tools/Tool'

describe('sell tool test', () => {
    let player;
    let tool;
    let tool2;
    let queryCommand;

    beforeEach(() => {
        player = new Player(1, 1000);
        tool = new Tool(1);
        tool2 = new Tool(2);
        queryCommand = new QueryCommand();
    });

    it('should get user information', () => {
        player.execute(queryCommand);

        // expect(player.info).to.equal('');
    })
});