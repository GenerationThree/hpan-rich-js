import NormalLand from "./lands/NormalLand";

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
        this.luckyRounds = 0;
        this.isInPrison = false;
        this.isInHospital = false;
        this.byeRoundLeft = 0;
        this.currentLand = new NormalLand(0);

        if (id === 1) {
            this.name = "钱夫人";
            this.symbol = "Q";
        }
        if (id === 2) {
            this.name = "阿土伯";
            this.symbol = "A";
        }
        if (id === 3) {
            this.name = "孙小美";
            this.symbol = "S";
        }
        if (id === 4) {
            this.name = "金贝贝";
            this.symbol = "J";
        }
    }
    
    execute(command) {
        this.status = command.execute(this);
    }
    
    respond(response) {
        this.status = response.respond(this);
    }

    getInfo() {
        let info = '';

        info += 'name:' + this.name;
        info += '\n';
        info += 'money:' + this.money;
        info += '\n';
        info += 'points:' + this.points;
        info += '\n';
        info += 'tools:' + this.tools;
        info += '\n';
        info += 'lands:' + this.lands;
        info += '\n';
        
        this.info = info;
    }

    moveTo(land) {
        this.currentLand.players.pop(this);
        this.currentLand = land;
        land.players.push(this);
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
            this.currentLand.levelUp();
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

    getGift(giftId) {
        if (giftId === 1) {
            this.earnMoney(2000);
        }
        if (giftId === 2) {
            this.earnPoints(200);
        }
        if (giftId === 3) {
            this.becomeLucky();
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
    
    earnMoney(price) {
        this.money += price;
    }

    earnPoints(points) {
        this.points += points;
    }
    
    payPassingFee() {
        if (!this.isLucky && !this.currentLand.owner.isInPrison) {
            const passingFee = this.currentLand.getPassingFee();
            this.payMoney(passingFee);
            this.currentLand.owner.earnMoney(passingFee);
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

    becomeLucky() {
        this.isLucky = true;
        this.luckyRounds = 5;
    }

    imprisoned() {
        this.isInPrison = true;
        this.byeRoundLeft = 2;
    }
    
    hospitalised() {
        this.isInHospital = true;
        this.byeRoundLeft = 3;
    }
    
    roll(dice) {
        return dice.next();
    }
}