import ButtonDoggo from "../ButtonDoggo/ButtonDoggo"
import "./LoginMenu.scss"
import { Dispatch, FC, SetStateAction, useState } from "react"

const LoginMenu: FC<ILoginMenu> = ({}) => {
  const [loginState, setLoginState] = useState<TLoginState>("LOGINSTART");
  return (
    <div className="container-all-login">
      <FirstLogin loginState={loginState} setLoginState={setLoginState}/>

    </div>
  )
}

const FirstLogin: FC<IFirstLogin> = ({loginState, setLoginState}) => {
  return (
    <div className="login-start">
      <ButtonDoggo addedClassName="button-login">
        Login
      </ButtonDoggo>
      <div className="divider-login">
        <div className="divider-line"/>
        <p className="divider-text">
          Or login with
        </p>
        <div className="divider-line"/>
      </div>
      <button>
        Login with facebook
      </button>
      <button>
        Login with google
      </button>
    </div>
  )
}

const Login: FC<IFirstLogin> = ({loginState, setLoginState}) => {
  return (
    <div className="login-app">

      <div className="divider-login">
        <div className="divider-line"/>
        <p className="divider-text">
          Or login with
        </p>
        <div className="divider-line"/>
      </div>
      <ButtonDoggo addedClassName="button-login">
        Login
      </ButtonDoggo>
    </div>
  )
}

interface ILoginMenu {}
interface IFirstLogin {
  loginState: TLoginState
  setLoginState: Dispatch<SetStateAction<TLoginState>>
}
type TLoginState = "LOGINSTART" | "LOGIN" | "CREATEACCOUNT" | "LOADINGIN" | "LOADINGOUT"

export default LoginMenu