import {expect} from 'chai'
import {beforeEach} from 'mocha';

import Player from '../src/Player'
import SetToolCommand from '../src/commands/SetToolCommand'
import UseRobotCommand from '../src/commands/UseRobotCommand'
import Tool from '../src/tools/Tool'
import NormalLand from "../src/lands/NormalLand";
import GameMap from "../src/GameMap";

describe('use tool test', () => {
    let player;
    let player2;
    let setBlockerCommand;
    let setBombCommand;
    let useRobotCommand;
    let tool;
    let tool2;
    let tool3;
    let start;
    let land1;
    let land2;
    let land3;
    let land4;
    let land5;
    let land6;
    let land7;
    let land8;
    let land9;
    let land10;
    let land11;
    let gameMap;

    beforeEach(() => {
        player = new Player(1);
        player2 = new Player(2);
        
        tool = new Tool(1);
        tool2 = new Tool(2);

        start = new NormalLand(0);
        land1 = new NormalLand(1);
        land2 = new NormalLand(2);
        land3 = new NormalLand(3);
        land4 = new NormalLand(4);
        land5 = new NormalLand(5);
        land6 = new NormalLand(6);
        land7 = new NormalLand(7);
        land8 = new NormalLand(8);
        land9 = new NormalLand(9);
        land10 = new NormalLand(10);
        land11 = new NormalLand(11);
        gameMap = new GameMap(start, land1, land2, land3,
            land4, land5, land6,
            land7, land8, land9,
            land10, land11);

        setBlockerCommand = new SetToolCommand(1, 1, gameMap);
        setBombCommand = new SetToolCommand(3, 1, gameMap);
        useRobotCommand = new UseRobotCommand(gameMap);
        
        player.tools.push(new Tool(1, 50));
        player.tools.push(new Tool(3, 50));
    })

    it('should wait for command after using bomb', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(setBlockerCommand);
        
        expect(player.status).to.equal('WAIT_FOR_COMMAND')
    })


    it('should set blocker on map', () => {
        setBlockerCommand = new SetToolCommand(1, 1, gameMap);
        player.execute(setBlockerCommand);

        expect(land1.isBlockered).to.be.true;
        expect(player.status).to.equal('WAIT_FOR_COMMAND')
    })

    // it('should not set bomb far away', () => {
    //     player.execute(setBlockerCommand);
    //
    //     expect(land1.isBlockered).to.be.true;
    //     expect(player.status).to.equal('WAIT_FOR_COMMAND')
    // })

    it('should set bomn on map', () => {
        player.execute(setBombCommand);

        expect(land1.isBombed).to.be.true;
        expect(player.status).to.equal('WAIT_FOR_COMMAND')
    })

    it('should not set blocker on player', () => {
        player2.moveTo(land1);
        setBlockerCommand = new SetToolCommand(1, 1, gameMap);
        player.execute(setBlockerCommand);

        expect(land1.isBlockered).to.be.false;
        expect(player.status).to.equal('WAIT_FOR_COMMAND')
    })

    it('should not set bomb on player', () => {
        player2.moveTo(land1);
        setBlockerCommand = new SetToolCommand(3, 1, gameMap);
        player.execute(setBlockerCommand);

        expect(land1.isBombed).to.be.false;
        expect(player.status).to.equal('WAIT_FOR_COMMAND')
    })

    it('should clear blockers and bombs 10 steps forward', () => {
        land1.isBombed = true;
        land2.isBlockered = true;
        land11.isBombed = true;
        
        player.execute(useRobotCommand);

        expect(land1.isBombed).to.be.false;
        expect(land2.isBlockered).to.be.false;
        expect(land11.isBombed).to.be.true;
        expect(player.status).to.equal('WAIT_FOR_COMMAND')
    })
});