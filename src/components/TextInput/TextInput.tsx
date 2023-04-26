import "./TextInput.scss"
import { FC, useState } from "react"

const TextInput: FC<ITextInput> = ({label, hideSeek}) => {
  const [reveal, setReveal] = useState(false);
  return (
    <div className={"text-input-container"}>
      <input type={hideSeek ? "text" : "button"} 
        className={`input-breeds ${hideSeek ? "width-full" : "hide-width"}`}
        />
      <label className={`needle-input`}>{label}</label>
      {hideSeek && <img className="password-eyes" onClick={() => setReveal(!reveal)}/>}
    </div>
  )
}

interface ITextInput {
  label: string;
  hideSeek?: boolean
}

export default TextInput