import Command from './Command'
import ToolHouse from '../lands/ToolHouse'
import GiftHouse from "../lands/GiftHouse";
import Prison from "../lands/Prison";
import Mine from "../lands/Mine";
import Hospital from "../lands/Hospital";

export default class RollCommand extends Command{
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }
    
    
    execute(player) {
        if ((player.currentLand instanceof Prison || player.currentLand instanceof Hospital)  && player.byeRoundLeft > 0) {
            player.byeRoundLeft --;
        } else {
            const step = player.roll();
            
            for (let i = 1; i <= step; i++) {
                const nextLand = this.gameMap.move(player.currentLand, i);
                if (nextLand.isBlockered) {
                    player.moveTo(nextLand);
                    nextLand.isBlockered = false;
                    return 'END_TURN';
                }

                if (nextLand.isBombed) {
                    player.moveTo(this.gameMap.findHospital());
                    player.hospitalised();
                    nextLand.isBombed = false;
                    return 'END_TURN';
                }
            }
            
            player.moveTo(this.gameMap.move(player.currentLand, step));
            player.isInPrison = false;
            player.isInHospital = false;
        }
        
        let currentLand = player.currentLand;
        
        if (currentLand instanceof ToolHouse) {
            return 'WAIT_FOR_RESPONSE';
        }

        if (currentLand instanceof GiftHouse) {
            return 'WAIT_FOR_RESPONSE';
        }

        if (currentLand instanceof Mine) {
            player.earnPoints(currentLand.points);
            return 'END_TURN';
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