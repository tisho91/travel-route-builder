import {Background, ReactFlow} from "@xyflow/react";
import {useRef} from "react";
import {useHandleDragAndDrop} from "../../hooks/useHandleDragAndDrop.ts";
import {CountryNode} from "../CustomNodes/CountryNode.tsx";
import {AirportNode} from "../CustomNodes/AirportNode.tsx";
import {useGraphFlow} from "../../hooks/useGraphFlow.ts";


const nodeTypes = {
    country: CountryNode,
    airport: AirportNode,
}

export const GraphCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {
        onNodesChange,
        onNodeDragStop,
        nodes,
        edges,
        onConnect,
        onReconnectEnd,
        onReconnectStart,
        onReconnect
    } = useGraphFlow();


    const {onDragOver, onDropWrapper} = useHandleDragAndDrop(containerRef);
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
                snapToGrid
                onReconnectEnd={onReconnectEnd}
                onReconnectStart={onReconnectStart}
                onReconnect={onReconnect}
            >
                <Background/>
            </ReactFlow>
        </div>
    )
}
