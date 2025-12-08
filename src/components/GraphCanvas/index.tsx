import {Background, ReactFlow} from "@xyflow/react";
import {useRef} from "react";
import {useHandleDragAndDrop} from "../../hooks/useHandleDragAndDrop.ts";
import {CountryNodeComponent} from "../CustomNodes/CountryNode.tsx";
import {useGraphFlow} from "../../hooks/useGraphFlow.ts";


const nodeTypes = {
    country: CountryNodeComponent
}

export const GraphCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {
        onDropWrapper,
        onNodesChange,
        onNodeDragStop,
        nodes,
        edges,
        onConnect,
    } = useGraphFlow(containerRef);


    const {onDragOver} = useHandleDragAndDrop();
    return (
        <div
            style={{flex: 1, position: 'relative'}}
            ref={containerRef}
            onDragOver={onDragOver}
            onDrop={onDropWrapper}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeDragStop={onNodeDragStop}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
                fitView
            >
                <Background/>
            </ReactFlow>
        </div>
    )
}
