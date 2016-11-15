import Response from './Response'

export default class BuyLandResponse extends Response{
    constructor() {
        super();
    }
    
    respond(player) {
        player.buyCurrentLand();
        return 'END_TURN';
    }
}