import { useState } from "react"
import ReactModal from "react-modal"
import { useAuth, loginUser, registerUser } from "../contexts/AuthContext"
import { useModal, closeModal } from "../contexts/ModalContext"
import LoginForm from "./Form/LoginForm"
import RegisterForm from "./Form/RegisterForm"

function AuthModal () {
  // Initialisation de l'état local permettant la bascule entre le formulaire d'inscription et de connexion
  const [isRegister, setIsRegister] = useState(false)

  // Récupération de l'état global et de la fonction dispatch en provenance du contexte
  const { state: { isOpen }, dispatch: dispatch } = useModal()

  // Récupération de l'état global et de la fonction dispatch en provenance du contexte
  // Renommer le dispatch car déjà importé depuis un autre contexte au dessus
  const { state: { loading }, dispatch: authDispatch} = useAuth()
  // Equivalents de syntaxe
  // const state = useAuth().state
  // const loading = state.loading
  // const dispatch = useAuth().dispatch

  /**
   * Gère le clic sur le bouton d'inscription
   * @param {*} e évènement provenant du HTML (correspondant à l'action du clic sur le bouton)
   */
  const handleSubmitRegister = async (formData) => {
    registerUser(authDispatch, formData)
    closeModal(dispatch)
  }

  /**
   * Gère le clic sur le bouton de connexion
   * @param {*} e évènement provenant du HTML (correspondant à l'action du clic sur le bouton)
   */
  const handleSubmitLogin = async (formData) => {
    loginUser(authDispatch, formData)
    closeModal(dispatch)
  }

  /**
   * Gère la transition entre le formulaire de login et celui du register
   */
  const handleToggleRegisterMode = () => {
    setIsRegister(!isRegister)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => closeModal(dispatch)}>
        {
          isRegister
          ? (
            <RegisterForm onSubmit={handleSubmitRegister} loading={loading} />
          )
          : (
            <LoginForm onSubmit={handleSubmitLogin} loading={loading} />
          )
        }
        <button onClick={handleToggleRegisterMode}>
          {isRegister ? "J'ai déja un compte" : "Je n'ai pas de compte"}
        </button>
    </ReactModal>
  )
}

export default AuthModal