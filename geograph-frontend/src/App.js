import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Landing from './components/Landing'
import Home from './components/Home'


function App() {
    return (
        <Router>
            <Route exact path='/' component={Landing} />
            <Route path='/home' component={Home} /> 
        </Router>
    )
}


export default App