import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { useAuthStateChange } from './utils/passwordAuth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { storeUserData } from './store/actions/ui';
import { IUserData } from './data/userData';
import { useDispatch, useSelector } from 'react-redux';
import { IRootRedux } from './store/reducers';
import { User } from 'firebase/auth';
import { Routes, Route} from 'react-router';
import LikedPage from './pages/LikedPage/LikedPage';

function App() {
  useAuthStateChange()
  const dispatch = useDispatch()
  const user = useSelector<IRootRedux, User | null>(state => state?.ui?.user || null)
  useEffect(() => {
    const db = getFirestore()
    if(!user) return;
    const ss = onSnapshot(doc(db, `user/${user.uid}`), (data) => {
      const userData = data.data() as IUserData | undefined
      dispatch(storeUserData(userData || null))
    })
    return () => ss()
  }, [user])
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/liked"
          element={<LikedPage />}
        />

      </Routes>
    </div>
  );
}

export default App;
