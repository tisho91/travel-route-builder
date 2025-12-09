import {GenericNode} from "./GenericNode.tsx";
import styles from "./styles.module.css";

export interface AirportData {
    label: string;
}

export interface AirportNodeProps {
    id: string;
    data: AirportData;
}

export const AirportNode = ({id, data}: AirportNodeProps) => {
    return (
        <GenericNode className={styles.airportNode} nodeId={id}>
            <span>Airport {data.label}</span>
        </GenericNode>
    );
};