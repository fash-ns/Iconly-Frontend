import type {AuthenticataleRouteObject} from "./Routes";
import AuthGate from "../auth/components/AuthGate";
import AuthEntry from "../../pages/auth";
import Icons from "../../pages";
import {MainRoot} from "../main/components/MainRoot";


const routes: AuthenticataleRouteObject[] = [
    {
        path: "/",
        element: <MainRoot/>,
        children: [
            {
                index: true,
                element: <Icons/>,
                authRequired: true,
            }
        ]
    }, {
        path: "auth",
        element: <AuthEntry/>,
        authRequired: false,
    }
]

export default routes;