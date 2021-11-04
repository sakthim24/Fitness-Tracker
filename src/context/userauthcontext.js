import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseconfig/firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'
import { useBmi } from './bmifunction'


const AuthContext = createContext({
  currentuser: null,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})
export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }) {

  const [currentuser, setcurrentuser] = useState(null);

  useBmi()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setcurrentuser(user ? user : null)

    })
    return () => {
      unsubscribe()
    }
  }, [])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    console.log("logout");
    return signOut(auth)
  }
 const value = {
    currentuser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
