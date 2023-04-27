import "./DogsCard.scss"
import { FC, MutableRefObject, useEffect, useState } from "react"
import testImage from "./test-image.jpg"
import love from "./love.svg"
import loveFilled from "./love-filled.svg"
import { IResponseImage, fetchAPI } from "../../data/fetch/fetchAPI"
import { ILike } from "../../pages/LikedPage/LikedPage"
import { useSelector } from "react-redux"
import { IRootRedux } from "../../store/reducers"
import { IUserData } from "../../data/userData"
import axios from "axios"
import { doc, getFirestore, onSnapshot } from "firebase/firestore"
import { app } from "../../data/firebaseSetup"

const DogsCard: FC<IDogsCard> = ({keyBreed, setRef, last, index}) => {
  const [dogsData, setDogsData] = useState<IDogsData | null>(null);
  const userData = useSelector<IRootRedux, IUserData | null>(state => state.ui?.userData || null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const db = getFirestore(app)
    if(!userData?.userId || !dogsData?.image) return
    const ss = onSnapshot(doc(db, "userLiked", userData?.userId + encodeURIComponent(dogsData?.image)), (doc) => {
      console.log("snapshot")
      if(doc.exists()){
        setLiked(true)
      }else{
        setLiked(false)
      }
    })
    return () => ss()
  }, [dogsData, userData])
  

  useEffect(() => {
    const fetch = async () => {
      try{
        const data 
          = await fetchAPI<IResponseImage>(`https://dog.ceo/api/breed/${keyBreed}/images/random`)
        dogsData === null && setDogsData({
          breeds: keyBreed,
          image: data.message,
          liked: false
        })
      }catch(e){
        const er = e as any;
        console.error(er.message);
      }
    }
    fetch()
  }, [])

  const handlePostLike = async () => {
    if(userData && dogsData){
      const like: ILike = {
        userId: userData.userId,
        image: dogsData.image || "",
        breeds: dogsData.breeds
      }
      try{
        await axios.post("https://us-central1-doggoneedle.cloudfunctions.net/api/addLike", like)
      }catch(e){
        console.error(e)
      }
    }
  }

  return (
    <div className="dogs-card-container" ref={setRef} onClick={() => handlePostLike()}>
      <div className="dogs-card">
        <img src={dogsData?.image} className="dogs-image" loading="lazy"/>
        <div className="dogs-info">
          <p className="dogs-name">
            {dogsData?.breeds}
          </p>
          <img className="dogs-love" src={liked ? loveFilled : love} />
        </div>
      </div>
    </div>
  )
}

export const DogsCardImage: FC<IDogsCardImage> = ({image, setRef, last, breeds, index}) => {
  const userData = useSelector<IRootRedux, IUserData | null>(state => state.ui?.userData || null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const db = getFirestore(app)
    const ss = onSnapshot(doc(db, "userLiked", userData?.userId + encodeURIComponent(image)), (doc) => {
      console.log("snapshot");
      if(doc.exists()){
        setLiked(true)
      }else{
        setLiked(false)
      }
    })
    return () => ss()
  }, [image, userData])
  
  const handlePostLike = async () => {
    if(userData && image){
      const like: ILike = {
        userId: userData.userId,
        image: image,
        breeds: breeds
      }
      try{
        await axios.post("https://us-central1-doggoneedle.cloudfunctions.net/api/addLike", like)
      }catch(e){
        console.error(e)
      }
    }
  }
  return (
    <div className="dogs-card-container" ref={setRef} onClick={() => handlePostLike()}>
      <div className="dogs-card">
        <img src={image} className="dogs-image" loading="lazy"/>
        <div className="dogs-info">
          <p className="dogs-name">
            {breeds}
          </p>
          <img className="dogs-love" src={liked ? loveFilled : love} onClick={() => handlePostLike()}/>
        </div>
      </div>
    </div>
  )
}

interface IDogsCard {
  keyBreed: string;
  setRef?: (ref: HTMLDivElement | null) => void
  last?: boolean;
  index: number;
}

interface IDogsCardImage {
  image: string;
  setRef?: (ref: HTMLDivElement | null) => void
  last?: boolean;
  breeds: string;
  index: number
}

export interface IDogsData {
  breeds: string,
  image: string,
  liked: boolean
}


export default DogsCard