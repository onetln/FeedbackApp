import { TbSortAscending2, TbSortDescending2 } from 'react-icons/tb'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  const { feedback, sortRatingAsc, sortRatingDesc, sortFeedback } = useContext(FeedbackContext)

let average = feedback.reduce((acc, cur) => {
    return acc + cur.rating
}, 0) / feedback.length

average = average.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Review{feedback.length > 0 && 's'}</h4>
        <div className="rating-data">
        <h4>Average rating: {isNaN(average) ? 0 : average}</h4> 
          <button 
            title='Sort descending' 
            className={`btn-sort ${sortRatingDesc && 'active'}`}
            onClick={() => sortFeedback(false, !sortRatingDesc)}
          >
            <TbSortDescending2></TbSortDescending2>
          </button>
          <button 
            title='Sort ascending' 
            className={`btn-sort ${sortRatingAsc && 'active'}`}
            onClick={() => sortFeedback(!sortRatingAsc, false)}
          >
            <TbSortAscending2></TbSortAscending2>
          </button>
        </div>
    </div>
  )
}

export default FeedbackStats
