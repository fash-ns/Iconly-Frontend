import type {FunctionComponent} from "react";
import styles from "../css/icon-card.module.css";
import {memo} from "react";

export interface IconCardPropsType {
    selected: boolean;
    onClick: () => void;
    image: string;
    name: string
}

const IconCard: FunctionComponent<IconCardPropsType> = (props) => (
    <div className={styles.card + ' ' + (props.selected ? styles.selected : '')}
         onClick={props.onClick}>
        <img alt="" src={props.image}/>
        <span>{props.name}</span>
    </div>
)

export default IconCard;