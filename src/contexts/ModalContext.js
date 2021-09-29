import React from 'react'

// Création du contexte (état global)
const ModalContext = React.createContext()

// Définition des actions possibles pour ce contexte
const actions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL'
}

/**
 * Retourne le nouvel état mit à jour correspondant au type d'action définit plus haut
 * @param state l'état précédent la mise à jour
 * @param action action propagée à l'aide la méthode dispatch(). Contient le type d'action et la data éventuelle associée
 * @return le nouvel état
 * */ 
const modalReducer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL: 
      return { isOpen: true }
    case actions.CLOSE_MODAL: 
      return { isOpen: false }
    default:
      throw new Error('Unhandled action type : ' + action.type)
  }
}

/**
 * Provider à placer au dessus des enfants (consumers) ayant besoin d'avoir accès à ce contexte
 * @param {*} children les enfants du composant 
 * @returns Composant Provider à placer autour des enfants (consumers)
 */
const ModalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, { isOpen: false })

  const value = { state, dispatch }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

/**
 * Hook permettant un test de la bonne application de notre context et vérifiant la présence du Provider
 * @returns context { state, dispatch }
 */
const useModal = () => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

/**
 * Ouvre le modal en modifiant l'état de isOpen dans le state global
 * @param {*} dispatch fonction dispatch permettant de propager l'action
 */
const openModal = (dispatch) => {
  dispatch({ type: actions.OPEN_MODAL })
}

/**
 * Ferme le modal en modifiant l'état de isOpen dans le state global
 * @param {*} dispatch fonction dispatch permettant de propager l'action
 */
const closeModal = (dispatch) => {
  dispatch({ type: actions.CLOSE_MODAL })
}

// Export sélectif
// Import avec {}
export { openModal, closeModal, ModalProvider, useModal }