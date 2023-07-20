import styles from "../css/auth-root.module.css";
import type {ReactNode} from "react";

export default function AuthRoot({children}: {children: ReactNode}) {
    return (<div className={styles.background}>
        <div className="container xs fixed-width">
            <div className={styles.card}>
                {children}
            </div>
        </div>
    </div>)
}