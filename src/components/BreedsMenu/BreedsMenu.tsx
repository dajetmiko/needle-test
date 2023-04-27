import { IResponseList, useFetchAPI } from "../../data/fetch/fetchAPI"
import SelectableList from "../SelectableList/SelectableList"
import "./BreedsMenu.scss"
import { FC } from "react"

const BreedsMenu: FC<IBreedsMenu> = ({}) => {
  const [listBreed] 
    = useFetchAPI<IResponseList>("https://dog.ceo/api/breeds/list/all")
  const keysFavorite = Object.keys(listBreed?.message || {})
  return (
    <div className="breeds-menu">
      <div className="container-breeds-menu">
        <h2 className="breeds-title">
          Breeds
        </h2>
        <input placeholder="Filter Breeds" className="filter-breeds"/>

        <SelectableList listItem={keysFavorite}/>
      </div>
    </div>
  )
}

interface IBreedsMenu {
  
}

export default BreedsMenu