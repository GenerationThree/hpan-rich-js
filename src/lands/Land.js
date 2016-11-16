export default class Land {
    constructor(position) {
        this.position = position;
        this.isBlockered = false;
        this.isBombed = false;
        this.players = []
    }

    hasPlayerOn() {
        return this.players.length !== 0
    }

    clearTool() {
        this.isBlockered = false;
        this.isBombed = false;
    }
    
}