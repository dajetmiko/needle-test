import "./DogsCard.scss"
import { FC } from "react"
import testImage from "./test-image.jpg"
import love from "./love.svg"

const DogsCard: FC<IDogsCard> = ({}) => {
  return (
    <div className="dogs-card-container">
      <div className="dogs-card">
        <img src={testImage} className="dogs-image"/>
        <div className="dogs-info">
          <p className="dogs-name">
            Doggo 1
          </p>
          <img className="dogs-love" src={love}/>
        </div>
      </div>
    </div>
  )
}

interface IDogsCard {
  // dogsData: IDogsData
}

export interface IDogsData {
  id: string,
  image: string,
  liked: boolean
}

export default DogsCard