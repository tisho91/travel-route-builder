import styles from "../styles.module.css";
import type {Country} from "../../../types";
import {useHandleDragAndDrop} from "../../../hooks/useHandleDragAndDrop.ts";
import {type DragEvent} from 'react'

interface CountryNode {
    label: string;
    flag: string;
    flagAlt: string;
}

export const CountryItem = ({flags, name, cca3}: Country) => {
    const {onDragStart} = useHandleDragAndDrop<CountryNode>()

    const nodeData = {
        id: cca3,
        type: "country",
        nodeSpecific: {
            label: name.common,
            flag: flags.svg,
            flagAlt: flags.alt,
        }
    }
    return (
        <li
            className={styles.countryItem}
            draggable
            onDragStart={(event: DragEvent) => onDragStart(event, nodeData)}

        >
            <img src={flags.svg} alt={flags.alt} className={styles.flag}/>
            <span>{name.common}</span>
        </li>
    );
};
