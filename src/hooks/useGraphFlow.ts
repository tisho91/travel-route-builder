import {useGraphContext} from "../Contexts/GraphContext.ts";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useHandleDragAndDrop} from "./useHandleDragAndDrop.ts";
import {applyNodeChanges, type Connection, type Edge, type Node, type NodeChange} from "@xyflow/react";

export const useGraphFlow = (ref: React.RefObject<HTMLDivElement | null>) => {
    const {graph, updateGraph} = useGraphContext();
    const {onDrop} = useHandleDragAndDrop();
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


    const onDropWrapper = (event: React.DragEvent) => {
        if (!ref.current) return;
        onDrop(event);

    };


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

    const serialize = () => {
        console.log(graph.getEdges())
    }

    return {
        onDropWrapper,
        nodes: flowNodes,
        edges: flowEdges,
        onNodeDragStop,
        onNodesChange,
        onConnect,
        serialize
    }
}