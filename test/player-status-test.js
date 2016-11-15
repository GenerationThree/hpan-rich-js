import {expect} from 'chai'
import {beforeEach} from "mocha";

import Player from '../src/Player'
import Command from '../src/commands/Command'
import Response from '../src/Response'

describe('player status test', () => {
    let player;
    let command;
    let response;

    beforeEach(() => {
        player = new Player(1);
        command = new Command();
        response = new Response();
    });

    it('should wait for resp after executing resp requesting command', () => {
        command.execute = () => 'WAIT_FOR_RESPONSE';
        
        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(command);

        expect(player.status).to.equal('WAIT_FOR_RESPONSE');
    });

    it('should end turn after executing non resp requesting command', () => {
        command.execute = () => 'END_TURN';

        expect(player.status).to.equal('WAIT_FOR_COMMAND');

        player.execute(command);

        expect(player.status).to.equal('END_TURN');
    });

    it('should end turn after responding rolling command', () => {
        response.respond = () => 'END_TURN';
        player.status = 'WAIT_FOR_RESPONSE';

        expect(player.status).to.equal('WAIT_FOR_RESPONSE');

        player.respond(response);

        expect(player.status).to.equal('END_TURN');
    });

    it('should wait for command after responding command other than rolling', () => {
        response.respond = () => 'WAIT_FOR_RESPONSE';
        player.status = 'WAIT_FOR_RESPONSE';

        expect(player.status).to.equal('WAIT_FOR_RESPONSE');

        player.respond(response);

        expect(player.status).to.equal('WAIT_FOR_RESPONSE');
    });
});