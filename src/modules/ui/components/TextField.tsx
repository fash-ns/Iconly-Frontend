import type {FunctionComponent, HTMLProps} from "react";
import {useId} from "react";
import styles from "./css/textfield.module.css";

export type TextFieldPropsType = HTMLProps<HTMLInputElement> & {label: string, error?: string | string[]}

const TextField: FunctionComponent<TextFieldPropsType> = (props) => {
    const id = useId();
    const {label, ...inputProps} = props;
    return (<div className={styles.container}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input id={id} className={styles.input} {...inputProps}/>
        {props.error && (<span className={styles.error}>{props.error}</span>)}
    </div>)
}

export default TextField;