import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../../styles/calcQ.css'

function CalcQ() {
    
    const [state, setState] = useState({
        dia: '',
        length: '',
        n: '',
        v: '',
        ans: ''
    })

    const calculate = (dia, l, n, v) => {
        return (Number(dia)/2) * 2 * Math.PI * Number(l) * (Number(n) / 100) * Number(v) 
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        const res = calculate(state.dia, state.length, state.n, state.v)
        setState(prevState => ({
            ...prevState,
            ans: res
        }))
        console.log(state.ans)
        event.preventDefault()
    }

    return (
        <div className='container-fluid'>
            <h2>Discharge of Well</h2>

            <div className='row'>
                <div className='col-2'>
                    
                </div>
                <div className='col-3'>
                    <form onSubmit={handleSubmit}>
                
                        <div className='form-group'>
                            <label htmlFor = 'dia'>Diameter of Construction - d [m]: </label>
                            <input className='ml-3 form-control d-flex ' 
                            name='dia'
                            id='dia'
                            type='number'
                            value = {state.dia}
                            onChange={handleChange}
                            step='0.01'
                            />
                            
                        </div>
                        <div className='form-group'>
                            <label htmlFor = 'length'>Length of Screen - l [m]: </label>
                            <input className='ml-3 form-control d-flex' 
                            name='length'
                            id='length'
                            type='number'
                            value = {state.length}
                            onChange={handleChange}
                            step='0.01'
                            />
                            
                        </div>
                        <div className='form-group'>
                            <label htmlFor ='n'>% of open surface [%]: </label>
                            <input className='ml-3 form-control d-flex' 
                            name='n'
                            id='n'
                            type='number'
                            value = {state.n}
                            onChange={handleChange}
                            step='0.01'
                            />
                            
                        </div>
                        <div className='form-group'>
                            <label htmlFor ='v'>Water inflow rate - v [m/s]: </label>
                            <input className='ml-3 form-control d-flex' 
                            name='v'
                            id='v'
                            type='number'
                            value = {state.v}
                            onChange={handleChange}
                            step='0.01'
                            />
                            
                        </div>

                        <button className='btn btn-primary'>Calculate!</button>
                    </form>
                </div>
                <div className='col-4'>
                    <p>slika</p>
                </div>
                <div className='col-3'>
                    <p>Discharge of Well = {Number(state.ans).toFixed(4)} m<sup>3</sup>/s</p>
                </div>
            </div>

        </div>
    )

}


export default CalcQ