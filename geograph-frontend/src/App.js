import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Landing from './components/Landing'
import Home from './components/Home'
import CalcQ from './components/calculators/calcQ'
import Projects from './components/projects/Projects.js'


function App() {
    return (
        <Router>
            <Route exact path='/' component={Landing} />
            <Route path='/home' component={Home} /> 
            <Route path='/calcQ' component={CalcQ} /> 
            <Route path='/projects' component={Projects} />
        </Router>
    )
}


export default App