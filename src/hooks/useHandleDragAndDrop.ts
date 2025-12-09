import {type RefObject, type DragEvent, useCallback} from "react";
import {useReactFlow} from "@xyflow/react";
import {useGraphContext} from "../Contexts/GraphContext.ts";
import {AbstractNode} from "../classes/AbstractNode.ts";

export interface NodeData<TNodeSpecific> {
    id: string;
    type: string;
    nodeSpecific: TNodeSpecific;
}

export const useHandleDragAndDrop = <TNodeSpecific>(ref?: RefObject<HTMLDivElement | null>) => {
    const {updateGraph} = useGraphContext()
    const {screenToFlowPosition} = useReactFlow();
    const onDragStart = useCallback((event: DragEvent, nodeData: NodeData<TNodeSpecific>) => {
        event.dataTransfer.setData("nodeData", JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = "move";
    }, []);


    const onDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event: DragEvent) => {
        const data = JSON.parse(event.dataTransfer.getData("nodeData"));
        const flowPosition = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });

        const newNode = new AbstractNode({
            position: flowPosition,
            id: data.id,
            type: data.type,
            data: data.nodeSpecific
        })

        updateGraph((prevGraph) =>
            prevGraph.addNode(newNode)
        );

    }, [screenToFlowPosition, updateGraph])

    const onDropWrapper = (event: DragEvent) => {
        if (!ref?.current) return;
        onDrop(event);
    };

    return {
        onDragStart,
        onDragOver,
        onDrop,
        onDropWrapper
    }
}