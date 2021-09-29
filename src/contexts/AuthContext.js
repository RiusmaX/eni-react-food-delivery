import React, { useEffect } from 'react'
import { login, register } from '../services/Api'

// Création du contexte (état global)
const AuthContext = React.createContext()

// Définition des actions possibles pour ce contexte
const actions = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  LOGOUT: 'LOGOUT'
}

// L'état initial du contexte
const initialState = {
  user: null,
  jwt: null,
  loading: false,
  error: null
}

/**
 * Retourne le nouvel état mit à jour correspondant au type d'action définit plus haut
 * @param state l'état précédent la mise à jour
 * @param action action propagée à l'aide la méthode dispatch(). Contient le type d'action et la data éventuelle associée
 * @return le nouvel état
 * */ 
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

/**
 * Enregistre l'état global dans le localStorage du navigateur afin de le persister lors des rafraîchissements ou de la fermeture du navigateur
 * @param {*} state l'état à sauvegarder
 */
const storeStateToLocalStorage = async (state) => {
  try {
    // Le localStorage ne prend pas en charge les objets, on convertit donc notre objet en string
    const stateToSave = JSON.stringify(state)
    // On enregistre dans le localStorage
    localStorage.setItem('AUTH_CONTEXT:STATE', stateToSave)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Récupère l'état global enregistré dans le localStorage du navigateur
 * @returns l'état global récupéré
 */
const getStateFromLocalStorage = async () => {
  try {
    // Récupération de l'état sous forme de string
    const stateSaved = localStorage.getItem('AUTH_CONTEXT:STATE')
    // Conversion de la string en objet
    return JSON.parse(stateSaved)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Provider à placer au dessus des enfants (consumers) ayant besoin d'avoir accès à ce contexte
 * @param {*} children les enfants du composant 
 * @returns Composant Provider à placer autour des enfants (consumers)
 */
const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  // Charge l'état depuis le localStorage
  useEffect(() => {
    // Déclaration de la méthode pour charger l'état depuis le localStorage
    const loadStoredState = async () => {
      // Dispatch de l'action de chargement
      dispatch({ type: actions.LOADING, data: { loading: true }})
      // Récupération du l'état stocké
      const storedState = await getStateFromLocalStorage()
      console.log('Chargement du state')
      dispatch({ type: actions.LOGIN, data: storedState })
    }
    // Appel de la méthode
    loadStoredState()
  }, []) // Le array vide force le useEffect à ne se déclancher qu'au premier chargement 

  // Enregistre l'état local en cas de modification ([state])
  useEffect(() => {
    // Déclaration de la méthode d'enregistrement du state
    const saveState = async (state) => {
      await storeStateToLocalStorage(state)
    }
    // Si un state est présent et non null, on l'enregistre
    if (state) {
      console.log('Enregistrement du state')
      saveState(state)
    }
  }, [state]) // On précise la variable qui doit redéclancher le useEffect et donc la sauvegarde du state 

  return <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>
}

/**
 * Hook permettant un test de la bonne application de notre context et vérifiant la présence du Provider
 * @returns context { state, dispatch }
 */
const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

/**
 * Authentifie l'utilisateur sur l'API puis propage l'action correspondant au résultat. 
 * Si l'authentification est correcte, l'action LOGIN est dispatchée avec la data (user et jwt)
 * Si l'authentification échoue, l'action ERROR est dispatchée avec le motif de l'erreur
 * @param {*} dispatch fonction dispatch permettant de propager l'action
 * @param {*} credentials les informations de connexion
 */
const loginUser = async (dispatch, credentials) => {
  try {
    // Action permettant de gérer le chargement de l'appel d'API
    dispatch({ type: actions.LOADING, data: { loading: true } })
    // Appel à l'API de login
    const { user, jwt } = await login(credentials)
    if (user && jwt) {
      // Succès, dispatch de l'action pour mettre à jour l'état global
      dispatch({ type: actions.LOGIN, data: {user, jwt} })
    }
  } catch (e) {
    console.error(e)
    // Echec, dispatch de l'action pour remonter l'erreur
    dispatch({ type: actions.ERROR, data: {error: e } })
  }
}

/**
 * Inscrit l'utilisateur sur l'API puis propage l'action correspondant au résultat. 
 * Si l'authentification est correcte, l'action LOGIN est dispatchée avec la data (user et jwt)
 * Si l'authentification échoue, l'action ERROR est dispatchée avec le motif de l'erreur
 * @param {*} dispatch fonction dispatch permettant de propager l'action
 * @param {*} infos les informations d'enregistrement de l'utilisateur
 */
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

/**
 * Déconnecte l'utilisateur en réinitialisant l'état global
 * @param {*} dispatch fonction dispatch permettant de propager l'action
 */
const logout = async (dispatch) => {
  dispatch({type: actions.LOGOUT})
}

// Export sélectif
// Import avec {}
export {
  AuthProvider,
  useAuth,
  loginUser,
  registerUser,
  logout
}