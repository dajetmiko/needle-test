import "./DogsCard.scss"
import { FC } from "react"
import testImage from "./test-image.jpg"

const DogsCard: FC<IDogsCard> = ({}) => {

  return (
    <div className="dogs-card">
      <img src={testImage}/>
      <div>
        <p>
          Doggo 1
        </p>
        <img />
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