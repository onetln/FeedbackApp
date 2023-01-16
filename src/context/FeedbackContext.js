import {createContext, useState, useEffect} from 'react'
import { sortByDate } from '../functions/HelperFunctions'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    //default state for feedbackEdit
    const feedbackEditInitial = {
        item: {},
        edit: false
    }

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [sortRatingAsc, setSortRatingAsc] = useState(false)
    const [sortRatingDesc, setSortRatingDesc] = useState(false)
    const [feedbackEdit, setFeedbackEdit] = useState(feedbackEditInitial)

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=date&_order=desc")
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Delete feedback?')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter((item) => item.id !== id))
            setFeedbackEdit(feedbackEditInitial)
        }
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch("/feedback", {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json()
        setFeedback([data, ...feedback])
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

    const updateFeedback = async (id, updatedFeedback) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFeedback)
        })
        
        const data = await response.json()
        setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...data} : item)))
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
        isLoading,
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