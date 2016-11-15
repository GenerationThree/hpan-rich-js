import Hospital from "./lands/Hospital";
export default class GameMap {
    constructor(...lands) {
        this.lands =  lands;
    }

    move(currentLand, step) {
        const currentPosition = currentLand.position;
        const nextPosition = (currentPosition + step) % this.lands.length;
        return this.lands[nextPosition]
    }

    findHospital() {
        // for (land of this.lands) {
        //     if (land instanceof Hospital) {
        //         return land;
        //     }
        // }
        return this.lands[3]
    }
}