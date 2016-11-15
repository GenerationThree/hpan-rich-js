import Response from './Response';

export default class NotBuyLandResponse extends Response{
    constructor() {
        super();
    }


    respond(player) {
        return 'END_TURN';
    }
}