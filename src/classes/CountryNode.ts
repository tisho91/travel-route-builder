import {AbstractNode} from "./AbstractNode.ts";
import type {CountryNodeData} from "../types";


export class CountryNode extends AbstractNode {
    flag: string;


    constructor(data: CountryNodeData) {
        super(data);
        this.flag = data.flag;
    }
}