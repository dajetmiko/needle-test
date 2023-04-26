import "./TextInput.scss"
import { ComponentProps, FC, useState } from "react"
import eyeOn from "./eye-on.svg";
import eyeOff from "./eye-off.svg"

const TextInput: FC<ITextInput> = ({label, hideSeek, inputName, className}) => {
  const [reveal, setReveal] = useState(false);
  return (
    <div id={inputName} className={"text-input-container " + (className ?? "")}>
      <input type={!hideSeek || reveal ? "text" : "password"} 
        className={`input-breeds ${hideSeek ? "width-full" : "hide-width"}`}
        />
      <label className={`needle-input`} htmlFor={inputName}>{label}</label>
      {hideSeek && <img className="password-eyes" src={reveal ? eyeOn : eyeOff} onClick={() => setReveal(!reveal)}/>}
    </div>
  )
}

interface ITextInput extends ComponentProps<"input"> {
  label: string;
  hideSeek?: boolean;
  inputName: string;
}

export default TextInput