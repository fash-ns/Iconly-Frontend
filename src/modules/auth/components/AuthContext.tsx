import {createContext, useReducer} from "react";
import type {ReactNode, Dispatch, Reducer, ReducerAction} from "react";
import userDataReducer from "../userDataReducer";
import type {AuthContext as AuthContextType} from "../types/UserEntity";
import type {Action} from "../types/Action";

type AuthReducer = Reducer<AuthContextType, Action>;

const dummyReducer: Dispatch<Action> = () => null;
const initState = {loading: true, user: null};

export const AuthContext = createContext<AuthContextType>(initState);
export const AuthMutatorContext = createContext<Dispatch<ReducerAction<AuthReducer>>>(dummyReducer);

export default function AuthContextProvider({children}: {children: ReactNode}) {
    const [userData, dispatch] = useReducer<AuthReducer>(userDataReducer, initState);
    return (
        <AuthContext.Provider value={userData}>
            <AuthMutatorContext.Provider value={dispatch}>
                {children}
            </AuthMutatorContext.Provider>
        </AuthContext.Provider>
    )
}