import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {withRouter, Link} from 'react-router-dom'

function ProjectForm(props) {


    return (
        <form onSubmit={props.onSubmit} >
            <div className='form-group'>
                <label htmlFor='name'>Project name:</label>
                <input type='text' 
                className='form-control' 
                id='name' 
                value={props.values.name}
                required
                name='name'
                onChange={props.onChange('name')}
                label='Project name:'
                />

            </div>

            <div className='form-group'>
                <label htmlFor='client'>Client:</label>
                <input type='text' 
                className='form-control' 
                id='client' 
                value={props.values.client}
                required
                name='client'
                onChange={props.onChange('client')}
                label='Client:'
                />
            </div>

            <div className='form-group'>
                <label htmlFor='location'>Location:</label>
                <input type='text' 
                className='form-control' 
                required
                id='location' 
                value={props.values.location}
                name='location'
                onChange={props.onChange('location')}
                />
            </div>

            <div className='form-group'>
                <label htmlFor='start'>Start date:</label>
                <input type='date' 
                className='form-control' 
                id='start' 
                value={props.values.start_date}
                name='start_date'
                required
                onChange={props.onChange('start_date')}
                />
            </div>

            <div className='form-group'>
                <label htmlFor='end'>End date:</label>
                <input type='date' 
                className='form-control' 
                id='end' 
                required
                value={props.values.end_date}
                name='end_date'
                onChange={props.onChange('end_date')}
                />
            </div>
            <button  className='btn btn-primary'>Sumbit</button>
        </form>
    )
}

export default ProjectForm