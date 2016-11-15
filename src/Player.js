export default class Player {
    constructor(id, initMoney) {
        this.id = id;
        this.money = initMoney;
        this.status = 'WAIT_FOR_COMMAND';
        this.tools = [];
        this.lands = [];
        this.isLucky = false;
        this.isInPrison = false;
    }
    
    execute(command) {
        this.status = command.execute(this);
    }
    
    respond(response) {
        this.status = response.respond(this);
    }

    buyCurrentLand() {
        if (this.canPay(this.currentLand.price)) {
            this.currentLand.owner = this;
            this.pay(this.currentLand.price);
            this.lands.push(this.currentLand);
        }   
    }

    updateCurrentLand() {
        let currentLevel = this.currentLand.level;
        
        if (currentLevel < 3 && this.canPay(this.currentLand.price)) {
            this.levelUp();
            this.pay(this.currentLand.price);
        }
    }
    
    pay(price) {
        this.money -= price;
    }
    
    
    canPay(price) {
        return this.money >= price;
    }
    
    earn(price) {
        this.money += price;
    }

    payPassingFee() {
        if (!this.isLucky && !this.currentLand.owner.isInPrison) {
            const passingFee = this.currentLand.getPassingFee();
            this.pay(passingFee);
            this.currentLand.owner.earn(passingFee);
        }
    }
    
    hasLand(land) {
        return this.lands.indexOf(land) !== -1;
    }

    levelUp() {
        this.currentLand.level++;
    }
}