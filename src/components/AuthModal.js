import { useState } from "react"
import ReactModal from "react-modal"
import { useAuth, loginUser, registerUser } from "../contexts/AuthContext"
import { useModal, closeModal } from "../contexts/ModalContext"

function AuthModal () {
  const [formData, setFormData] = useState({identifier: 'marius@myidea.fr', username: '', email: '', password: '12345678'})
  const [isRegister, setIsRegister] = useState(false)

  const { state: { isOpen }, dispatch } = useModal()

  // Renommer le disptach
  const authDispatch = useAuth().dispatch
  const { state: { loading }} = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    registerUser(authDispatch, formData)
    closeModal(dispatch)
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    loginUser(authDispatch, formData)
    closeModal(dispatch)
  }

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