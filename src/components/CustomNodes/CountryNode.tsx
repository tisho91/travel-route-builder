import {GenericNode} from "./GenericNode.tsx";
import styles from './styles.module.css'
import * as React from "react";

export interface CountryData {
    flag: string;
    name: string;
}

export const CountryNodeComponent: React.FC<{ data: CountryData }> = ({data}) => {
    return (
        <GenericNode className={styles.countryNode}>
            <img src={data.flag} alt={data.name} />
            <span>{data.name}</span>
        </GenericNode>
    );
};