import Land from './Land';

export default class NormalLand extends Land {
    constructor(position, price) {
        super(position);
        this.price = price;
        this.level = 0;
    }

    getPassingFee() {
        const basicFee = this.price / 2;
        return basicFee * Math.pow(2, this.level);
    }

    levelUp() {
        this.level++;
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
            : this.level.toString();
    }

}