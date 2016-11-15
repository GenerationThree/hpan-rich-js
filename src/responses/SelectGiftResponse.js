import Response from "./Response";

export default class SelectGiftResponse extends Response {
    constructor(giftId) {
        super();
        this.giftId = giftId;
    }


    respond(player) {
        player.getGift(this.giftId);
        return 'END_TURN';
    }
}