import Response from './Response'

export default class BuyToolResponse extends Response {
    constructor(toolId) {
        super();
        this.toolId = toolId;
    }


    respond(player) {
        player.buyTool(this.toolId);
        return 'END_TURN';
    }
}