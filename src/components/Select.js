import PropTypes from 'prop-types'

Select.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  selector: PropTypes.string
}

function Select ({ data, onChange, selector }) {
  return (
    <select data-testid='select1' onChange={onChange}>
      {
        data.map((option, index) => {
          // Déterminer le format de la data passée en paramètre 
          if (typeof(option) === 'object') {
            return (
              <option
                key={index}
                value={option[selector]}
              >
                  {option[selector]}
              </option>
            )
          } else {
            return (
              <option
                key={index}
                value={option}>
                  {option}
              </option>
            )
          }
        })
      }
    </select>
  )
}

export default Select