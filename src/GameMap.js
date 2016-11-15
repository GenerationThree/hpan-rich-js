export default class GameMap {
    constructor(...lands) {
        this.lands =  lands;
    }

    move(currentLand, step) {
        const currentPosition = currentLand.position;
        const nextPosition = (currentPosition + step) % this.lands.length;
        return this.lands[nextPosition]
    }
}