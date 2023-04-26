import "./Navigation.scss"
import { FC } from "react"

const Navigation: FC<INavigation> = ({}) => {

  return (
    <nav className="App-header">
      <h1 className="title-explorer">
        Dog Explorer
      </h1>
      <div className="navigation">
        <button className="nav-breed">
          <img className="img-nav-breed"/>
        </button>
        <button className="nav-breed">
          <img className="img-nav-breed"/>
        </button>
      </div>
    </nav>
  )
}

interface INavigation {
  
}

export default Navigation