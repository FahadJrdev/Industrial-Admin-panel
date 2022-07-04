import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../../component/buttons';
import {Input,SelectVal} from '../Leasing-Component';
import './lp.css';
const initialState = {
    Code: '',
    Decription: '',
    Form_of_calculation: '',
    Data_type: '',
    Format: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const LeasingParameter = ({ title ,language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Code, Decription, Form_of_calculation, Data_type, Format } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor leasingParameter">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='leasingParameterForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="leasingParameter-body">
                        <ul>
                            <Input label={`Code`} type={`text`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                            <Input label={`Valid from`} type={`text`} name={`Decription`} value={Decription} placeholder={`Automatic`} onChange={onChange} />
                        </ul>
                        <ul>
                            <SelectVal label={`Form of calculation`} name={`Form_of_calculation`} value={Form_of_calculation} placeholder={`Select`} onChange={onChange} value1={`Form_of_calculation-1`} value2={`Form_of_calculation-2`} value3={`Form_of_calculation-3`} value4={`Form_of_calculation-4`} hideValue5={`dn`}/>
                            <SelectVal label={`Data type`} name={`Data_type`} value={Data_type} placeholder={`Select`} onChange={onChange} value1={`Data_type-1`} value2={`Data_type-2`} value3={`Data_type-3`} value4={`Data_type-4`} hideValue5={`dn`}/>
                        </ul>
                        <ul>
                            <SelectVal label={`Format`} name={`Format`} value={Format} placeholder={`Select`} onChange={onChange} value1={`Format-1`} value2={`Format-2`} value3={`Format-3`} value4={`Format-4`} hideValue5={`dn`}/>
                        </ul>
                    </div>
                    <div className="submit">
                        <Button text={language.global.accept} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default LeasingParameter