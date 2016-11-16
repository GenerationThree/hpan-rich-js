import Land from './Land';

export default class Mine extends Land{
    constructor(position, points) {
        super(position);
        this.points = points;
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
            :"$"
    }
}