import { useSelector } from "react-redux"
import DogsCard, { DogsCardImage, IDogsData } from "../../components/DogsCard/DogsCard"
import Navigation from "../../components/Navigation/Navigation"
import { IResponseImage, IResponseList, IResponseListBreed, fetchAPI, useFetchAPI } from "../../data/fetch/fetchAPI"
import { useCheckOnScreen } from "../../utils/domFunction"
import "./HomePage.scss"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { IRootRedux } from "../../store/reducers"

const pageTotal = 12

const HomePage: FC<IHomePage> = ({}) => {
  const breedsSelected = useSelector<IRootRedux, string | null>((state) => state.ui?.breedsSelected || null)
  const [listAll] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const [listBreed]
    = useFetchAPI<IResponseListBreed>(breedsSelected ? `https://dog.ceo/api/breed/${breedsSelected}/images` : null)
  const [listBreedImage, setListBreedImage] = useState<IDogsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastPageSeen, setLastPageSeen] = useState(false);
  const [page, setPage] = useState(1)
  const [keysBreeds, setKeyBreeds] = useState<string[]>([])
  const [refLast, setRefLast] = useState<HTMLDivElement | null>(null)
  const setRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref !== null) {
      setRefLast(ref)
    }
  }, []);

  const lastOnScreen = useCheckOnScreen(refLast)
  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [breedsSelected])
  useEffect(() => {
    keysBreeds.length === 0 && setKeyBreeds(Object.keys(listAll?.message || {}))
  }, [listAll])
  useEffect(() => {
    if(lastOnScreen){
      setPage(page + 1);
    }
  }, [lastOnScreen])

  return (

      <div className="dogs-feeds">
        <Navigation />
        <div className="dogs-container">
          {breedsSelected ? 
            listBreed?.message.map((image, index) => index > ((page * pageTotal) - 1) ? <></> : 
            <DogsCardImage key={index} index={index} breeds={breedsSelected} image={image} last={index === ((pageTotal * page) - 2)} setRef={setRef}/>)
            :
            keysBreeds.map((keyBreed, index) => index > ((page * pageTotal) - 1) ? <></> : 
            <DogsCard key={index} index={index} keyBreed={keyBreed} last={index === ((pageTotal * page) - 2)} setRef={setRef}/>)
          }
        </div>
      </div>
  )
}


interface IHomePage {
  
}

export default HomePage