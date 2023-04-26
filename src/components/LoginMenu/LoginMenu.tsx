import useClickOutside from "../../utils/useClickOutside";
import ButtonDoggo from "../ButtonDoggo/ButtonDoggo"
import TextInput from "../TextInput/TextInput";
import "./LoginMenu.scss"
import { Dispatch, FC, SetStateAction, useState } from "react"

const LoginMenu: FC<ILoginMenu> = ({}) => {
  const [loginState, setLoginState] = useState<TLoginState>("LOGINSTART");
  return (
    <div className="container-all-login">
      <Login loginState={loginState} setLoginState={setLoginState}/>
      {/* <FirstLogin loginState={loginState} setLoginState={setLoginState}/> */}
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
      <TextInput label="Email" inputName="first-login-app" className="input-email"/>
      <TextInput label="Email" hideSeek inputName="first-login-app" className="input-password"/>
      <TextInput label="Email" inputName="first-login-app" className="input-doggo" onChange={() => {}}/>
      <ButtonDoggo addedClassName="button-login">
        Login
      </ButtonDoggo>
      <p className="account-already">Already have an account? <span>Click here</span></p>
    </div>
  )
}

const Signup: FC<IFirstLogin> = ({loginState, setLoginState}) => {
  return (
    <div className="login-app">
      <TextInput label="Email" inputName="first-login-app" className="input-email"/>
      <TextInput label="Email" hideSeek inputName="first-login-app" className="input-password"/>
      <ButtonDoggo addedClassName="button-login">
        Login
      </ButtonDoggo>
      <p className="account-already">Already have an account? <span>Click here</span></p>
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