import type {ReactNode} from "react";
import styles from "../css/auth-gate.module.css";
import Progress from "../../ui/components/Progress";
import {useAuth, useAuthMutate} from "../hooks/auth";
import {useEffect} from "react";
import axios from "axios";
import type {UserEntity} from "../types/UserEntity";
import {setUserInfo, setUserLoading} from "../userDataActions";

/***
 *
 * @author Farbod Shams
 * @param children
 * Since our requests are stateful, We need to check if user is logged in and the session id for the user is valid.
 * This component renders a loading page, checks the user state (logged in or not) and after retrieving the response
 * from the server, renders the whole website.
 */

export default function AuthGate({children} : {children: ReactNode}) {
    const auth = useAuth();
    const dispatch = useAuthMutate();

    useEffect(() => {
        axios.get<UserEntity>("/auth/current-user").then(res => {
            dispatch(setUserInfo(res.data))
            dispatch(setUserLoading(false));
        }).catch(err => {
            dispatch(setUserLoading(false));
            console.error(err);
        })
    }, [])

    return auth.loading ? (
        <div className={styles.background}>
            <Progress size={50}/>
            <span>Authenticating ...</span>
        </div>
    ) : children
}