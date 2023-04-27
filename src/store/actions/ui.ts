import { User } from "firebase/auth";
import { IAction, TypeAction } from "../reducers";
import { IUserData } from "../../data/userData";

export const storeDarkMode = (payload: boolean) => {
  const tipe: TypeAction = "DARK_MODE"
  const payloadItem = {
    darkMode: payload
  }
  localStorage.setItem("darkMode", JSON.stringify(payload ? "1" : "0"))

  return {
    type: tipe,
    payload: payloadItem
  } as IAction
}

export const storeUser = (payload: User | null) => {
  const tipe: TypeAction = "SAVE_USER"
  const payloadItem = {
    user: payload
  }
  localStorage.setItem("userdoggo", JSON.stringify(payload));
  return {
    type: tipe,
    payload: payloadItem
  } as IAction
}

export const storeUserData = (payload: IUserData | null) => {
  const tipe: TypeAction = "SAVE_USER_DATA"
  const payloadItem = {
    user: payload
  }
  localStorage.setItem("userdoggodata", JSON.stringify(payload));
  return {
    type: tipe,
    payload: payloadItem
  } as IAction
}