import "./Navigation.scss"
import { FC, useRef, useState } from "react"
import profileImage from "./profile.svg"
import menu from "./menu.svg"
import LoginMenu from "../LoginMenu/LoginMenu"
import HoverComponents from "../HoverComponents/HoverComponents"
import BreedsMenu from "../BreedsMenu/BreedsMenu"
import useClickOutside, { useScreenDimension } from "../../utils/domFunction"
import { useNavigate } from "react-router-dom"

const Navigation: FC<INavigation> = ({}) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openBreeds, setOpenBreeds] = useState(false);
  const ref = useRef<HTMLDivElement>(null)
  const refBreeds = useRef<HTMLDivElement>(null)
  useClickOutside(() => {setOpenBreeds(false);}, openBreeds, [refBreeds])
  useClickOutside(() => {setOpenProfile(false);}, openProfile, [ref])
  const navigate = useNavigate()
  const [screenWidth] = useScreenDimension()
  return (
    <nav className="app-navigation">
      <h1 className="title-explorer" onClick={() => navigate(`/`)}>
        Dog Explorer
      </h1>
      <div className="navigation">
        <HoverComponents 
          onHover={<BreedsMenu />}
          refK={refBreeds}
          open={openBreeds}
          leftHover={screenWidth <= 400 ? -210 : -285}
          topHover={50}>
          <button className="nav-breed icon-margin" onClick={() => setOpenBreeds(!openBreeds)}>
            <img className="img-nav-breed" src={menu}/>
          </button>
        </HoverComponents>
        <HoverComponents 
          onHover={<LoginMenu />}
          refK={ref}
          leftHover={screenWidth <= 400 ? -240 : -320}
          topHover={50}
          open={openProfile}>
          <button className="nav-breed" onClick={() => setOpenProfile(!openProfile)}>
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