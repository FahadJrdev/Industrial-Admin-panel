import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../../component/buttons';
import {Input,Select} from '../Leasing-Component';
import './ND.css';
const initialState = {
    Code: '',
    Name_of_document: '',
    Type: '',
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const NewDoc = ({ title ,language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Code, Name_of_document, Type } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor NewDoc">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='NewDocForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="NewDoc-body">
                        <ul>
                            <Input label={`Code`} type={`text`} name={`Code`} value={Code} placeholder={`Automatic`} onChange={onChange} />
                            <Input label={`Name of document`} type={`text`} name={`Name_of_document`} value={Name_of_document} placeholder={`Automatic`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Select label={`Type`} name={`Type`} value={Type} placeholder={`Select`} onChange={onChange} value1={`Type-1`} value2={`Type-2`} value3={`Type-3`} value4={`Type-4`} hideValue5={`dn`}/>
                        </ul>
                    </div>
                    <div className="submit">
                        <Button text={`Create`} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default NewDoc