import "./Navigation.scss"
import { FC } from "react"
import profileImage from "./profile.svg"
import menu from "./menu.svg"

const Navigation: FC<INavigation> = ({}) => {

  return (
    <nav className="app-navigation">
      <h1 className="title-explorer">
        Dog Explorer
      </h1>
      <div className="navigation">
        <button className="nav-breed">
          <img className="img-nav-breed" src={menu}/>
        </button>
        <button className="nav-breed">
          <img className="img-nav-breed" src={profileImage}/>
        </button>
      </div>
    </nav>
  )
}

interface INavigation {
  
}

export default Navigation