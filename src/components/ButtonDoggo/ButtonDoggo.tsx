import "./ButtonDoggo.scss"
import { ComponentProps, FC } from "react"

const ButtonDoggo: FC<IButtonDoggo> = ({children, addedClassName, ...rest}) => {

  return (
    <button {...rest} className={`button-doggo-component ${addedClassName || ""}`}>
      {children}
    </button>
  )
}

interface IButtonDoggo extends ComponentProps<"button"> {
  addedClassName?: string;
}

export default ButtonDoggo