export default class Hospital {
    constructor(position) {
        this.position = position;
        this.players = [];
    }

    hasPlayOn() {
        return this.players.length !== 0
    }
}