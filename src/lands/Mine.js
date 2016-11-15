export default class Mine {
    constructor(position, points) {
        this.position = position;
        this.points = points;
        this.players = [];
    }

    hasPlayOn() {
        return this.players.length !== 0
    }
}