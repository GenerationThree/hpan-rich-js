import Land from './Land';

export default class GiftHouse extends Land{
    constructor(position) {
        super(position);
    }

    getSymbol() {
        if (this.isBlockered) {
            return "#";
        }
        if (this.isBombed) {
            return "@";
        }

        return this.hasPlayerOn() ?
            this.players[0].symbol
            :"G"
    }
}