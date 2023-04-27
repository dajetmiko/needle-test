import { useSelector } from "react-redux"
import DogsCard, { DogsCardImage, IDogsData } from "../../components/DogsCard/DogsCard"
import Navigation from "../../components/Navigation/Navigation"
import { IResponseImage, IResponseList, IResponseListBreed, fetchAPI, useFetchAPI } from "../../data/fetch/fetchAPI"
import { useCheckOnScreen } from "../../utils/domFunction"
import "./LikedPage.scss"
import { FC, useEffect, useRef, useState } from "react"
import { IRootRedux } from "../../store/reducers"
import { collection, doc, getDocs, getFirestore, query, where } from "firebase/firestore"
import { app } from "../../data/firebaseSetup"
import { IUserData } from "../../data/userData"

const pageTotal = 12

const LikedPage: FC<ILikedPage> = ({}) => {
  const [likedImage, setLikedImage] = useState<ILike[]>([])
  const userData = useSelector<IRootRedux, IUserData | null>(state => state.ui?.userData || null)
  useEffect(() => {
    if(userData === null) return;
    const fetchData = async () => {
      const db = getFirestore(app)
      const q = query(collection(db, "cities"), where("userId", "==", true));
      const docs = await  getDocs(q)
      const data = docs.docs.map((doc) => {
        const docData = doc.data() as ILike
        return docData
      })
      setLikedImage(likedImage)
    }
    fetchData();
  }, [])
  return (
    
      <div className="dogs-feeds">
        <Navigation />
        <div className="dogs-container">
          {
            likedImage.map((liked, index) => <DogsCardImage 
              key={index} 
              index={index} 
              breeds={liked.breed} image={liked.image}/>)
          }
        </div>
      </div>
  )
}

export interface ILike {
  userId: string;
  image: string;
  breed: string
}


interface ILikedPage {
  
}

export default LikedPage