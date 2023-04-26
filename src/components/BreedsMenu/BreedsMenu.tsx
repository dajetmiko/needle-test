import SelectableList from "../SelectableList/SelectableList"
import "./BreedsMenu.scss"
import { FC } from "react"

const BreedsMenu: FC<IBreedsMenu> = ({}) => {

  return (
    <div className="breeds-menu">
      <div className="container-breeds-menu">
        <h2 className="breeds-title">
          Breeds
        </h2>
        <div className="divider-login">
          <div className="divider-line"/>
          <p className="divider-text">
            Your favorites
          </p>
          <div className="divider-line"/>
        </div>
        <SelectableList listItem={["breeds 1", "breeds 2"]}/>
        <div className="divider-line-full"/>
        <SelectableList listItem={["breeds 1", "breeds 2", "breeds 3", "breeds 4", "breeds 5"]}/>
      </div>
    </div>
  )
}

interface IBreedsMenu {
  
}

export default BreedsMenu