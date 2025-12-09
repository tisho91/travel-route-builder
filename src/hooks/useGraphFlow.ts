import {useGraphContext} from "../Contexts/GraphContext.ts";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {applyNodeChanges, type Connection, type Edge, type Node, type NodeChange} from "@xyflow/react";

export const useGraphFlow = () => {
    const {graph, updateGraph} = useGraphContext();
    const edgeReconnectSuccessful = useRef(true);
    const nodes = useMemo(() => graph.getNodes().map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
            ...node.data
        }
    })), [graph]);

    const edges = useMemo(() => {
        return graph.getEdges().map((edge) => {
            return {
                ...edge,
                markerEnd: {type: 'arrow'},
                label: `${edge.source} -> ${edge.target}`,
                reconnectable: 'source'
            }
        })
    }, [graph]);
    const [flowNodes, setFlowNodes] = useState<Node[]>([]);
    const [flowEdges, setFlowEdges] = useState<Edge[]>([]);

    useEffect(() => {
        setFlowNodes(nodes);
    }, [nodes]);

    useEffect(() => {
        setFlowEdges(edges as Edge[]);
    }, [edges]);


    const onNodeDragStop = (_event: React.MouseEvent, node: Node) => {
        updateGraph(prev => prev.updateNodePosition(node.id, node.position));
    };


    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setFlowNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    );

    const onConnect = useCallback((connection: Connection) => {
        if (!connection.source || !connection.target) return;
        const newEdge = {
            source: connection.source,
            target: connection.target,
        };
        updateGraph(prev => prev.addEdge(newEdge));
    }, [updateGraph]);

    const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        updateGraph(prev => prev.removeEdge(oldEdge.id));
        updateGraph(prev => prev.addEdge({
            source: newConnection.source,
            target: newConnection.target
        }));
    }, [updateGraph]);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            updateGraph(prev => prev.removeEdge(edge.id));
        }

        edgeReconnectSuccessful.current = true;
    }, [updateGraph]);


    return {
        nodes: flowNodes,
        edges: flowEdges,
        onNodeDragStop,
        onNodesChange,
        onConnect,
        onReconnect,
        onReconnectEnd,
        onReconnectStart

    }
}