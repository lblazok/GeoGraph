import React from 'react'

function ShowProjectControl(props) {
    return (
        <div>
            <h5>Project ID: {props.project.project_id}</h5>
            <h5>Name: {props.project.name}</h5>
            <h5>Client: {props.project.client}</h5>
            <h5>Location: {props.project.location}</h5>
        </div>
    )
}


export default ShowProjectControl