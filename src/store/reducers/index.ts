import { User } from "firebase/auth";
import { ui } from "./ui";
import { combineReducers } from "redux";

/**
 * @param {any | number} payload 
 */
export interface IRootRedux {
  ui?: {
    darkMode: boolean
    user: User | null
  }
}

export interface IAction {
  type: TypeAction,
  payload: {[x: string]: any | number},
}


const allReducers = combineReducers({
  ui: ui
})

export type TypeAction = 'DARK_MODE' | 'SAVE_USER'

export default allReducers

export type StateReducer = ReturnType<typeof allReducers>