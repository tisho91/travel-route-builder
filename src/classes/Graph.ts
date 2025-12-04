import {Edge} from "./Edge.ts";
import {AbstractNode} from "./AbstractNode.ts";
import {CountryNode} from "./CountryNode.ts";
import type {CountryNodeData} from "../types";


type SerializedNodeData = CountryNodeData

export class Graph {
    nodes: Set<AbstractNode>
    edges: Edge[]


    constructor() {
        this.nodes = new Set();
        this.edges = [];
    }

    addNode(node: AbstractNode) {
        this.nodes.add(node)
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
    }


    serialize() {
        return JSON.stringify({
            nodes: Array.from(this.nodes),
            edges: this.edges
        });
    }


    static deserialize(jsonString: string): Graph {
        const obj: {
            nodes: SerializedNodeData[];
            edges: Edge[];
        } = JSON.parse(jsonString);
        const graph: Graph = new Graph();
        obj.edges.forEach((edge: Edge) => {
            graph.addEdge(new Edge({...edge}));
        })
        obj.nodes.forEach(node => {
            this.deserializeNode(node, graph);
        })

        return graph;
    }

    private static deserializeNode(node: SerializedNodeData, graph: Graph) {
        switch (node.type) {
            case "country" : {
                const countryNode = new CountryNode(node);
                graph.addNode(countryNode);
            }
        }
    }
}