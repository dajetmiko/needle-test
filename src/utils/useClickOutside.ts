import { useEffect } from "react";
import { MutableRefObject } from "react";


export default function useClickOutside(
    fungsiTrigger: (op: boolean) => void, 
    modalTerbuka: boolean, 
    ref?: MutableRefObject<HTMLElement | null>
) {
    useEffect(() => {
        function handelClickOutside(event: any) {
            console.log(ref?.current)
            if (ref && ref.current && !ref.current.contains(event.target) && modalTerbuka === true) {
                console.log("aaa")
                fungsiTrigger(false)
            }
        }
        document.addEventListener("mousedown", handelClickOutside);
        return () => { document.removeEventListener("mousedown", handelClickOutside) }
    }, [ref, modalTerbuka])
}