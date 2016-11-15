import Response from './Response'

export default class NotBuyToolResponse extends Response {
    constructor() {
        super();
    }

    respond(player) {
        return 'END_TURN';
    }
}