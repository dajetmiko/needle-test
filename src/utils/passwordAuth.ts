

import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, User, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app, provider } from "../data/firebaseSetup";
import { IUserData } from "../data/userData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storeUser, storeUserData } from "../store/actions/ui";
import { FirebaseError } from "firebase/app";
import { AnyAction, Dispatch } from "redux";
import { GoogleAuthProvider } from "firebase/auth";



export const signInGoogleNeedle = async (dispatch: Dispatch<AnyAction>) => {
    const auth = getAuth();
    try{
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(!credential) return;
        const token = credential.accessToken;
        const user = result.user;
        dispatch(storeUser(user));
    }catch(e){
        const error = e as any
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
  
}

export const createAccount = async (email: string, 
    password: string, 
    name: string, 
    favoriteDogs: string[], 
    dispatch: Dispatch<AnyAction>
) => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    try{  
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCred.user, {displayName: name})
        const userData: IUserData = {
            userId: userCred.user.uid,
            email: userCred.user.email,
            name: name,
            favoriteDogs: favoriteDogs
        }
        await setDoc(doc(db, "user", userData.userId), userData);
        dispatch(storeUser(userCred.user))
        dispatch(storeUserData(userData))
    }catch(e){
        const er = e as FirebaseError;
        console.error("Failed login")
        console.error("error code: ", er.code)
        console.error("error message: ", er.message)
        console.error(er)
        throw er
    }
}

export const createAccountData = async (
    name: string, 
    favoriteDogs: string[], 
    dispatch: Dispatch<AnyAction>
) => {
    const db = getFirestore(app)
    try{  
        const auth = getAuth(app);
        const user = auth.currentUser;
        if(!user) return;
        await updateProfile(user, {displayName: name})
        const userData: IUserData = {
            userId: user.uid,
            email: user.email,
            name: name,
            favoriteDogs: favoriteDogs
        }
        await setDoc(doc(db, "user", userData.userId), userData);
        dispatch(storeUser(user))
        dispatch(storeUserData(userData))
    }catch(e){
        const er = e as FirebaseError;
        console.error("Failed login")
        console.error("error code: ", er.code)
        console.error("error message: ", er.message)
        console.error(er)
        throw er
    }
}



export const login = async (email: string, password: string, dispatch: Dispatch<AnyAction>) => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        const userData = (await getDoc(doc(db, `user/${userCred.user.uid}`))).data() as IUserData | undefined
        if(userData){
            dispatch(storeUser(userCred.user))
            dispatch(storeUserData(userData || null));
        }
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
            // dispatch(storeUser(user))
        })
    }, [])
}