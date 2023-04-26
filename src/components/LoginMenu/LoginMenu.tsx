import ButtonDoggo from "../ButtonDoggo/ButtonDoggo"
import "./LoginMenu.scss"
import { FC } from "react"

const LoginMenu: FC<ILoginMenu> = ({}) => {

  return (
    <div className="login-menu">
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

interface ILoginMenu {
  
}

export default LoginMenu