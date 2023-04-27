import DogsCard, { IDogsData } from "../../components/DogsCard/DogsCard"
import Navigation from "../../components/Navigation/Navigation"
import { IResponseImage, IResponseList, fetchAPI, useFetchAPI } from "../../data/fetch/fetchAPI"
import { useCheckOnScreen } from "../../utils/domFunction"
import "./HomePage.scss"
import { FC, useEffect, useRef, useState } from "react"

const pageTotal = 12

const HomePage: FC<IHomePage> = ({}) => {
  const [listBreed] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const [listBreedImage, setListBreedImage] = useState<IDogsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastPageSeen, setLastPageSeen] = useState(false);
  const [page, setPage] = useState(1)
  const [keysBreeds, setKeyBreeds] = useState<string[]>([])
  const refLast = useRef<HTMLDivElement | null>(null)

  const lastOnScreen = useCheckOnScreen(refLast)
  useEffect(() => {
    keysBreeds.length === 0 && setKeyBreeds(Object.keys(listBreed?.message || {}))
  }, [listBreed])
  useEffect(() => {
    if(lastOnScreen){
      console.log("last on screen")
      setPage(page + 1);
    }
  }, [lastOnScreen])

  return (

      <div className="dogs-feeds">
        <Navigation />
        <div className="dogs-container">
          {
            keysBreeds.map((keyBreed, index) => index > (page * pageTotal) ? <></> : 
            <DogsCard key={index} index={index} keyBreed={keyBreed} last={index === (pageTotal * page - 1)} refLast={refLast}/>)
          }
        </div>
      </div>
  )
}


interface IHomePage {
  
}

export default HomePage