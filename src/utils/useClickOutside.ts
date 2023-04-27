import { useEffect } from "react";
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