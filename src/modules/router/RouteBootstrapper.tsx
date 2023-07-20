import routes from "./routes";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import protectRoutes from "./utils/protectRoutes";
import {useAuth} from "../auth/hooks/auth";

/***
 *
 * @author Farbod Shams
 * This file is the core part of the website's routing. In this file, route object is retrieved, protected against
 * unauthorized viewing and a RouterProvider is returned.
 */

export default function RouteBootstrapper() {
    const auth = useAuth();
    const protectedRoutes = protectRoutes(routes, !!auth.user);
    const router = createBrowserRouter(protectedRoutes);
    return <RouterProvider router={router}/>
}