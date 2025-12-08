import type {XYPosition} from "@xyflow/react";
import type {NodeType} from "../types";

export class AbstractNode<TSpec = object> {
    id: string;
    position: XYPosition;
    type: NodeType
    data: TSpec


    constructor({id, position, type, data}: { id: string, position: XYPosition, type: NodeType, data: TSpec }) {
        this.id = id;
        this.position = position;
        this.type = type;
        this.data = data
    }
}