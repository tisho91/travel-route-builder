import {Edge} from "./Edge.ts";
import {AbstractNode} from "./AbstractNode.ts";
import type {XYPosition} from "@xyflow/react";
import type {BlockedRoute, EdgeDetails} from "../types";
import {edgeId} from "../utils";


// for testing purposes
const blockedRoutesTest: BlockedRoute[] = [
    {from: "BGR", to: "GRC"},
];


export class Graph {
    private readonly nodes: Map<string, AbstractNode>;
    private readonly edges: Map<string, Edge>;
    private readonly blockedRoutes: BlockedRoute[] = [];

    private constructor(
        nodes?: Map<string, AbstractNode>,
        edges?: Map<string, Edge>,
        blockedRoutes?: BlockedRoute[]
    ) {
        this.nodes = nodes ?? new Map();
        this.edges = edges ?? new Map();
        this.blockedRoutes = blockedRoutes ?? blockedRoutesTest
    }

    static empty(): Graph {
        return new Graph();
    }

    addNode(node: AbstractNode): Graph {
        const newNode = new AbstractNode({...node})
        const newNodes = new Map(this.nodes);
        newNodes.set(newNode.id, newNode);
        return new Graph(newNodes, new Map(this.edges), this.blockedRoutes);
    }

    removeNode(id: string): Graph {

        if (!this.nodes.has(id)) return this;
        this.nodes.delete(id);

        const incoming = Array.from(this.edges.values()).filter(e => e.target === id);
        const outgoing = Array.from(this.edges.values()).filter(e => e.source === id);

        let graph = new Graph(
            new Map(this.nodes),
            new Map(this.edges),
            this.blockedRoutes,
        );

        for (const edge of [...incoming, ...outgoing]) {
            graph = this.removeEdge(edge.id)
        }

        for (const inEdge of incoming) {
            for (const outEdge of outgoing) {
                graph = graph.addEdge({source: inEdge.source, target: outEdge.target});
            }
        }

        return graph;
    }


    updateNodePosition(id: string, position: XYPosition): Graph {
        const node = this.nodes.get(id);
        if (!node) return this;

        const updated = {...node, position};
        const newNodes = new Map(this.nodes);
        newNodes.set(id, updated);

        return new Graph(newNodes, new Map(this.edges), this.blockedRoutes);
    }

    addEdge({source, target}: EdgeDetails): Graph {
        const newEdges = new Map(this.edges);
        const id = edgeId({source, target});
        if (this.blockedRoutes.some(r => r.from === source && r.to === target)) {
            console.warn(`Blocked route: ${source} → ${target}`);
            return this;
        }
        if (this.createsCycle({source, target})) {
            console.warn('Creating edge cycle');
            return this;
        }
        const newEdge = new Edge({
            source,
            target,
            id
        })
        newEdges.set(id, newEdge);
        return new Graph(new Map(this.nodes), newEdges);
    }

    private createsCycle({source, target}: EdgeDetails) {
        const visited = new Set<string>();
        const dfs = (current: string): boolean => {
            if (current === source) return true;
            if (visited.has(current)) return false;
            visited.add(current);
            for (const edge of this.edges.values()) {
                if (edge.source === current) {
                    if (dfs(edge.target)) return true;
                }
            }
            return false;
        };
        return dfs(target);
    }

    removeEdge(id: string): Graph {
        const newEdges = new Map(this.edges);
        newEdges.delete(id);
        return new Graph(new Map(this.nodes), newEdges, this.blockedRoutes);
    }


    getNodes(): AbstractNode[] {
        return [...this.nodes.values()];
    }

    getEdges(): Edge[] {
        return [...this.edges.values()];
    }


    serialize(): string {
        return JSON.stringify({
            nodes: this.getNodes(),
            edges: this.getEdges(),
            blockedRoutes: this.blockedRoutes
        });
    }

    static deserialize(json: string): Graph {
        const obj = JSON.parse(json);
        const nodes = new Map<string, AbstractNode>(obj.nodes.map((n: AbstractNode) => [n.id, n]));
        const edges = new Map<string, Edge>(obj.edges.map((e: Edge) => [e.id, e]));
        const blockedRoutes = obj.blockedRoutes
        return new Graph(nodes, edges, blockedRoutes);
    }
}