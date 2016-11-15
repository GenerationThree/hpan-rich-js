import {expect} from 'chai'
import {beforeEach} from 'mocha';

import Player from '../src/Player'
import SellToolCommand from '../src/commands/SellToolCommand'
import Tool from '../src/tools/Tool'

describe('sell tool test', () => {
    let player;
    let sellToolOneCommand;
    let tool;
    let tool2;
    
    beforeEach(() => {
        player = new Player(1);
        sellToolOneCommand = new SellToolCommand(1);
        tool = new Tool(1);
        tool2 = new Tool(2);
    })
    
    it('should wait for command after executing sell tool command', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');
        
        player.execute(sellToolOneCommand);  
             
        expect(player.status).to.equal('WAIT_FOR_COMMAND');
    })

    it('should sell tool when having it', () => {
        player.tools.push(tool);

        player.execute(sellToolOneCommand);

        expect(player.tools.length).to.equal(0)
    })

    it('should not sell tool when not having it', () => {
        player.tools.push(tool2);

        player.execute(sellToolOneCommand);

        expect(player.tools.length).to.equal(1)
    })
});