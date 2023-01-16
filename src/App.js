import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackSort from './components/FeedbackSort'
import AboutIconLink from './components/AboutIconLink'
import {FeedbackProvider} from './context/FeedbackContext'
import React, {lazy, Suspense} from 'react'

const AboutPage = lazy(() => import('./pages/AboutPage'))

function App() {
    
        return (
        <FeedbackProvider>
            <Router>
                <Header />
                    <div className="container">
                        <Routes>
                            <Route exact path='/' element={
                                <>
                                    <FeedbackForm />
                                    <FeedbackStats />
                                    <FeedbackSort />                                    
                                    <FeedbackList />
                                </>
                            }>
                            </Route>
                            <Route path='/about' element={
                                <Suspense fallback={<h3>Loading...</h3>}>
                                    <AboutPage />
                                </Suspense>
                            } />
                        </Routes>
                    </div>
                    <AboutIconLink />
            </Router>
        </FeedbackProvider>
    )
    
}

export default App