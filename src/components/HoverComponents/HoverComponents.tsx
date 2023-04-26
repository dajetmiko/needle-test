import "./HoverComponents.scss"
import { ComponentProps, FC, MutableRefObject } from "react"

const HoverComponents: FC<IHoverComponents> = ({topHover, leftHover, rightHover, children, onHover, open, refK}) => {

  return (
    <div className="hover-app-needle-top-level" ref={refK}>
      <div className={open === undefined ? "children-komponen" : "children-komponen-forced"}>{children}</div>
      <div
        className={open === undefined ? "hover-component" : open ? "hover-component-forced hover-component-clicked" : "hover-component-forced"}
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

interface IHoverComponents  {
  topHover?: number;
  leftHover?: number;
  rightHover?: number;
  children: JSX.Element;
  onHover: JSX.Element;
  open?: boolean;
  refK?: MutableRefObject<HTMLDivElement | null>
}

export default HoverComponents