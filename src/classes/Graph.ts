import {Edge} from "./Edge.ts";
import {AbstractNode} from "./AbstractNode.ts";
import type {XYPosition} from "@xyflow/react";
import type {BlockedRoute, EdgeDetails} from "../types";


export class Graph {
    private readonly nodes: Map<string, AbstractNode>;
    private readonly edges: Map<string, Edge>;
    private blockedRoutes: BlockedRoute[] = [];

    private constructor(
        nodes?: Map<string, AbstractNode>,
        edges?: Map<string, Edge>,
        blockedRoutes?: BlockedRoute[]
    ) {
        this.nodes = nodes ?? new Map();
        this.edges = edges ?? new Map();
        this.blockedRoutes = blockedRoutes ?? []
    }

    static empty(): Graph {
        return new Graph();
    }

    addNode(node: AbstractNode): Graph {
        const newNode = new AbstractNode({...node})
        const newNodes = new Map(this.nodes);
        newNodes.set(newNode.id, newNode);
        return new Graph(newNodes, new Map(this.edges));
    }

    removeNode(id: string): Graph {
        const newNodes = new Map(this.nodes);
        const newEdges = new Map(this.edges);

        newNodes.delete(id);

        for (const [key, e] of newEdges) {
            if (e.source === id || e.target === id) {
                newEdges.delete(key);
            }
        }

        return new Graph(newNodes, newEdges);
    }

    updateNodePosition(id: string, position: XYPosition): Graph {
        const node = this.nodes.get(id);
        if (!node) return this;

        const updated = {...node, position};
        const newNodes = new Map(this.nodes);
        newNodes.set(id, updated);

        return new Graph(newNodes, new Map(this.edges));
    }

    addEdge({source, target}: EdgeDetails): Graph {
        const newEdges = new Map(this.edges);
        const id = `${source}-${target}`;
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

    removeEdge({source, target}: EdgeDetails): Graph {
        const newEdges = new Map(this.edges);
        newEdges.delete(`${source}-${target}`);
        return new Graph(new Map(this.nodes), newEdges);
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
            edges: this.getEdges()
        });
    }

    static deserialize(json: string): Graph {
        const obj = JSON.parse(json);
        const nodes = new Map<string, AbstractNode>(obj.nodes.map((n: AbstractNode) => [n.id, n]));
        const edges = new Map<string, Edge>(obj.edges.map((e: Edge) => [e.id, e]));
        return new Graph(nodes, edges);
    }
}