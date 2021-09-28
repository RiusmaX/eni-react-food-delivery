import PropTypes from "prop-types"
import PlatListItem from "./PlatListItem"

PlatList.propTypes = {
  plats: PropTypes.array.isRequired
}

function PlatList ({ plats }) {
  return (
    <div className='list-container'>
      {
        plats.map((plat) => {
          return (
            <PlatListItem plat={plat} />
          )
        })
      }
    </div>
  )
}

export default PlatList