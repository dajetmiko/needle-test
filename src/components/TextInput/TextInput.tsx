import "./TextInput.scss"
import { ComponentProps, FC, useState } from "react"
import eyeOn from "./eye-on.svg";
import eyeOff from "./eye-off.svg"

const TextInput: FC<ITextInput> = ({label, hideSeek, inputName, className, errorMessage, ...rest}) => {
  const [reveal, setReveal] = useState(false);
  return (
    <div className={"container-all-input " + (className ?? "")}>
      <div id={inputName} className={"text-input-container " + (errorMessage ? "container-error" : "")}>
        <input type={!hideSeek || reveal ? "text" : "password"} 
          {...rest}
          className={`input-breeds ${hideSeek ? "width-full" : "hide-width"}`}
          />
        <label className={`needle-input`} htmlFor={inputName}>{label}</label>
        {hideSeek && <img className="password-eyes" src={reveal ? eyeOn : eyeOff} onClick={() => setReveal(!reveal)}/>}
      </div>
      {errorMessage && <p className="error-input">{errorMessage}</p>}
    </div>
  )
}

interface ITextInput extends ComponentProps<"input"> {
  label: string;
  hideSeek?: boolean;
  inputName: string;
  errorMessage?: string | null;
}

export default TextInput