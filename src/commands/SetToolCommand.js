import Command from "./Command";

export default class SetToolCommand extends Command {
    constructor(id, position, gameMap) {
        super();
        this.id = id;
        this.position = position;
        this.gameMap = gameMap;
    }
    
    execute(player) {
        let targetLand = this.gameMap.lands[this.position];
        
        if (this.id === 1 && !targetLand.hasPlayerOn()) {
            targetLand.isBlockered = true;
        }
        if (this.id === 3 && !targetLand.hasPlayerOn()) {
            targetLand.isBombed = true;
        }
        return 'WAIT_FOR_COMMAND';
    }
}