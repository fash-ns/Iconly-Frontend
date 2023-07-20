import {IndexRouteObject, NonIndexRouteObject} from "react-router";

export interface AuthenticataleIndexRouteObject extends IndexRouteObject {
    authRequired?: boolean;
}

export interface AuthenticataleNonIndexRouteObject extends NonIndexRouteObject {
    authRequired?: boolean;
    children?: AuthenticataleRouteObject[];
}

export type AuthenticataleRouteObject = AuthenticataleIndexRouteObject | AuthenticataleNonIndexRouteObject;
