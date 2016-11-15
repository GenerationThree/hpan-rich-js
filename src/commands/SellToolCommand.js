export default class SellToolCommand {
    constructor(id) {
        this.id = id;
    }


    execute(player) {
        const targetIndex = player.tools.findIndex((tool) => {
            return tool.id === this.id
        });
        
        if (targetIndex !== -1) {
            player.tools.splice(targetIndex, 1);
        }
        
        return 'WAIT_FOR_COMMAND';
    }
}