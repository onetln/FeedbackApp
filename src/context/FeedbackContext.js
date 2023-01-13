import {createContext, useState} from 'react'
import { CurrentDateTime, sortByDate } from '../functions/HelperFunctions'
import { v4 as uuidv4} from 'uuid'
import FeedbackData from '../data/FeedbackData'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    //default state for feedbackEdit
    const feedbackEditInitial = {
        item: {},
        edit: false
    }

    const [feedback, setFeedback] = useState(sortByDate(FeedbackData))
    const [sortRatingAsc, setSortRatingAsc] = useState(false)
    const [sortRatingDesc, setSortRatingDesc] = useState(false)
    const [feedbackEdit, setFeedbackEdit] = useState(feedbackEditInitial)

    const deleteFeedback = (id) => {
        if (window.confirm('Delete feedback?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
            setFeedbackEdit(feedbackEditInitial)
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        newFeedback.date = CurrentDateTime()
        const sorted = [...sortByDate(feedback)]
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
            setFeedback([item, ...feedbackFiltered])
        } else {
            setFeedbackEdit(feedbackEditInitial)
            const sorted = [...sortByDate(feedback)]
            setFeedback(sorted)
        }
    }

    const updateFeedback = (id, updatedFeedback) => {
        updatedFeedback.date = CurrentDateTime()
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updatedFeedback} : item)))
        setFeedbackEdit(feedbackEditInitial)
    }

    const sortFeedback = (sortAsc, sortDesc) => {
        const newFeedback = [...feedback]
        if(sortAsc) {
            setFeedback(newFeedback.sort((a, b) => a.rating - b.rating))
        } else if (sortDesc) {
            setFeedback(newFeedback.sort((a, b) => b.rating - a.rating))
        } else {
            setFeedback(sortByDate(newFeedback))
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