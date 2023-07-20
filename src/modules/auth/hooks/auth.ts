import {useContext} from "react";
import {AuthContext, AuthMutatorContext} from "../components/AuthContext";

export const useAuth = () => useContext(AuthContext);
export const useAuthMutate = () => useContext(AuthMutatorContext);
