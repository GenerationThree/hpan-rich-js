import Land from "./Land";

export default class Mine extends Land{
    constructor(position, points) {
        super(position);
        this.points = points;
    }
}