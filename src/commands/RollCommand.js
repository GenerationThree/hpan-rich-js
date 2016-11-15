import Command from './Command'
import ToolHouse from '../lands/ToolHouse'
import GiftHouse from "../lands/GiftHouse";

export default class RollCommand extends Command{
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }
    
    execute(player) {
        player.currentLand = this.gameMap.move();
        let currentLand = player.currentLand;
        
        if (currentLand instanceof ToolHouse) {
            return 'WAIT_FOR_RESPONSE';
        }

        if (currentLand instanceof GiftHouse) {
            return 'WAIT_FOR_RESPONSE';
        }
        
        if (currentLand.owner === undefined || currentLand.owner === player) {
            return 'WAIT_FOR_RESPONSE';
        } else {
            player.payPassingFee();
            return 'END_TURN';
        }
        
    }
}