import Command from './Command'
import ToolHouse from '../lands/ToolHouse'
import GiftHouse from "../lands/GiftHouse";
import Prison from "../lands/Prison";

export default class RollCommand extends Command{
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }
    
    execute(player) {
        if (player.currentLand instanceof Prison && player.byeRoundLeft > 0) {
            player.byeRoundLeft --;
        } else {
            player.currentLand = this.gameMap.move(player.currentLand, player.roll())
            player.isInPrison = false;
        }
        
        let currentLand = player.currentLand;
        
        if (currentLand instanceof ToolHouse) {
            return 'WAIT_FOR_RESPONSE';
        }

        if (currentLand instanceof GiftHouse) {
            return 'WAIT_FOR_RESPONSE';
        }

        if (currentLand instanceof Prison) {
            if (!player.isInPrison) {
                player.inprisoned();
            }
            return 'END_TURN';
        }
        
        if (currentLand.owner === undefined || currentLand.owner === player) {
            return 'WAIT_FOR_RESPONSE';
        } else {
            player.payPassingFee();
            return 'END_TURN';
        }
        
    }
}