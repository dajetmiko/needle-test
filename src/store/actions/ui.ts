import { IAction, TypeAction } from "../reducers";

export const storeDarkMode = (payload: boolean) => {
  const tipe: TypeAction = "DARK_MODE"
  const isiPayload = {
    darkMode: payload
  }
  localStorage.setItem("darkMode", JSON.stringify(payload ? "1" : "0"))

  return {
    type: tipe,
    payload: isiPayload
  } as IAction
}