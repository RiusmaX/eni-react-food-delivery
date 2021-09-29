import React from 'react'
import { login, register } from '../services/Api'

const AuthContext = React.createContext()

const actions = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  LOGOUT: 'LOGOUT'
}

const initialState = {
  user: null,
  jwt: null,
  loading: false,
  error: null
}

const authReducer = (state, action) => {
  switch(action.type) {
    case actions.LOGIN:
      return { user: action.data.user, jwt: action.data.jwt, error: null, loading: false }
    case actions.REGISTER:
      return { user: action.data.user, jwt: action.data.jwt, error: null, loading: false }
    case actions.LOADING:
      return { ...state, loading: action.data.loading }
    case actions.ERROR:
      return { ...initialState, error: action.data.error }
    case actions.LOGOUT:
      return initialState
    default:
      throw new Error('Unhandled action type : ' + action.type)
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  return <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

const loginUser = async (dispatch, credentials) => {
  try {
    dispatch({ type: actions.LOADING, data: { loading: true } })
    const { user, jwt } = await login(credentials)
    if (user && jwt) {
      dispatch({ type: actions.LOGIN, data: {user, jwt} })
    }
  } catch (e) {
    console.error(e)
    dispatch({ type: actions.ERROR, data: {error: e } })
  }
}

const registerUser = async (dispatch, infos) => {
  try {
    dispatch({ type: actions.LOADING, data: { loading: true } })
    const { user, jwt } = await register(infos)
    if (user && jwt) {
      dispatch({ type: actions.REGISTER, data: {user, jwt} })
    }
  } catch (e) {
    console.error(e)
    dispatch({ type: actions.ERROR, data: {error: e } })
  }
}

const logout = async (dispatch) => {
  dispatch({type: actions.LOGOUT})
}

export {
  AuthProvider,
  useAuth,
  loginUser,
  registerUser,
  logout
}