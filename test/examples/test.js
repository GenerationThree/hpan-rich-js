import {assert} from 'chai'
import Dice from '../../src/Dice'
import sinon from 'sinon'

describe('first test scope', () => {
    let dice;
    
    beforeEach(() => {
        sinon.stub(Dice.prototype, 'nextStep').returns(3);
        dice = new Dice();
    });
    
    it('first test', () => {
        assert.equal(dice.nextStep(), 3)
    })
})
