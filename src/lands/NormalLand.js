export default class NormalLand {
    constructor(position, price) {
        this.position = position;
        this.price = price;
        this.level = 0;
    }

    getPassingFee() {
        const basicFee = this.price / 2;
        return basicFee * Math.pow(2, this.level);
    }
}