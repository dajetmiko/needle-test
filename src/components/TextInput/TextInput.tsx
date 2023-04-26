import "./TextInput.scss"
import { ComponentProps, FC, useState } from "react"

const TextInput: FC<ITextInput> = ({label, hideSeek, inputName, className}) => {
  const [reveal, setReveal] = useState(false);
  return (
    <div id={inputName} className={"text-input-container " + (className ?? "")}>
      <input type={hideSeek ? "password" : "text"} 
        className={`input-breeds ${hideSeek ? "width-full" : "hide-width"}`}
        />
      <label className={`needle-input`} htmlFor={inputName}>{label}</label>
      {hideSeek && <img className="password-eyes" onClick={() => setReveal(!reveal)}/>}
    </div>
  )
}

interface ITextInput extends ComponentProps<"input"> {
  label: string;
  hideSeek?: boolean;
  inputName: string;
}

export default TextInput