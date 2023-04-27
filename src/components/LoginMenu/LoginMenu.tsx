import { ListFormat } from "typescript";
import useClickOutside from "../../utils/useClickOutside";
import ButtonDoggo from "../ButtonDoggo/ButtonDoggo"
import Chip from "../Chip/Chip";
import TextInput from "../TextInput/TextInput";
import "./LoginMenu.scss"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import SelectableList from "../SelectableList/SelectableList";
import { createAccount, login } from "../../utils/passwordAuth";
import ErrorText from "../ErrorText/ErrorText";

const LoginMenu: FC<ILoginMenu> = ({}) => {
  const [loginState, setLoginState] = useState<TLoginState>("LOGINSTART");
  return (
    <div className="container-all-login">
      {/* <SignedIn loginState={loginState} setLoginState={setLoginState}/> */}
      <Signup loginState={loginState} setLoginState={setLoginState}/>
      {/* <Login loginState={loginState} setLoginState={setLoginState}/> */}
      {/* <SignupFavorite loginState={loginState} setLoginState={setLoginState}/> */}
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

const Login: FC<ILogin> = ({loginState, setLoginState}) => {
  return (
    <div className="login-app">
      <TextInput label="Email" inputName="first-login-app" className="input-email"/>
      <TextInput label="Password" hideSeek inputName="first-login-app" className="input-password"/>
      <ButtonDoggo addedClassName="button-login">
        Login
      </ButtonDoggo>
      <p className="account-already">Don't have an account? <span>Click here</span></p>
    </div>
  )
}

const Signup: FC<ISignup> = ({loginState, setLoginState}) => {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<string[]>([])
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null)
  const handleSignup = async () => {
    resetError();
    let error = false
    if(name === ""){
      setNameError("Please input your name")
      error = true
    }
    if(email === ""){
      setEmailError("Please input email");
      error = true;
    }
    if(password === ""){
      setPasswordError("Please input password");
      error = true;
    }
    try{
      await createAccount(email, password, name)
    }catch(e){
      const er: any = e as any
      if(er.code === "auth/email-already-in-use"){
        setEmailError("Email is already in use")
      }else if(er.code === "auth/invalid-email"){
        setEmailError("Invalid email format")
      }else{
        setErrorGeneral("Something is wrong")
      }

    }
  }
  const resetError = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setErrorGeneral(null)
  }
  return (
    <div className="signup-app">
      <TextInput label="Email" onChange={(e) => setEmail(e.currentTarget.value)} 
        errorMessage={emailError}
        inputName="email-login-app" className="input-email"/>
      <TextInput label="Name" onChange={(e) => setName(e.currentTarget.value)} 
        errorMessage={nameError}
        inputName="name-login-app" className="input-name"/>
      <TextInput label="Password" onChange={(e) => setPassword(e.currentTarget.value)} 
        errorMessage={passwordError}
        hideSeek inputName="first-login-app" className="input-password"/>
      <TextInput label="Favorite Doggo" inputName="first-login-app" className="input-doggo" onChange={() => {}}/>
      <div className="chip-container">
        <Chip item="breedsss" index={0} deleteButton onDelete={(index) => {
          const newFavorite = [...favorite].splice(index, 1)
          setFavorite(newFavorite);
        }}/>
      </div>
      {errorGeneral && <ErrorText>{errorGeneral}</ErrorText>}
      <ButtonDoggo addedClassName="button-login" onClick={handleSignup}>
        Create an account 
      </ButtonDoggo>
      <p className="account-already">Already have an account? <span>Click here</span></p>
    </div>
  )
}

const SignupFavorite: FC<ISignup> = ({loginState, setLoginState}) => {
  return (
    <div className="signup-app">
      <TextInput label="Favorite Doggo" inputName="first-login-app" className="input-doggo" onChange={() => {}}/>
      <div className="chip-container">
        <Chip item="breedsss" index={0} deleteButton/>
        <Chip item="breess" index={0} deleteButton/>
        <Chip item="bre" index={0} deleteButton/>
        <Chip item="breedsss" index={0} deleteButton/>
      </div>
      <ButtonDoggo addedClassName="button-login">
        Create an account
      </ButtonDoggo>
    </div>
  )
}

const SignedIn: FC<ISignedIn> = ({}) => {
  return (
    <div className="signed-in-app">
      <h3>
        Hello, <span>Disky Aria Jetmiko</span>
      </h3>
      <SelectableList listItem={["Liked doggy", "breeds A", "breeds B"]}/>
    </div>
  )
}

interface ILoginMenu {}
interface IFirstLogin {
  loginState: TLoginState
  setLoginState: Dispatch<SetStateAction<TLoginState>>
}
interface ILogin {
  loginState: TLoginState
  setLoginState: Dispatch<SetStateAction<TLoginState>>
}
interface ISignup {
  loginState: TLoginState
  setLoginState: Dispatch<SetStateAction<TLoginState>>
}
interface ISignedIn {
  loginState: TLoginState
  setLoginState: Dispatch<SetStateAction<TLoginState>>
}
type TLoginState = "LOGINSTART" | "LOGIN" | "CREATEACCOUNT" | "LOADINGIN" | "CHOSEFAVORITE" | "LOADINGOUT" | "SIGNEDIN"

export default LoginMenu