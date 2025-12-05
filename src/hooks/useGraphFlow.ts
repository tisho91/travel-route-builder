import {useGraphContext} from "../Contexts/GraphContext.ts";
import React, {useCallback, useState} from "react";
import {useHandleDragAndDrop} from "./useHandleDragAndDrop.ts";
import {applyNodeChanges, type Node, type NodeChange} from '@xyflow/react'
import {Graph} from "../classes/Graph.ts";


export const useGraphFlow = (ref: React.RefObject<HTMLDivElement | null>) => {
    const {graph} = useGraphContext();
    const {onDrop} = useHandleDragAndDrop()


    const [nodes, setNodes] = useState<Node[]>([]);


    const onDropWrapper = (event: React.DragEvent) => {
        if (!ref.current) return;
        onDrop(event);
        const rfNodes: Node[] = Array.from(graph.nodes.values()).map((n): Node => ({
            id: n.id,
            type: n.type,
            position: n.position,
            data: {
                ...n.data
            }
        }));
        setNodes(rfNodes);
    };

    const serialize = () => {
        const serialized = graph.serialize();
        console.log('serialized', serialized);
        console.log(123, Graph.deserialize(serialized));
    }

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes(prevNodes => {
            changes.forEach(change => {
                if ('id' in change) {
                    const nodeInGraph = graph.nodes.get(change.id);
                    if (!nodeInGraph) return;

                    if (change.type === 'position' && change.position) {
                        nodeInGraph.position = change.position;
                    }
                }
            });

            return applyNodeChanges(changes, prevNodes);
        });
    }, [graph]);
    return {
        onDropWrapper,
        serialize,
        onNodesChange,
        nodes
    }
}