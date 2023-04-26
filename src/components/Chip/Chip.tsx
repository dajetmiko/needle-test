import "./Chip.scss"
import { FC } from "react"
import chipDelete from "./chip-delete.svg"

const Chip: FC<IChip> = ({deleteButton, onDelete, index, item}) => {

  return (
    <div className="chip-doggo-breed">
      <p className="item-name">
        {item}
      </p>
      {deleteButton && 
        <button className="delete-button-chip" onClick={() => onDelete && onDelete(index)}>
          <img src={chipDelete} />
        </button>
      }
    </div>
  )
}

interface IChip {
  item: string;
  index: number;
  deleteButton?: boolean;
  onDelete?: (i: number) => void;
}

export default Chip