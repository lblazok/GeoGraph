import React, { useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ProjectForm from './ProjectForm'

function EditProject({match}) {
    const [values, setValues] = useState({
        name: '',
        client: '',
        location: '',
        start_date: '',
        end_date: ''
    })

    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:4000/projects/${match.params.id}/edit`)
            .then(res => {
                let dbData = res.data
                dbData.start_date = dbData.start_date === null ? '' : dbData.start_date.slice(0, 10)
                dbData.end_date = dbData.end_date === null ? '' : dbData.end_date.slice(0, 10)
                setValues(dbData)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = e => {
        console.log('fadsf')
        e.preventDefault()
        axios.put(`http://localhost:4000/projects/${match.params.id}`, values)
            .then((resposne) => {
                redirect()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const redirect = () => {
        history.push('/projects')
    }

    return (
        <div className='row'>
            <div className='col-2'>
                navbar
            </div>

            <div className='col-8 justify-content-center' style={{display: 'grid'}} >
                <h3 >Edit Project {values.name}</h3>
                
                <ProjectForm values={values} onChange={handleChange} onSubmit={handleSubmit} redirect={redirect} />
            </div>

            <div className='col-2'>
            </div>
        </div>
 
    )

}

export default EditProject