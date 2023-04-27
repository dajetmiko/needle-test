import "./DogsCard.scss"
import { FC, useEffect, useState } from "react"
import testImage from "./test-image.jpg"
import love from "./love.svg"
import { IResponseImage, fetchAPI } from "../../data/fetch/fetchAPI"

const DogsCard: FC<IDogsCard> = ({keyBreed}) => {
  const [dogsData, setDogsData] = useState<IDogsData | null>(null);
  useEffect(() => {
    const fetch = async () => {
      try{
        const data 
          = await fetchAPI<IResponseImage>(`https://dog.ceo/api/breed/${keyBreed}/images/random`)
        setDogsData({
          breeds: keyBreed,
          image: data.message,
          liked: false
        })
      }catch(e){
        const er = e as any;
        console.error(er.message);
      }
    }
    fetch()
  }, [keyBreed])
  console.log(dogsData)
  console.log(keyBreed)
  return (
    <div className="dogs-card-container">
      <div className="dogs-card">
        <img src={dogsData?.image} className="dogs-image"/>
        <div className="dogs-info">
          <p className="dogs-name">
            {dogsData?.breeds}
          </p>
          <img className="dogs-love" src={love}/>
        </div>
      </div>
    </div>
  )
}

interface IDogsCard {
  keyBreed: string;
}

export interface IDogsData {
  breeds: string,
  image: string,
  liked: boolean
}

export default DogsCard