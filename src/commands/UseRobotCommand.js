import Command from "./Command";
export default class UseRobotCommand extends Command {
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }


    execute(player) {
        const currentPosition = player.currentLand.position;

        for (let i = 1; i <= 10; i++) {
            this.gameMap.lands[(currentPosition + i) % this.gameMap.lands.length].clearTool();
        }

        return 'WAIT_FOR_COMMAND';
    }
}