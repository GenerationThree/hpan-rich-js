export default class Player {
    constructor(id) {
        this.id = id;
        this.status = "WAIT_FOR_COMMAND";
        this.tools = [];
        this.lands = [];
    }
    
    execute(command) {
        this.status = command.execute(this);
    }
    
    respond(response) {
        this.status = response.respond(this);
    }
    
}