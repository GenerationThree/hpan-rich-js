import Command from "./Command";

export default class QueryCommand extends Command {
    constructor() {
        super();
    }
    
    execute(player) {
        player.getInfo();
        return 'WAIT_FOR_COMMAND';
    }
}