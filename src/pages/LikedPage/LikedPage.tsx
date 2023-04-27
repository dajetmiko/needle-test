import { useSelector } from "react-redux"
import DogsCard, { DogsCardImage, IDogsData } from "../../components/DogsCard/DogsCard"
import Navigation from "../../components/Navigation/Navigation"
import { IResponseImage, IResponseList, IResponseListBreed, fetchAPI, useFetchAPI } from "../../data/fetch/fetchAPI"
import { useCheckOnScreen } from "../../utils/domFunction"
import "./LikedPage.scss"
import { FC, useEffect, useRef, useState } from "react"
import { IRootRedux } from "../../store/reducers"
import { Firestore, Timestamp, collection, doc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore"
import { app } from "../../data/firebaseSetup"
import { IUserData } from "../../data/userData"

const pageTotal = 12

const LikedPage: FC<ILikedPage> = ({}) => {
  const [likedImage, setLikedImage] = useState<ILikeDate[]>([])
  const userData = useSelector<IRootRedux, IUserData | null>(state => state.ui?.userData || null)
  useEffect(() => {
    if(userData === null) return;
    const fetchData = async () => {
      const db = getFirestore(app)
      const q = query(collection(db, "userLiked"), where("userId", "==", userData?.userId), orderBy("dateAdded", "desc"));
      const docs = await  getDocs(q)
      console.log('docs')
      console.log(docs.docs)
      const data = docs.docs.map((doc) => {
        const docData = doc.data() as ILikeDate
        return docData
      })
      setLikedImage(data)
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
  breed: string;
}

export interface ILikeDate {
  userId: string;
  image: string;
  breed: string;
  dateAdded: Timestamp
}


interface ILikedPage {
  
}

export default LikedPage