export class Edge {
    from: string;
    to: string;

    constructor({from, to}: Edge) {
        this.from = from;
        this.to = to;
    }
}