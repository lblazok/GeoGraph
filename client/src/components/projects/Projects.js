import React, { useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

const Project = props => (
    <tr>
        <td>{props.xProject.project_id}</td>
        <td>{props.xProject.name}</td>
        <td>{props.xProject.client}</td>
        <td>{props.xProject.location}</td>
        <td>{typeof(props.xProject.start_date) === 'string' && props.xProject.start_date.slice(0, 10)}</td>
        <td>{typeof(props.xProject.end_date) === 'string' && props.xProject.end_date.slice(0, 10)}</td>
        <td>
            <Link to={'/projects/'+props.xProject.project_id} className='btn btn-primary'>Details</Link>
        </td>
        <td>
            <Link to={`/projects/${props.xProject.project_id}/edit`} className='btn btn-warning'>Edit</Link>
        </td>
        <td>
            <button className='btn btn-danger' value={props.xProject.project_id} onClick={props.handleDelete}>Delete</button>
        </td>


    </tr>
)

function Projects() {
    const [project, setProject] = useState([])

    useEffect(() => {
        setProject([])
        axios.get('http://localhost:4000/projects')
            .then((res) => {
                setProject(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        return () => {
            setProject([])
        }

    }, [])


    const handleDelete= (event) => {
        const id = event.target.value
        axios.delete(`http://localhost:4000/projects/${id}`)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    return (
       
            <div className='row'>
                <div className='col-2'>

                </div>
                <div className='col-9'>
                    <h3>Project List</h3>
                    <Link to={'/projects/new'} className='btn btn-success my-2'>Add project</Link>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Project ID</th>
                                <th>Name</th>
                                <th>Client</th>
                                <th>Location</th>
                                <th>Start date</th>
                                <th>End date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.map((x, i) => (
                                <Project xProject={x} handleDelete={handleDelete}  key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='col-1'></div>
            </div>
    );
}



export default Projects