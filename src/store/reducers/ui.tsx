import { TypeAction } from ".";

export interface IAksiUI {
  type: TypeAction,
  payload: {[x: string]: any | number},
}


const jsonUI = {ui: {darkMode: true, user: null}}
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
    default:
      return state 
  }
}