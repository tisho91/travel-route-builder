import {GenericNode} from "./GenericNode.tsx";
import styles from './styles.module.css'

export interface CountryData {
    flag: string;
    label: string;
    flagAlt: string;
}

export interface CountryNodeProps {
    id: string;
    data: CountryData;
}

export const CountryNodeComponent = ({id, data}: CountryNodeProps) => {
    return (
        <GenericNode className={styles.countryNode} nodeId={id}>
            <img src={data.flag} alt={data.flagAlt}/>
            <span>{data.label}</span>
        </GenericNode>
    );
};