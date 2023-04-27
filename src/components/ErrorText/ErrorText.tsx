import "./ErrorText.scss"
import { ComponentProps, FC } from "react"

const ErrorText: FC<IErrorText> = ({children, className, ...rest}) => {

  return (
    <p {...rest} className={"error-message-app-needle " + className}>
      {children}
    </p>
  )
}

interface IErrorText extends ComponentProps<"p"> {
}

export default ErrorText