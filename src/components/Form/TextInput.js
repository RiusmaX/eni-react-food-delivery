import PropTypes from 'prop-types'

// Définition du format des propriétés attendues
TextInput.propTypes = {
  label: PropTypes.string,
  labelProps: PropTypes.object,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

/**
 * Composant de champ de saisie texte + label
 * @param {*} props Les propriétés du composant
 * @returns Le composant de champ de texte
 */
function TextInput ({ label, labelProps, labelClassName, name, onChange, value, ...props }) {
  return (
    <label className={labelClassName} {...labelProps}>
      {label} :
      <input name={name} onChange={onChange} value={value} {...props} />
    </label>
  )
}

// Export par défaut du composant
// Import sans les {}
export default TextInput
