import type {AuthContext, UserEntity} from "./types/UserEntity";
import type {Action} from "./types/Action";
import {UserActions} from "./userDataActions";


export default function userDataReducer(auth: AuthContext, action: Action): AuthContext {
    switch (action.type) {
        case UserActions.SET_USER_INFO:
            return {...auth, user: action.payload as UserEntity}
        case UserActions.SET_USER_LOADING:
            return {...auth, loading: action.payload as boolean}
        case UserActions.REMOVE_USER_INFO:
            return {loading: false, user: null};
        default:
            throw new Error("Unsupported action type");
    }
}