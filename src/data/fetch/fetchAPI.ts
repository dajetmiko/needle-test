import axios from "axios"
import { useEffect, useState } from "react"



export const fetchAPI = async <IType>(link: string) => {
    try{
        const dataAPI = await axios
        .get(link)
        const data = dataAPI.data as IType
        return data
    }catch(e){
        throw e
    }
}

export const useFetchAPI = <IType>(link: string) => {
    const [data, setData] = useState<IType | null>(null)
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        const fetch = async () => {
            try{
                const dataGot = await fetchAPI<IType>(link);
                setData(dataGot)
            }catch(e){
                const er = e as any
                setError(er);
                console.error(er.message)
            }
        }
        fetch();
    }, [link])
    return [data, error] as [IType | null, any]
}

export interface IResponseList {
    "message": {
        [dogName: string]: string[]
    },
    "status": string
}

export interface IResponseImage {
    "message": string,
    "status": string
}