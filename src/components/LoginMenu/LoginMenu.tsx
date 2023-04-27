import { ListFormat } from "typescript";
import useClickOutside from "../../utils/useClickOutside";
import ButtonDoggo from "../ButtonDoggo/ButtonDoggo"
import Chip from "../Chip/Chip";
import TextInput from "../TextInput/TextInput";
import "./LoginMenu.scss"
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import SelectableList from "../SelectableList/SelectableList";
import { createAccount, login } from "../../utils/passwordAuth";
import ErrorText from "../ErrorText/ErrorText";
import { FirebaseError } from "firebase/app";
import { IResponseList, useFetchAPI } from "../../data/fetch/fetchAPI";
import { useDispatch, useSelector } from "react-redux";
import { IRootRedux } from "../../store/reducers";
import { User } from "firebase/auth";
import { IUserData } from "../../data/userData";
import logoutBtn from "./logout-btn.svg"

const LoginMenu: FC<ILoginMenu> = ({}) => {
  const [loginState, setLoginState] = useState<TLoginState>("CREATEACCOUNT");
  const user = useSelector<IRootRedux, User | null>(state => (state?.ui?.user || null));
  const userData = useSelector<IRootRedux, IUserData | null>(state => (state?.ui?.userData || null));
  useEffect(() => {
    if(user && userData){
      setLoginState("SIGNEDIN")
    }else if(user){
      setLoginState("CHOSEFAVORITE")
    }else{
      setLoginState("LOGIN")

    }
  }, [user, userData])
  return (
    <div className="container-all-login">
      {loginState === "SIGNEDIN" ? 
        <SignedIn loginState={loginState} setLoginState={setLoginState}/>
        : loginState === "CHOSEFAVORITE" ?
        <SignupFavorite loginState={loginState} setLoginState={setLoginState} /> 
        : loginState === "LOGIN" ? 
        <FirstLogin loginState={loginState} setLoginState={setLoginState}/>
        : <Signup loginState={loginState} setLoginState={setLoginState}/>
        

      }

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
      <p className="account-already">Don't have an account? <span>Click here</span></p>
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

const maximumDog = 3

const Signup: FC<ISignup> = ({loginState, setLoginState}) => {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [favoriteInput, setFavoriteInput] = useState("");
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  const [favoriteFilter, setFavoriteFilter] = useState<string[]>([]);
  const [focusFavorite, setFocusFavorite] = useState(false)
  const [favorite, setFavorite] = useState<string[]>([])
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null)
  const [listBreed] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const dispatch = useDispatch();
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
    if(favorite.length === 0){
      setPasswordError("Please your favorite doggo");
      error = true;
    }
    if(error) return;
    try{
      await createAccount(email, password, name, favorite, dispatch);
    }catch(e){
      const er: FirebaseError = e as FirebaseError
      if(er.code === "auth/email-already-in-use"){
        setEmailError("Email is already in use")
      }else if(er.code === "auth/invalid-email"){
        setEmailError("Invalid email format")
      }else{
        setErrorGeneral("Something is wrong")
      }
    }
  }
  const keysFavorite = Object.keys(listBreed?.message || {})
  const resetError = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setErrorGeneral(null)
  }
  const onBreedsSelected = (item: string) => {
    const newFav = [...favorite];
    const alreadyExist = newFav.includes(item)
    const maximum = newFav.length >= maximumDog
    if(alreadyExist || maximum){
      setFavorite(newFav);
      setFocusFavorite(false);
      setFavoriteInput("");
      if(maximum){
        setFavoriteError("Maximum 3 doggo breeds")
      }
      return;
    }
    newFav.push(item);
    setFavorite(newFav);
    setFocusFavorite(false);
    setFavoriteInput("");
  }
  const onFilterDoggo = (e: ChangeEvent<HTMLInputElement>) => {
    const regWord = new RegExp(e.currentTarget.value);
    setFavoriteInput(e.currentTarget.value);
    setFavoriteFilter([])
    let newFavFilter: string[] = []
    keysFavorite.forEach((text) => {
      if(regWord.test(text)){
        newFavFilter.push(text)
      }
    })
    setFavoriteFilter(newFavFilter)
  }
  const refSelectable = useRef(null);
  useClickOutside(() => setFocusFavorite(false), focusFavorite, [refSelectable])
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
      <div className="container-favorite" ref={refSelectable}>
        <TextInput label="Favorite Doggo" inputName="first-login-app" className="input-doggo"
        value={favoriteInput}
        errorMessage={favoriteError}
        onFocus={() => setFocusFavorite(true)}
        onChange={onFilterDoggo}/>
        {focusFavorite && <div className="container-list-favorite" >
          <SelectableList listItem={favoriteFilter} 
            onSelected={onBreedsSelected}
          />
        </div>}
      </div>
      <div className="chip-container">
        {favorite.map((breed, index) => 
          <Chip item={breed} index={index} deleteButton onDelete={(index) => {
            const newFavorite = [...favorite]
            newFavorite.splice(index, 1)
            setFavorite(newFavorite);
          }}/>)
        }
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
  const user = useSelector<IRootRedux, User | null>(state => (state?.ui?.user || null));

  const [listBreed] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const [favorite, setFavorite] = useState<string[]>([])
  const [favoriteInput, setFavoriteInput] = useState("");
  const [focusFavorite, setFocusFavorite] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null)
  const [favoriteFilter, setFavoriteFilter] = useState<string[]>([])

  const refSelectable = useRef(null);
  useClickOutside(() => setFocusFavorite(false), focusFavorite, [refSelectable])
  const keysFavorite = Object.keys(listBreed?.message || {})
  const resetError = () => {
    setFavoriteError(null)
  }
  const onBreedsSelected = (item: string) => {
    const newFav = [...favorite];
    const alreadyExist = newFav.includes(item)
    const maximum = newFav.length >= maximumDog
    if(alreadyExist || maximum){
      setFavorite(newFav);
      setFocusFavorite(false);
      setFavoriteInput("");
      if(maximum){
        setFavoriteError("Maximum 3 doggo breeds")
      }
      return;
    }
    newFav.push(item);
    setFavorite(newFav);
    setFocusFavorite(false);
    setFavoriteInput("");
  }
  const onFilterDoggo = (e: ChangeEvent<HTMLInputElement>) => {
    const regWord = new RegExp(e.currentTarget.value);
    setFavoriteInput(e.currentTarget.value);
    setFavoriteFilter([])
    let newFavFilter: string[] = []
    keysFavorite.forEach((text) => {
      if(regWord.test(text)){
        newFavFilter.push(text)
      }
    })
    setFavoriteFilter(newFavFilter)
  }
  return (
    <div className="signup-app">
      <div className="container-favorite" ref={refSelectable}>
        <TextInput label="Favorite Doggo" inputName="first-login-app" className="input-doggo"
        value={favoriteInput}
        errorMessage={favoriteError}
        onFocus={() => setFocusFavorite(true)}
        onChange={onFilterDoggo}/>
        {focusFavorite && <div className="container-list-favorite" >
          <SelectableList listItem={favoriteFilter} 
            onSelected={onBreedsSelected}
          />
        </div>}
      </div>
      <div className="chip-container">
        {favorite.map((breed, index) => 
          <Chip item={breed} index={index} deleteButton onDelete={(index) => {
            const newFavorite = [...favorite]
            newFavorite.splice(index, 1)
            setFavorite(newFavorite);
          }}/>)
        }
      </div>
      <ButtonDoggo addedClassName="button-login">
        Create an account
      </ButtonDoggo>
    </div>
  )
}

const SignedIn: FC<ISignedIn> = ({}) => {
  const userData = useSelector<IRootRedux, IUserData | null>(state => state?.ui?.userData || null)
  return (
    <div className="signed-in-app">
      <div className="nav-signed-in">
        <h3>
          Hello, <span>{userData?.name}</span>
        </h3>
        <button className="btn-logout">
          <img src={logoutBtn}/>
        </button>
      </div>
      
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