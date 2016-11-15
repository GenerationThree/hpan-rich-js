import Command from './Command'

export default class SellLandCommand extends Command {
    
    constructor(position) {
        super();
        this.position = position;
    }

    execute(player) {
        const targetIndex = player.lands.findIndex((land) => {
            return land.position === this.position;
        });
        
        if (targetIndex !== -1) {
            player.lands.splice(targetIndex, 1);
        }
        return 'WAIT_FOR_COMMAND';
    }
}