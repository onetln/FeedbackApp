import {createContext, useState} from 'react'
import CurrentDateTime from '../functions/DateTime'
import { v4 as uuidv4} from 'uuid'
import FeedbackData from '../data/FeedbackData'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState(FeedbackData.sort((a, b) => new Date(b.date) - new Date(a.date)))
    const [sortRatingAsc, setSortRatingAsc] = useState(false)
    const [sortRatingDesc, setSortRatingDesc] = useState(false)
    const [feedbackEdit, setFeedbackEdit] = useState(
        {
            item: {},
            edit: false
        }
    )

    const deleteFeedback = (id) => {
        if (window.confirm('Delete feedback?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
            setFeedbackEdit(
                {
                    item: {},
                    edit: false,
                }
            )
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        newFeedback.date = CurrentDateTime()
        const sorted = [...feedback].sort((a, b) => new Date(b.date) - new Date(a.date))
        setFeedback([newFeedback, ...sorted])
        setSortRatingAsc(false)
        setSortRatingDesc(false)
    }

    const editFeedback = (item) => {
        if(Object.keys(item).length > 0) {
            setFeedbackEdit(
                {
                    item,
                    edit: true
                }
            )
            const feedbackFiltered = (feedback.filter((feedback) => feedback.id !== item.id))
            // feedbackFiltered.map(item => item.disabled = true)
            // console.log(feedbackFiltered)
            setFeedback([item, ...feedbackFiltered])
        } else {
            setFeedbackEdit(
                {
                    item: {},
                    edit: false
                }
            )
            const sorted = [...feedback].sort((a, b) => new Date(b.date) - new Date(a.date))
            setFeedback(sorted)
        }
    }

    const updateFeedback = (id, updatedFeedback) => {
        updatedFeedback.date = CurrentDateTime()
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updatedFeedback} : item)))
        setFeedbackEdit(
            {
                item: {},
                edit: false
            }
        )
    }

    const sortFeedback = (sortAsc, sortDesc) => {
        const newFeedback = [...feedback]
        if(sortAsc) {
            setFeedback(newFeedback.sort((a, b) => a.rating - b.rating))
        } else if (sortDesc) {
            setFeedback(newFeedback.sort((a, b) => b.rating - a.rating))
        } else {
            setFeedback(newFeedback.sort((a, b) => new Date(b.date) - new Date(a.date)))
        }
        setSortRatingAsc(sortAsc)
        setSortRatingDesc(sortDesc)
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        sortRatingAsc,
        sortRatingDesc,
        deleteFeedback,
        addFeedback,
        editFeedback,
        sortFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext