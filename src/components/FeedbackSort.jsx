import { TbSortAscending2, TbSortDescending2 } from 'react-icons/tb'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackSort() {
    const { sortRatingAsc, sortRatingDesc, sortFeedback } = useContext(FeedbackContext)
  return (
    <div>
      <div className="sorting">
        <span>Sort:</span>
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

export default FeedbackSort
