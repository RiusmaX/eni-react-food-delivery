import { useState } from "react"
import ReactModal from "react-modal"
import { useAuth, loginUser, registerUser } from "../contexts/AuthContext"
import { useModal, closeModal } from "../contexts/ModalContext"

function AuthModal () {
  // Initialisation de l'état local permettant de stocker la saisie de l'utilisateur
  const [formData, setFormData] = useState({identifier: 'marius@myidea.fr', username: '', email: '', password: '12345678'})
  
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
   * Gère la saisie de l'utilisateur
   * @param {*} e évènement provenant du HTML (correspondant à l'action de frappe sur le clavier)
   */
  const handleChange = (e) => {
    setFormData({
      ...formData, // Fusion avec les données déjà présentes dans l'état local
      [e.target.name]: e.target.value // Utilisation du name pour remplir l'état local dynamiquement
    })
  }

  /**
   * Gère le clic sur le bouton d'inscription
   * @param {*} e évènement provenant du HTML (correspondant à l'action du clic sur le bouton)
   */
  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    registerUser(authDispatch, formData)
    closeModal(dispatch)
  }

  /**
   * Gère le clic sur le bouton de connexion
   * @param {*} e évènement provenant du HTML (correspondant à l'action du clic sur le bouton)
   */
  const handleSubmitLogin = async (e) => {
    e.preventDefault()
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
            <div>
              <form onSubmit={handleSubmitRegister}>
                <label>
                  Username : 
                  <input name='username' onChange={handleChange} value={formData.username} />
                </label>
                <br />
                <label>
                  Email : 
                  <input name='email' onChange={handleChange} value={formData.email} />
                </label>
                <br />
                <label>
                  Password :
                  <input type='password' name='password' onChange={handleChange} value={formData.password} />
                </label>
                <br />
                <input type='submit' value={loading ? "Chargement..." : "S'enregistrer"} />
              </form>
            </div>
          )
          : (
            <div>
              <form onSubmit={handleSubmitLogin}>
                <label>
                  Email :
                  <input name='identifier' onChange={handleChange} value={formData.identifier} />
                </label>
                <br />
                <label>
                  Password :
                  <input type='password' name='password' onChange={handleChange} value={formData.password} />
                </label>
                <br />
                <input type='submit' value={loading ? "Chargement..." : "Se connecter"} />
              </form>
            </div>
          )
        }
        <button onClick={handleToggleRegisterMode}>
          {isRegister ? "J'ai déja un compte" : "Je n'ai pas de compte"}
        </button>
    </ReactModal>
  )
}

export default AuthModal