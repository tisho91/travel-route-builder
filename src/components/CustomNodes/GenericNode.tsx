import {Handle, Position} from '@xyflow/react';
import styles from './styles.module.css'
import * as React from "react";

interface GenericNodeProps {
    children?: React.ReactNode;
    className?: string;
}

export const GenericNode: React.FC<GenericNodeProps> = ({children, className = ''}) => {
    return (
        <div className={`${styles.genericNode} ${className}`}>
            <Handle type="target" position={Position.Left}/>
            {
                children
            }
            <Handle type="source" position={Position.Right}/>
        </div>
    );
}