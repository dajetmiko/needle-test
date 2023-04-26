import "./Navigation.scss"
import { FC } from "react"
import profileImage from "./profile.svg"
import menu from "./menu.svg"
import LoginMenu from "../LoginMenu/LoginMenu"
import HoverComponents from "../HoverComponents/HoverComponents"
import BreedsMenu from "../BreedsMenu/BreedsMenu"

const Navigation: FC<INavigation> = ({}) => {

  return (
    <nav className="app-navigation">
      <h1 className="title-explorer">
        Dog Explorer
      </h1>
      <div className="navigation">
        <HoverComponents 
          onHover={<BreedsMenu />}
          leftHover={-320}
          topHover={50}>
          <button className="nav-breed icon-margin">
            <img className="img-nav-breed" src={menu}/>
          </button>
        </HoverComponents>
        <HoverComponents 
          onHover={<LoginMenu />}
          leftHover={-370}
          topHover={50}>
          <button className="nav-breed">
            <img className="img-nav-breed" src={profileImage}/>
          </button>
        </HoverComponents>
        

      </div>
    </nav>
  )
}

interface INavigation {
  
}

export default Navigation