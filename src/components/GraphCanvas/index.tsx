import {ReactFlow} from "@xyflow/react";
import {useRef} from "react";
import {useHandleDragAndDrop} from "../../hooks/useHandleDragAndDrop.ts";
import {CountryNodeComponent} from "../CustomNodes/CountryNode.tsx";
import {useGraphFlow} from "../../hooks/useGraphFlow.ts";


const nodeTypes = {
    country: CountryNodeComponent
}

export const GraphCanvas = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const {nodes, onDropWrapper, serialize, onNodesChange} = useGraphFlow(containerRef);
    const {onDragOver} = useHandleDragAndDrop();
    return (
        <div
            style={{flexGrow: 1, height: '100%'}}
            ref={containerRef}
            onDragOver={onDragOver}
            onDrop={onDropWrapper}
        >
            <ReactFlow
                nodes={nodes}
                edges={[]}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                fitView
            >
            </ReactFlow>
        </div>
    )
}
