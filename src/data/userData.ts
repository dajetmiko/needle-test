import { Timestamp } from "firebase/firestore";



export interface IUserData{
    userId: string;
    email: string | null;
    name: string;
    favoriteDogs: string[];
    dateAdded: Timestamp
}