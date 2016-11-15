import Land from "./Land";

export default class NormalLand extends Land{
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
  
}