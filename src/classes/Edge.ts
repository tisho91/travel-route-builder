export class Edge {
    source: string;
    target: string;
    id: string;

    constructor({source, target, id}: Edge) {
        this.source = source;
        this.target = target;
        this.id = id;
    }
}