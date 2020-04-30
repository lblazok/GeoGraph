import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import ListBorehole from './ListBorehole'
import ShowProjectControl from './ShowProjectControl'


function ShowProject({match}) {
    const [state, setState] = useState([])
    const [project, setProject] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/projects/'+ match.params.id)
            .then((res) =>{
                const project = res.data[0]
                const borehole = res.data.slice(1)
                setState(borehole)
                setProject(project)
            })
        return () => {
            setState([])
        }
    }, [])

    return (
        <div className='row'>
            <div className='col-2'>

            </div>

            <div className='col-9'>
                <div>
                    <ShowProjectControl project={project} />
                </div>
                <h4 className='text-center'>Boreholes</h4>
               <table className='table table-striped text-center '>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Project ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Start date</th>
                                <th>End date</th>
                                <th>X</th>
                                <th>Y</th>
                                <th>Z</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((x, i) => (
                                <ListBorehole borehole={x} rb={i} key={i} />
                            ))}
                        </tbody>
                    </table> 
            </div>

            <div className='col-1'>

            </div>
        </div>
    )

}


export default ShowProject