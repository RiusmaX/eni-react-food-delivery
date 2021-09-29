import React from 'react'

const ModalContext = React.createContext()

const actions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL'
}

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

const ModalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, { isOpen: false })

  const value = { state, dispatch }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

const useModal = () => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

const openModal = (dispatch) => {
  dispatch({ type: actions.OPEN_MODAL })
}

const closeModal = (dispatch) => {
  dispatch({ type: actions.CLOSE_MODAL })
}

export { openModal, closeModal, ModalProvider, useModal }