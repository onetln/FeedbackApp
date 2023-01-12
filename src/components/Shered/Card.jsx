import PropTypes from 'prop-types'

function Card({ children, reverse, disabled, pulse }) {
  return (
    <div className={`card ${reverse && 'reverse '} ${disabled && 'card-disabled '} ${pulse && 'pulse '}`} >
      {children}
     
    </div>
  )
}

Card.defaultProps = {
    reverse: false,
    disabled: false,
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
    disabled: PropTypes.bool,
}

export default Card
