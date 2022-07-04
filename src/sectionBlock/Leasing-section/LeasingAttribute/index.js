import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../../component/buttons';
import {Input,Select,Checkbox} from '../Leasing-Component';
import './LA.css';
const initialState = {
    Code: '',
    Name: '',
    Depends_on: '',
    Cause: '',
    Close: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const LeasingAttribute = ({ title ,language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Code, Name, Depends_on, Cause, Close } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor leasingAttribute">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='leasingAttributeForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="leasingAttribute-body">
                        <ul>
                            <Input label={`Code`} type={`text`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                            <Input label={`Name`} type={`text`} name={`Name`} value={Name} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Select label={`Depends on`} name={`Depends_on`} value={Depends_on} placeholder={`Select`} onChange={onChange} value1={`Depends_on-1`} value2={`Depends_on-2`} value3={`Depends_on-3`} value4={`Depends_on-4`} hideValue5={`dn`}/>
                        </ul>
                        <ul>
                            <Checkbox label={`Cause`} name={`Cause`} value={Cause} onChange={onChange} />
                            <Checkbox label={`Close`} name={`Close`} value={Close} onChange={onChange} />
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

export default LeasingAttribute