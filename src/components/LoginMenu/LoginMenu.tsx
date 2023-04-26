import ButtonDoggo from "../ButtonDoggo/ButtonDoggo"
import "./LoginMenu.scss"
import { FC } from "react"

const LoginMenu: FC<ILoginMenu> = ({}) => {

  return (
    <div className="login-menu">
      <ButtonDoggo>
        Login
      </ButtonDoggo>
      <div>
        <div/>
        <p>
          Or login with
        </p>
        <div/>
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