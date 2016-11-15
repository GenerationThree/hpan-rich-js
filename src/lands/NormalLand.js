export default class NormalLand {
    constructor(position, price) {
        this.position = position;
        this.price = price;
        this.level = 0;
        this.isBlockered = false;
        this.isBombed = false;
        this.players = []; 
    }

    getPassingFee() {
        const basicFee = this.price / 2;
        return basicFee * Math.pow(2, this.level);
    }

    levelUp() {
        this.level++;
    }

    hasPlayOn() {
        return this.players.length !== 0
    }

    clearTool() {
        this.isBlockered = false;
        this.isBombed = false;
    }

}