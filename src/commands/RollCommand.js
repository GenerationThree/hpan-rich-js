import Command from './Command'
import ToolHouse from '../lands/ToolHouse'
import GiftHouse from "../lands/GiftHouse";
import Prison from "../lands/Prison";
import Mine from "../lands/Mine";
import Hospital from "../lands/Hospital";
import Dice from '../Dice'

export default class RollCommand extends Command {
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
        this.dice = new Dice();
    }

    execute(player) {
        if ((player.currentLand instanceof Prison || player.currentLand instanceof Hospital) && player.byeRoundLeft > 0) {
            player.byeRoundLeft--;
        } else {
            player.isInPrison = false;
            player.isInHospital = false;
            
            const step = player.roll(this.dice);
            let nextLand;


            for (let i = 1; i <= step; i++) {
                nextLand = this.gameMap.move(player.currentLand, i);
                
                if (nextLand.isBlockered) {
                    nextLand.isBlockered = false;
                    break;
                }

                if (nextLand.isBombed) {
                    nextLand.isBombed = false;
                    nextLand =  this.gameMap.findHospital();
                    player.hospitalised();
                    break;
                }
            }

            player.moveTo(nextLand);
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
                player.imprisoned();
            }
            return 'END_TURN';
        }

        if (currentLand instanceof Hospital) {
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