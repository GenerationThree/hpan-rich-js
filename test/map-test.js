import {expect} from 'chai'

import GameMap from '../src/GameMap'
import NormalLand from '../src/lands/NormalLand'

describe('game map unit test', () => {
    it('should return next land after step', () => {
        let start = new NormalLand(0, 100);
        let land1 = new NormalLand(1, 100);
        let land2 = new NormalLand(2, 100);

        let gameMap = new GameMap(start, land1, land2);

        expect(gameMap.move(start, 2)).to.equal(land2);
    })

    it('should return next land after step more than lands number', () => {
        let start = new NormalLand(0, 100);
        let land1 = new NormalLand(1, 100);
        let land2 = new NormalLand(2, 100);

        let gameMap = new GameMap(start, land1, land2);

        expect(gameMap.move(start, 4)).to.equal(land1);
    })
})