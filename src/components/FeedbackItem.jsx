import PropTypes from 'prop-types'
import { FaTimes, FaEdit } from "react-icons/fa";
import Card from './Shered/Card'
import {useContext, useState, useEffect} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackItem({ item }) {
  const { deleteFeedback, feedbackEdit, editFeedback } = useContext(FeedbackContext)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    feedbackEdit.item.id !== item.id && setIsDisabled(feedbackEdit.edit)
  }, [feedbackEdit, item])

  //const isDisabled = Object.keys(feedbackEdit.item).length > 0 && feedbackEdit.item.id !== item.id

  return (
    <Card disabled={isDisabled} pulse={feedbackEdit.item.id === item.id && feedbackEdit.edit}> 
        <div className="num-display">{item.rating}</div>
        <div className="item-butons">
          <button className='edit' onClick={() => editFeedback(item)} disabled={isDisabled}>
            <FaEdit />
          </button>
          <button onClick={() => deleteFeedback(item.id)} disabled={isDisabled}
          className='close'>
            <FaTimes/>
          </button>
         </div>
        <div className="text-display">{item.text}</div>
        <div className='feedback-date'>Last update: {item.date}</div>
    </Card>
  )
}

FeedbackItem.protoTypes = {
    item: PropTypes.object.isRequired,
}

export default FeedbackItem
