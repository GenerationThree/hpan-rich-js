import {expect} from 'chai'
import {beforeEach} from 'mocha'

import Player from '../src/Player'
import RollCommand from '../src/commands/RollCommand'
import GameMap from '../src/GameMap'
import Hospital from '../src/lands/Hospital';
import NormalLand from "../src/lands/NormalLand";

describe('trigger tool test', () => {
    let player;
    let rollCommand;
    let start;
    let blockerLand;
    let bombLand;
    let land2;
    let hospital;
    let gameMap;

    beforeEach(() => {
        player = new Player(1, 1000);
        start = new NormalLand(0);
        blockerLand = new NormalLand(1);
        blockerLand.isBlockered = true;
        bombLand = new NormalLand(1);
        bombLand.isBombed = true;
        land2 = new NormalLand(2);
        hospital = new Hospital(3);

        player.roll = () => {
            return 2;
        }
    });
    
    it('should_end_turn_when_triggering_a_blocker_on_the_way', () => {
        gameMap = new GameMap(start, blockerLand, land2, hospital);
        rollCommand = new RollCommand(gameMap);

        player.execute(rollCommand);
        
        expect(player.status).to.equal('END_TURN');
    })

    it('should_end_turn_when_triggering_a_bomb_on_the_way', () => {
        gameMap = new GameMap(start, bombLand, land2, hospital);
        rollCommand = new RollCommand(gameMap);
        
        player.execute(rollCommand);

        expect(player.status).to.equal('END_TURN');
    })
    
    it ('should_stay_at_land_with_blocker', () => {
        gameMap = new GameMap(start, blockerLand, land2);
        rollCommand = new RollCommand(gameMap);

        player.execute(rollCommand);

        expect(player.currentLand).to.equal(blockerLand);
        expect(blockerLand.isBlockered).to.be.false;
        expect(player.status).to.equal('END_TURN');
    })

    it ('should_sent_to_hospital_when_triggering_bomb', () => {
        gameMap = new GameMap(start, bombLand, land2, hospital);
        rollCommand = new RollCommand(gameMap);
        
        player.execute(rollCommand);
        
        expect(player.currentLand).to.equal(hospital);
        expect(player.byeRoundLeft).to.equal(3);
        expect(bombLand.isBombed).to.be.false;
        expect(player.status).to.equal('END_TURN');
    })

    it ('should_stay_in_hospital_for_three_rounds', () => {
        gameMap = new GameMap(start, bombLand, land2, hospital);
        rollCommand = new RollCommand(gameMap);

        player.execute(rollCommand);
        expect(player.currentLand).to.equal(hospital);
        expect(player.isInHospital).to.be.ture;
        
        player.execute(rollCommand);
        expect(player.currentLand).to.equal(hospital);
        expect(player.isInHospital).to.be.ture;

        player.execute(rollCommand);
        expect(player.currentLand).to.equal(hospital);
        expect(player.isInHospital).to.be.ture;

        player.execute(rollCommand);
        expect(player.currentLand).to.equal(hospital);
        expect(player.isInHospital).to.be.ture;


        player.execute(rollCommand);
        expect(player.currentLand).to.equal(bombLand);
        expect(player.isInHospital).to.be.false;

    })
});