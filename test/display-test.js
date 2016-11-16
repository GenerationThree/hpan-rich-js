import {expect} from 'chai'

import GameMap from '../src/GameMap'
import Start from '../src/lands/Start'
import NormalLand from '../src/lands/NormalLand'
import Hospital from "../src/lands/Hospital";
import ToolHouse from "../src/lands/ToolHouse";
import GiftHouse from "../src/lands/GiftHouse";
import Prison from "../src/lands/Prison";
import MagicHouse from "../src/lands/MagicHouse";
import Mine from "../src/lands/Mine";
import Player from "../src/Player";

describe('game map unit test', () => {
    let start;
    let hospital;
    let toolHouse;
    let giftHouse;
    let prison;
    let magicHouse;
    let mine;
    let normalLand;

    let player1;
    let player2;
    let player3;
    let player4;
    
    let gameMap;

    beforeEach(() => {
        start = new Start(0);
        hospital = new Hospital(1);
        toolHouse = new ToolHouse(2);
        giftHouse = new GiftHouse(3);
        prison = new Prison(4);
        magicHouse = new MagicHouse(5);
        mine = new Mine(6, 20);
        normalLand = new NormalLand(7);

        player1 = new Player(1);
        player2 = new Player(2);
        player3 = new Player(3);
        player4 = new Player(4);
        
        gameMap = new GameMap();
    })
    
    
    it('should getSymbols special lands', () => {
        expect(start.getSymbol()).to.equal("S");
        expect(hospital.getSymbol()).to.equal("H");
        expect(toolHouse.getSymbol()).to.equal("T");
        expect(giftHouse.getSymbol()).to.equal("G");
        expect(prison.getSymbol()).to.equal("P");
        expect(magicHouse.getSymbol()).to.equal("M");
        expect(mine.getSymbol()).to.equal("$");
    })

    it('should getSymbols normal land level', () => {
        expect(normalLand.getSymbol()).to.equal("0")
        normalLand.level = 1;
        expect(normalLand.getSymbol()).to.equal("1")
        normalLand.level = 2;
        expect(normalLand.getSymbol()).to.equal("2")
        normalLand.level = 3;
        expect(normalLand.getSymbol()).to.equal("3")
    })

    it('should getSymbols player symbol', () => {
        normalLand.players.push(player1);
        expect(normalLand.getSymbol()).to.equal("Q")

        hospital.players.push(player2);
        expect(hospital.getSymbol()).to.equal("A")

        toolHouse.players.push(player3);
        expect(toolHouse.getSymbol()).to.equal("S")

        giftHouse.players.push(player4);
        expect(giftHouse.getSymbol()).to.equal("J")
    })

    it('should getSymbols tool', () => {
        normalLand.isBombed = true
        expect(normalLand.getSymbol()).to.equal("@")

        toolHouse.isBlockered = true;
        expect(toolHouse.getSymbol()).to.equal("#")
    })

    it('should getSymbols current player symbol when several players on the same land', () => {
        player1.moveTo(normalLand);
        player2.moveTo(normalLand);
        
        
        gameMap.lands.push(normalLand);
        //eql instead of equal
        expect(gameMap.getSymbols(player2)).to.eql(['A'])
    })
})