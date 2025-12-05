import {GenericNode} from "./GenericNode.tsx";
import styles from './styles.module.css'
import * as React from "react";

export interface CountryData {
    flag: string;
    label: string;
    flagAlt: string;
}

export const CountryNodeComponent: React.FC<{ data: CountryData }> = ({data}) => {
    return (
        <GenericNode className={styles.countryNode}>
            <img src={data.flag} alt={data.flagAlt} />
            <span>{data.label}</span>
        </GenericNode>
    );
};