import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Landing from './components/Landing'
import Home from './components/Home'
import CalcQ from './components/calculators/calcQ'
import Projects from './components/projects/Projects.js'
import NewProject from './components/projects/NewProject'
import ShowProject from './components/projects/ShowProject'

function App() {
    return (
        <Router>
            <Route exact path='/' component={Landing} />
            <Route path='/home' component={Home} /> 
            <Route path='/calcQ' component={CalcQ} /> 
            <Switch>
                <Route exact path='/projects' component={Projects} />
                <Route exact strict path='/projects/new' component={NewProject} />
                <Route path='/projects/:id' component={ShowProject} />               
            </Switch>

        </Router>
    )
}


export default App