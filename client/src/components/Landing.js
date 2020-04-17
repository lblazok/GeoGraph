import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import '../style.css'

function Landing() {
    const icon = <FontAwesomeIcon icon={faChartArea} />
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">

                <div id='landing-header'>
                    <h1 className="display-4">{icon} GeoGraph</h1>
                    <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has</p>
                    <a className='btn btn-primary btn-lg' href='/home'>Get Started!</a>
                    
                </div>


                <ul className="slideshow">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}


export default Landing