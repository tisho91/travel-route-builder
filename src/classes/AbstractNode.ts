import type {Position} from "../types";

export class AbstractNode<TSpec = object> {
    id: string;
    position: Position;
    type: string
    data: TSpec


    constructor({id, position, type, data}: { id: string, position: Position, type: string, data: TSpec }) {
        this.id = id;
        this.position = position;
        this.type = type;
        this.data = data
    }
}