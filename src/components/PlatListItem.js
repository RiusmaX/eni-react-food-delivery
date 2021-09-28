import PropTypes from "prop-types"

PlatListItem.propTypes = {
  plat: PropTypes.object.isRequired
}

function PlatListItem ({ plat }) {
  return (
    <div className='card'>
      { (plat.photos && plat.photos.length > 0) && <img src={`https://strapi.myidea.fr${plat.photos[0].url}`} />}
      <h3>{plat.nom}</h3>
      <h4>{plat.price.toFixed(2)} €</h4>
      <p>{plat.description}</p>
    </div>
  )
} 

export default PlatListItem