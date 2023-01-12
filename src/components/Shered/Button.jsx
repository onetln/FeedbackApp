import PropTypes from 'prop-types'

function Button({ children, version, type, isDisabled, display }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version} ${!display && ' hide'}`} >
        {children}
    </button>
  )
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
    display: true,
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
}

export default Button
