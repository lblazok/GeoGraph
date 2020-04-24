import React from 'react'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"


function ListBorehole(props) {
    return(
        <tr>
            <td className='align-middle'>{props.rb + 1}</td>
            <td className='align-middle'>{props.borehole.project_id}</td>
            <td className='align-middle'>{props.borehole.borehole_name}</td>
            <td className='align-middle'>{props.borehole.borehole_type}</td>
            <td className='align-middle'>{typeof(props.borehole.start_date) === 'string' && props.borehole.start_date.slice(0, 10)}</td>
            <td className='align-middle'>{typeof(props.borehole.end_date) === 'string' && props.borehole.end_date.slice(0, 10)}</td>
            <td className='align-middle'>{props.borehole.coo_x}</td>
            <td className='align-middle'>{props.borehole.coo_y}</td>
            <td className='align-middle'>{props.borehole.coo_z}</td>
            <td>
                <Link to={'#'} className='btn btn-warning'>Edit</Link>
            </td>
        </tr>
    )
}


export default ListBorehole