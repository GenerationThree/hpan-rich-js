import Response from './Response'

export default class UpdateLandResponse extends Response{
    constructor() {
        super();
    }

    respond(player) {
        player.updateCurrentLand();
        return 'END_TURN';
    }
}