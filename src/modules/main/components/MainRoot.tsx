import {Outlet} from "react-router-dom";
import styles from "../css/main-root.module.css";
import {useAuth, useAuthMutate} from "../../auth/hooks/auth";
import Button from "../../ui/components/Button";
import axios from "axios";
import {removeUserInfo} from "../../auth/userDataActions";

export function MainRoot() {
    const auth = useAuth();
    const dispatch = useAuthMutate();

    const handleLogout = () => {
        axios.post('/auth/logout').then(() => {
            dispatch(removeUserInfo());
        }).catch(console.error)
    }

    return (
        <div>
        <div className={styles.header}>
            <div className={`container xl ${styles.container}`}>
                <span>
                    {auth.user?.name} - {auth.user?.email}
                </span>
                <Button onClick={handleLogout} error>Logout</Button>
            </div>
        </div>
            <Outlet/>
        </div>
    )
}