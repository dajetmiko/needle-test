import "./SelectableList.scss"
import { FC } from "react"

const SelectableList: FC<ISelectableList> = ({listItem, onSelected, onIndexSelected}) => {

  return (
    <ul className="selectable-list-needle">
      {
        listItem.map((item, index) => <li className="selectable-list" onClick={() => {
          onSelected && onSelected(item);
          onIndexSelected && onIndexSelected(index);
        }}>{item}</li>)
      }
    </ul>
  )
}

interface ISelectableList {
  onSelected?: (item: string) => void;
  onIndexSelected?: (iItem: number) => void;
  listItem: string[];
}

export default SelectableList