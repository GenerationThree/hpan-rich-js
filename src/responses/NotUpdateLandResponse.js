import Response from './Response'

export default class NotUpdateLandResponse extends Response{    
    constructor() {
        super();
    }

    respond(player) {
        return 'END_TURN';
    }
}