import "./BreedsMenu.scss"
import { FC } from "react"

const BreedsMenu: FC<IBreedsMenu> = ({}) => {

  return (
    <div className="breeds-menu">
      <div className="line-favorites">
        <div className="line"/>
        <p>your favorites</p>
        <div className="line"/>
      </div>
      
    </div>
  )
}

interface IBreedsMenu {
  
}

export default BreedsMenu