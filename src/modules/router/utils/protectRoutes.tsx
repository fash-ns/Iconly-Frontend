import type {AuthenticataleRouteObject} from "../Routes";
import {Navigate} from "react-router-dom";

/***
 *
 * A recursive function which checks the authRequired key (true means only authenticated user can access the route,
 * false means only guest user can access the route and undefined means everyone can see the route) and isLoggedIn
 * argument which is current user's state and handles necessary navigations.
 * @author Farbod Shams
 * @param routes
 * @param isLoggedIn
 */

export default function protectRoutes(routes: AuthenticataleRouteObject[], isLoggedIn: boolean) {
    return routes.map(route => {
        const updatedRoute = {...route} as AuthenticataleRouteObject;

        if(typeof route.authRequired !== "undefined" && route.authRequired !== isLoggedIn)
            updatedRoute.element = isLoggedIn ? <Navigate to="/"/> : <Navigate to="/auth"/>
        if(typeof route.children !== "undefined")
            updatedRoute.children = protectRoutes(route.children, isLoggedIn);
        return updatedRoute;
    })
}