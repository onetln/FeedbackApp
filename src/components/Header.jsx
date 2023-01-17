import React from 'react'
import PropTypes from 'prop-types'

function Header({ text, bgColor, textColor }) {
    const headerStyle = {
        backgroundColor: bgColor,
        color: textColor
    }
  return (
    <header style={headerStyle}> 
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  )
}

Header.defaultProps = {
    text: 'Feedback UI',
    bgColor: '#0b0c10',
    textColor: '#66FCF1'
}

Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    color: PropTypes.string
}
export default Header
