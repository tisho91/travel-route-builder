import {applyNodeChanges, ReactFlow} from "@xyflow/react";
import {CountryNodeComponent} from "../CustomNodes/CountryNode.tsx";
import {CountryNode} from "../../classes/CountryNode.ts";
import {useCallback, useState} from "react";

const nodesData = [
    new CountryNode({
        id: "node-1",
        type: "country",
        label: "Bulgaria",
        flag: "https://flagcdn.com/w320/bg.png",
        position: {x: 100, y: 100},
    }),
    new CountryNode({
        id: "node-2",
        type: "country",
        label: "Germany",
        flag: "https://flagcdn.com/w320/de.png",
        position: {x: 400, y: 100},
    }),
];

export const Graph = () => {
    const nodeTypes = {
        country: CountryNodeComponent
    }
    const rfNodes = nodesData.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
            name: node.label,
            flag: (node as CountryNode).flag, // cast, защото знаем че е CountryNode
        },
    }));
    const [nodes, setNodes] = useState(rfNodes);
    const onNodesChange = useCallback((changes) => {
            setNodes(prevNodes => applyNodeChanges(changes, prevNodes));
        },
        [],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={[]}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            // onEdgesChange={onEdgesChange}
            fitView
        >
            asd
        </ReactFlow>
    )
}
