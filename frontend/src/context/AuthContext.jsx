import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../services/firebase'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken()
        localStorage.setItem('token', token)
        try {
          const res = await api.post('/auth/sync')
          setUsuario({ ...res.data, firebaseUser })
        } catch {
          setUsuario(null)
        }
      } else {
        localStorage.removeItem('token')
        setUsuario(null)
      }
      setCargando(false)
    })
    return unsub
  }, [])

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const token = await result.user.getIdToken()
    localStorage.setItem('token', token)
    const res = await api.post('/auth/sync')
    setUsuario({ ...res.data, firebaseUser: result.user })
    return result
  }

  const registro = async (email, password, nombre) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const token = await result.user.getIdToken()
    localStorage.setItem('token', token)
    const res = await api.post('/auth/sync')
    setUsuario({ ...res.data, firebaseUser: result.user })
    return result
  }

  const logout = async () => {
    await signOut(auth)
    localStorage.removeItem('token')
    setUsuario(null)
  }

  const cambiarPassword = async (passwordActual, passwordNueva) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      passwordActual
    )
    await reauthenticateWithCredential(auth.currentUser, credential)
    await updatePassword(auth.currentUser, passwordNueva)
  }

  const recuperarPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
  }

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      cargando,
      login, 
      registro, 
      logout,
      cambiarPassword,
      recuperarPassword
    }}>
      {!cargando && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}