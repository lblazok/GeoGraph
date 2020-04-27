import React, { useState, useEffect} from 'react'
import {Link, useHistory, withRouter, Redirect, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import ProjectForm from './ProjectForm'
import axios from 'axios'

function NewProject() {
    const [values, setValues] = useState({
        name: '',
        client: '',
        location: '',
        start_date: '',
        end_date: ''
    })

    const history = useHistory()

    const redirect = () => {
        history.push('/projects')
    }

    const handleChange = (name) => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/projects', values)    
            .catch(err => {
                console.log(err)
            })
        redirect()
    }

    return (
        <div className='row'>
            <div className='col-2'>
                navbar
            </div>

            <div className='col-8 justify-content-center' style={{display: 'grid'}} >
                <h3 >Add new Project</h3>
                
                <ProjectForm values={values} onChange={handleChange} onSubmit={handleSubmit} redirect={redirect} />
                {/* <button className='btn btn-primary' onClick={handleSubmit}>Submit</button> */}
            </div>

            <div className='col-2'>
            </div>
        </div>
    ) 
}

export default NewProject