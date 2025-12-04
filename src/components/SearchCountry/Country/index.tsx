import styles from "../styles.module.css";
import type {Country} from "../../../types";
import {useHandleDragAndDropCountry} from "../../../hooks/useHandleDragAndDropCountry.tsx";

export const CountryItem = ({flags, name}: Country) => {
    const {onDragStart} = useHandleDragAndDropCountry()

    return (
        <li
            className={styles.countryItem}
            draggable
            onDragStart={(event) => onDragStart(event, {flags, name})}

        >
            <img src={flags.svg} alt={flags.alt} className={styles.flag}/>
            <span>{name.common}</span>
        </li>
    );
};
