import { ui } from "./ui";
import { combineReducers } from "redux";

/**
 * @param {any | number} payload 
 */
export interface IRootRedux {
  ui?: {
    darkMode: boolean
  }
}

export interface IAction {
  type: TypeAction,
  payload: {[x: string]: any | number},
}


const allReducers = combineReducers({
  ui: ui
})

export type TypeAction = 'DARK_MODE'

export default allReducers

export type StateReducer = ReturnType<typeof allReducers>