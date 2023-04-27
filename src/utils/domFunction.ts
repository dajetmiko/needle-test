import { useEffect, useState } from "react";
import { MutableRefObject } from "react";


export default function useClickOutside(
    fungsiTrigger: (op: boolean) => void, 
    modalTerbuka: boolean, 
    refList?: MutableRefObject<HTMLElement | null>[]
) {
    useEffect(() => {
        function handelClickOutside(event: any) {
            if((refList || [])?.length === 0) return;
            const outsideEveryRef = refList?.every((ref) => {
                const outside = ref && ref.current && !ref.current.contains(event.target) && modalTerbuka === true
                return outside
            })
            if(outsideEveryRef){
                fungsiTrigger(false)
            }
        }
        document.addEventListener("mousedown", handelClickOutside);
        return () => { document.removeEventListener("mousedown", handelClickOutside) }
    }, [refList, modalTerbuka])
}



export function useCheckOnScreen(ref: HTMLElement | null) {

  const [intersectionExist, setIntersectionExist] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersectionExist(entry.isIntersecting)
  )

  useEffect(() => {
    if (ref !== null) {
      observer.observe(ref)
      return () => { observer.disconnect() }
    }
  }, [ref])

  return intersectionExist
}