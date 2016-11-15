import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import BuyToolResponse from '../src/responses/BuyToolResponse'
import NotBuyToolResponse from '../src/responses/NotBuyToolResponse'
import GameMap from '../src/GameMap'
import ToolHouse from '../src/lands/ToolHouse';
import Tool from "../src/tools/Tool";


describe('roll to tool house test', () => {
    let player;
    let rollCommand;
    let buyToolResponse;
    let notBuyToolResponse;
    let tool;
    let tool2;
    let toolHouse;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        tool = new Tool(1, 50);
        tool2 = new Tool(2, 30);
        toolHouse = new ToolHouse(1);
        gameMap = new GameMap();
        rollCommand = new RollCommand(gameMap);
        buyToolResponse = new BuyToolResponse(1);
        notBuyToolResponse = new NotBuyToolResponse();
        
        gameMap.move = () => {
            return toolHouse;
        };
        toolHouse.getTool = () => {
            return tool;
        }
    });

    it('should_wait_for_response_when_roll_to_tool_house', () => {
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(toolHouse);
        expect(player.status).to.equal('WAIT_FOR_RESPONSE');
    });

    it('should_able_to_choose_not_to_buy_tool', () => {
        player.points = 100;
        player.execute(rollCommand);

        player.respond(notBuyToolResponse);

        expect(player.points).to.equal(100);
        expect(player.status).to.equal('END_TURN');
    })

    it('should_able_to_choose_to_buy_tool', () => {
        player.points = 100;
        player.execute(rollCommand);

        player.respond(buyToolResponse);

        expect(player.points).to.equal(100 - 50);
        expect(player.hasTool(tool)).to.be.true;
        expect(player.status).to.equal('END_TURN');
    })

    it('should_not_able_to_buy_tool_without_enough_points', () => {
        player.execute(rollCommand);

        player.respond(buyToolResponse);

        expect(player.points).to.equal(0);
        expect(player.hasTool(tool)).to.be.false;
        expect(player.status).to.equal('END_TURN');
    })

    it('should_not_able_to_buy_tool_when_tool_bag_is_full', () => {
        player.points = 100;
        for (let i = 0; i < 10; i++) {
            player.tools.push(tool2);
        }

        player.execute(rollCommand);

        player.respond(buyToolResponse);

        expect(player.points).to.equal(100);
        expect(player.hasTool(tool)).to.be.false;
        expect(player.status).to.equal('END_TURN');
    })
});
