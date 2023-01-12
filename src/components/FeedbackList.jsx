import {motion, AnimatePresence} from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
  const { feedback } = useContext(FeedbackContext)

    if(!feedback || feedback.length === 0) {
        return <p style={ {padding: '15px'} }>No feedback yet!</p>
    }



    return (
      <div>
        <AnimatePresence>
        {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity:0}}
              transition={{ duration: 0.6 }}
            >
              <FeedbackItem key={item.id} item={item}/>
            </motion.div>
        ))}
        </AnimatePresence>
      </div>
    )
}

export default FeedbackList
