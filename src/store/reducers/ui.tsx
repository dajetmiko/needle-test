import { TypeAction } from ".";

export interface IAksiUI {
  type: TypeAction,
  payload: {[x: string]: any | number},
}

const userData = localStorage.getItem("userdoggodata") ? JSON.stringify(localStorage.getItem("userdoggodata") ) : null
const user = localStorage.getItem("userdoggo") ? JSON.stringify(localStorage.getItem("userdoggodata") ) : null
const darkMode = localStorage.getItem("darkMode") === "1"

const jsonUI = {ui: {darkMode: darkMode, user: user, userData: userData}}
const initialCondition = { ...jsonUI}

export function ui(state: any = initialCondition, action: IAksiUI){
  switch(action.type){
    case 'DARK_MODE':
      return {
        ...state,
        ...action.payload
      }
    case "SAVE_USER":
      return {
        ...state,
        ...action.payload
      }
    case "SAVE_USER_DATA":
        return {
          ...state,
          ...action.payload
        }
    default:
      return state 
  }
}