import { TypeAction } from ".";

export interface IAksiUI {
  type: TypeAction,
  payload: {[x: string]: any | number},
}

const userData = JSON.parse(localStorage.getItem("userdoggodata")  || "null") 
const user = JSON.parse(localStorage.getItem("userdoggo") || "null")
const darkMode = localStorage.getItem("darkMode") === "1"
const breedsSelected = null

const jsonUI = {darkMode: darkMode, user: user, userData: userData, breedsSelected}
const initialCondition = { ...jsonUI}
console.log(initialCondition)

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
    case "SAVE_BREED_SELECTED":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state 
  }
}