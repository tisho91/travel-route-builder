import type {AbstractNodeData, Position} from "../types";

export abstract class AbstractNode {
    id: string;
    label: string;
    position: Position;
    type: string

    protected constructor({id, position, label, type}: AbstractNodeData) {
        this.id = id;
        this.label = label;
        this.position = position;
        this.type = type;
    }

}