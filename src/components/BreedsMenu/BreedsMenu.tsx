import { useDispatch } from "react-redux"
import { IResponseList, useFetchAPI } from "../../data/fetch/fetchAPI"
import SelectableList from "../SelectableList/SelectableList"
import "./BreedsMenu.scss"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { storeBreedsSelected } from "../../store/actions/ui"
import { useNavigate } from "react-router-dom"

const BreedsMenu: FC<IBreedsMenu> = ({}) => {
  const [listBreed] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const keysFavorite = Object.keys(listBreed?.message || {})
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [favoriteInput, setFavoriteInput] = useState("")
  const [favoriteFilter, setFavoriteFilter] = useState<string[]>([])
  useEffect(() => {
    let newFavFilter: string[] = []
    keysFavorite.forEach((text) => {
      newFavFilter.push(text)
    })
    setFavoriteFilter(newFavFilter)
  }, [listBreed])
  const onFilterDoggo = (e: ChangeEvent<HTMLInputElement>) => {
    const regWord = new RegExp(e.currentTarget.value);
    setFavoriteInput(e.currentTarget.value);
    setFavoriteFilter([])
    let newFavFilter: string[] = []
    keysFavorite.forEach((text) => {
      if(regWord.test(text)){
        newFavFilter.push(text)
      }
    })
    setFavoriteFilter(newFavFilter)
  }
  return (
    <div className="breeds-menu">
      <div className="container-breeds-menu">
        <h2 className="breeds-title">
          Breeds
        </h2>
        <input placeholder="Filter Breeds" value={favoriteInput} className="filter-breeds" onChange={onFilterDoggo}/>
        <SelectableList listItem={favoriteFilter} onSelected={(selected) => {
          navigate(`/`)
          dispatch(storeBreedsSelected(selected))
        }}/>
      </div>
    </div>
  )
}

interface IBreedsMenu {
  
}

export default BreedsMenu