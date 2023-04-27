import "./DogsCard.scss"
import { FC, MutableRefObject, useEffect, useState } from "react"
import testImage from "./test-image.jpg"
import love from "./love.svg"
import { IResponseImage, fetchAPI } from "../../data/fetch/fetchAPI"

const DogsCard: FC<IDogsCard> = ({keyBreed, refLast, last, index}) => {
  const [dogsData, setDogsData] = useState<IDogsData | null>(null);
  console.log(last, index)
  useEffect(() => {
    const fetch = async () => {
      try{
        const data 
          = await fetchAPI<IResponseImage>(`https://dog.ceo/api/breed/${keyBreed}/images/random`)
        dogsData === null && setDogsData({
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
  }, [])

  return (
    <div className="dogs-card-container" ref={last ? (refLast as MutableRefObject<HTMLDivElement | null>) : undefined}>
      <div className="dogs-card">
        <img src={dogsData?.image} className="dogs-image" loading="lazy"/>
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
  refLast?: MutableRefObject<HTMLDivElement | null>
  last?: boolean;
  index: number;
}

export interface IDogsData {
  breeds: string,
  image: string,
  liked: boolean
}

export default DogsCard