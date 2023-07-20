import type {UserEntity} from "./types/UserEntity";
import type {Action} from "./types/Action";

export enum UserActions {
    SET_USER_INFO = "UserActions/SET_USER_INFO",
    SET_USER_LOADING = "UserActions/SET_USER_LOADING",
    REMOVE_USER_INFO = "UserActions/REMOVE_USER_INFO",
}

export function setUserInfo(user: UserEntity): Action<UserEntity> {
    return {
        type: UserActions.SET_USER_INFO,
        payload: user
    }
}

export function setUserLoading(loading: boolean): Action<boolean> {
    return {
        type: UserActions.SET_USER_LOADING,
        payload: loading
    }
}

export function removeUserInfo(): Action<undefined> {
    return {
        type: UserActions.REMOVE_USER_INFO
    }
}