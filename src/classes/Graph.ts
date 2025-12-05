import {Edge} from "./Edge.ts";
import {AbstractNode} from "./AbstractNode.ts";


export class Graph {
    nodes: Map<string, AbstractNode> = new Map();
    edges: Edge[]


    constructor() {
        this.nodes = new Map();
        this.edges = [];
    }

    addNode(nodeData: AbstractNode) {
        const node = new AbstractNode(nodeData);
        this.nodes.set(nodeData.id, node)
    }

    addEdge(edgeData: Edge) {
        const edge = new Edge(edgeData);
        this.edges.push(edge);
    }

    public clone(): Graph {
        const newGraph = new Graph();
        newGraph.nodes = new Map(this.nodes);
        newGraph.edges = [...this.edges];

        return newGraph;
    }


    serialize() {
        return JSON.stringify({
            nodes: Array.from(this.nodes.values()),
            edges: this.edges
        });
    }


    static deserialize(jsonString: string): Graph {
        const obj: {
            nodes: [];
            edges: Edge[];
        } = JSON.parse(jsonString);
        const graph: Graph = new Graph();
        obj.edges.forEach((edge: Edge) => {
            graph.addEdge({...edge});
        })
        obj.nodes.forEach((node: AbstractNode) => {
            graph.addNode(node);
        })


        return graph;
    }


}