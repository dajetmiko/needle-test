import { User } from "firebase/auth";
import { ui } from "./ui";
import { combineReducers } from "redux";
import { IUserData } from "../../data/userData";

/**
 * @param {any | number} payload 
 */
export interface IRootRedux {
  ui?: {
    darkMode: boolean
    user: User | null
    userData: IUserData | null
  }
}

export interface IAction {
  type: TypeAction,
  payload: {[x: string]: any | number},
}


const allReducers = combineReducers({
  ui: ui
})

export type TypeAction = 'DARK_MODE' | 'SAVE_USER' | 'SAVE_USER_DATA'

export default allReducers

export type StateReducer = ReturnType<typeof allReducers>