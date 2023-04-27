

import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../data/firebaseSetup";
import { IUserData } from "../data/userData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/actions/ui";


export const createAccount = async (email: string, password: string, name: string) => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    try{  
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCred.user, {displayName: name})
        const userData: IUserData = {
            userId: userCred.user.uid,
            email: userCred.user.email,
            name: name
        }
        await setDoc(doc(db, "user", userData.userId), userData);
    }catch(e){
        const er = e as any;
        console.error("Failed login")
        console.error("error code: ", er.code)
        console.error("error message: ", er.message)
        console.error(er)
        throw er
    }
}


export const login = async (email: string, password: string) => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password)
    }catch(e){
        const er = e as any;
        console.error("Failed login")
        console.error("error code: ", er.code)
        console.error("error message: ", er.message)
        throw er
    }
}

export const useAuthStateChange = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch(storeUser(user))
        })
    }, [])
}