import DogsCard, { IDogsData } from "../../components/DogsCard/DogsCard"
import Navigation from "../../components/Navigation/Navigation"
import { IResponseImage, IResponseList, fetchAPI, useFetchAPI } from "../../data/fetch/fetchAPI"
import "./HomePage.scss"
import { FC, useEffect, useState } from "react"

const pageTotal = 12

const HomePage: FC<IHomePage> = ({}) => {
  const [listBreed] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const [listBreedImage, setListBreedImage] = useState<IDogsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const keysBreeds = Object.keys(listBreed?.message || {})

  return (

      <div className="dogs-feeds">
        <Navigation />
        <div className="dogs-container">
          {
            keysBreeds.map((keyBreed) => <DogsCard keyBreed={keyBreed} />)
          }
        </div>
      </div>
  )
}


interface IHomePage {
  
}

export default HomePage