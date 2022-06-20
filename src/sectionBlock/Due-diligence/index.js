import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { DownloadIcon } from '../../component/icon/icon';
import './due.css';
const initialState = {
    nitValidate: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const Due = ({ title }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { nitValidate } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor due">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { `Back` }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='dueForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="due-body">
                        <li>
                            <label htmlFor="nitValidate">Enter Nit or Cédula to consult</label>
                            <input type="text" name='nitValidate' value={nitValidate} onChange={onChange} placeholder='Enter'/>
                        </li>
                        <Button text={`Validate`} background={`var(--tartiary-color)`} types={`submit`}/>
                        <p className='title'>Consultation results</p> 
                        <button>Download PDF <DownloadIcon /></button>
                    </div>
                    <div className="submit">
                        <Button text={`Accept`} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default Due