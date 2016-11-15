export default class Player {
    constructor(id, initMoney) {
        this.id = id;
        this.money = initMoney;
        this.points = 0;
        this.status = 'WAIT_FOR_COMMAND';
        this.tools = [];
        this.maxToolNum = 10;
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
        if (this.canPayMoney(this.currentLand.price)) {
            this.currentLand.owner = this;
            this.payMoney(this.currentLand.price);
            this.lands.push(this.currentLand);
        }   
    }

    updateCurrentLand() {
        const currentLevel = this.currentLand.level;
        
        if (currentLevel < 3 && this.canPayMoney(this.currentLand.price)) {
            this.levelUp();
            this.payMoney(this.currentLand.price);
        }
    }

    buyTool(toolId) {
        const points = this.currentLand.getTool(toolId).points;
        
        if (this.canPayPoints(points) && !this.isToolBagFull()) {
            this.payPoints(points);
            this.tools.push(this.currentLand.getTool());
        }
    }
    
    payMoney(price) {
        this.money -= price;
    }

    payPoints(points) {
        this.points -= points;
    }
    
    canPayMoney(price) {
        return this.money >= price;
    }
    
    canPayPoints(points) {
        return this.points >= points;
    }
    
    earn(price) {
        this.money += price;
    }

    payPassingFee() {
        if (!this.isLucky && !this.currentLand.owner.isInPrison) {
            const passingFee = this.currentLand.getPassingFee();
            this.payMoney(passingFee);
            this.currentLand.owner.earn(passingFee);
        }
    }
    
    hasLand(land) {
        return this.lands.indexOf(land) !== -1;
    }
    
    hasTool(tool) {
        return this.tools.indexOf(tool) !== -1;
    }

    isToolBagFull() {
        return this.tools.length === this.maxToolNum;
    }

    levelUp() {
        this.currentLand.level++;
    }
}