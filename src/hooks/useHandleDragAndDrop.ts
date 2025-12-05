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
    const {updateGraph} = useGraphContext()
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

        updateGraph(prevGraph => {
            const newGraph = prevGraph.clone();
            newGraph.addNode({
                position: flowPosition,
                id: data.id,
                type: data.type,
                data: data.nodeSpecific
            });
            return newGraph; // Връщате новата инстанция
        });

    }, [screenToFlowPosition, updateGraph])

    return {
        onDragStart,
        onDragOver,
        onDrop,
    }
}