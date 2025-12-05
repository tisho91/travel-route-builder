import {useGraphContext} from "../Contexts/GraphContext.ts";
import React, {useMemo} from "react";
import {useHandleDragAndDrop} from "./useHandleDragAndDrop.ts";
import {type Node} from '@xyflow/react'
import {Graph} from "../classes/Graph.ts";


export const useGraphFlow = (ref: React.RefObject<HTMLDivElement | null>) => {
    const {graph, updateGraph} = useGraphContext();
    const {onDrop} = useHandleDragAndDrop()

    const onDropWrapper = (event: React.DragEvent) => {
        if (!ref.current) return;
        onDrop(event);

    };

    const nodes = useMemo(() => {
        return Array.from(graph.nodes.values()).map((n): Node => ({
            id: n.id,
            type: n.type,
            position: n.position,
            data: {
                ...n.data
            }
        }));
    }, [graph])

    const serialize = () => {
        const serialized = graph.serialize();
        // console.log('serialized', serialized);
        // console.log(123, Graph.deserialize(serialized));
    }
    // TODO here
    // const onNodesChange = useCallback(
    //     (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    //     [],
    // );
    return {
        onDropWrapper,
        serialize,
        onNodesChange: () => {
        },
        nodes
    }
}