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
        for (let land of this.lands) {
            if (land instanceof Hospital) {
                return land;
            }
        }
    }
    
    getSymbols(currentPlayer) {
        let symbols =  this.lands.map((land) => {
            return land.position === currentPlayer.currentLand.position ?
                currentPlayer.symbol :
                land.getSymbol();
        })
        
        return symbols;
    }
}