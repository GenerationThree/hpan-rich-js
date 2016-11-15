import Command from './Command'

export default class RollCommand extends Command{
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }
    
    execute(player) {
        player.currentLand = this.gameMap.move();
        let currentLand = player.currentLand;
        if (currentLand.owner === undefined || currentLand.owner === player) {
            return 'WAIT_FOR_RESPONSE';
        } else {
            player.payPassingFee();
            return 'END_TURN';
        }
        
    }
}