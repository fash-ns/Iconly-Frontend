import type {FunctionComponent} from "react";
import styles from "./css/progress.module.css";

const Progress: FunctionComponent<{size: number}> = (props) => (
    <div className={styles.root} style={{width: props.size, height: props.size}}/>
)

export default Progress;