import "./HoverComponents.scss"
import { FC } from "react"

const HoverComponents: FC<IHoverComponents> = ({topHover, leftHover, rightHover, children, onHover}) => {

  return (
    <div className="hover-app-needle-top-level">
      <div className="children-komponen">{children}</div>
      <div
        className="hover-component"
        style={{
          top: topHover || 0,
          left: leftHover == null ? "auto" : leftHover,
          right: rightHover == null ? "auto" : rightHover,
        }}
      >
        {onHover}
      </div>
    </div>
  )
}

interface IHoverComponents {
  topHover?: number;
  leftHover?: number;
  rightHover?: number;
  children: JSX.Element;
  onHover: JSX.Element
}

export default HoverComponents