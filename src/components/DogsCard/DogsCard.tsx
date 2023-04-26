import "./DogsCard.scss"
import { FC } from "react"

const DogsCard: FC<IDogsCard> = ({dogsData}) => {

  return (
    <div className="dogs-card">
      <img src={dogsData.image}/>
      <div>
        <p>
          
        </p>
        <img />
      </div>
    </div>
  )
}

interface IDogsCard {
  dogsData: IDogsData
}

export interface IDogsData {
  id: string,
  image: string,
  liked: boolean
}

export default DogsCard