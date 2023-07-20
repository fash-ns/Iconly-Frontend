import "./modules/shared/css/globals.css";
import "./modules/shared/css/helpers.css";
import AuthContextProvider from "./modules/auth/components/AuthContext";
import RouteBootstrapper from "./modules/router/RouteBootstrapper";
import axios from "axios";
import AuthGate from "./modules/auth/components/AuthGate";

axios.defaults.baseURL = "http://localhost/api";
axios.defaults.withCredentials = true;

function App() {
    return (
        <AuthContextProvider>
            <AuthGate>
                <RouteBootstrapper/>
            </AuthGate>
        </AuthContextProvider>
    )
}

export default App
