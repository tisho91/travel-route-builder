import * as React from "react";
import {useCallback} from "react";
import {useReactFlow} from "@xyflow/react";
import {useGraphContext} from "../Contexts/GraphContext.ts";

export interface NodeData<TNodeSpecific> {
    id: string;
    type: string;
    nodeSpecific: TNodeSpecific;
}

export const useHandleDragAndDrop = <TNodeSpecific>() => {
    const {graph} = useGraphContext()
    const {screenToFlowPosition} = useReactFlow();
    const onDragStart = useCallback((event: React.DragEvent, nodeData: NodeData<TNodeSpecific>) => {
        event.dataTransfer.setData("nodeData", JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = "move";
    }, []);


    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
        const data = JSON.parse(event.dataTransfer.getData("nodeData"));
        const flowPosition = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });

        graph.addNode({
            position: flowPosition,
            id: data.id,
            type: data.type,
            data: data.nodeSpecific
        })

    }, [graph, screenToFlowPosition])

    return {
        onDragStart,
        onDragOver,
        onDrop,
        graph
    }
}