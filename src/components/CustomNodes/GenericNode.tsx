import {Handle, Position} from '@xyflow/react';
import styles from './styles.module.css'
import {useGraphContext} from "../../Contexts/GraphContext.ts";
import {type ReactNode} from "react";

interface GenericNodeProps {
    children?: ReactNode;
    className?: string;
    nodeId: string;
}

export const GenericNode = ({children, className = '', nodeId}: GenericNodeProps) => {
    const {updateGraph} = useGraphContext()
    const removeNode = () => {
        updateGraph(prev => prev.removeNode(nodeId))
    }
    return (
        <div className={`${styles.genericNode} ${className}`}>
            <button className={styles.removeButton} onClick={removeNode}>✕</button>
            <Handle type="target" position={Position.Left}/>
            {
                children
            }
            <Handle type="source" position={Position.Right}/>
        </div>
    );
}