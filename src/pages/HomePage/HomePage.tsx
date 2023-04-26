import DogsCard from "../../components/DogsCard/DogsCard"
import Navigation from "../../components/Navigation/Navigation"
import "./HomePage.scss"
import { FC } from "react"

const HomePage: FC<IHomePage> = ({}) => {

  return (
    <div className="dogs-feeds">
      <Navigation />
      <div className="dogs-container">
        <DogsCard />
      </div>
    </div>
  )
}

interface IHomePage {
  
}

export default HomePage