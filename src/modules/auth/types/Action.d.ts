import {UserActions} from "../userDataActions";

export interface Action<T = any> {
    type: UserActions;
    payload?: T
}