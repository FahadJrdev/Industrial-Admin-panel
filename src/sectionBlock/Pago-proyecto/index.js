import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { Input, Select} from '../Leasing-section/Leasing-Component';
import './pp.css';
const initialState = {
    Code: '',
    Project_name: '',
    Investment_objective: '',
    Country: '',
    City: '',
    Responsible: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const PagoProyecto = ({ title ,language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const { Code, Project_name, Investment_objective, Country, City, Responsible } = state;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor PagoProyecto">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='PagoProyectoForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="PagoProyecto-body">
                        <h5>Información del proyecto</h5>
                        <ul>
                            <Input label={ language.revenues.paymancode } type={`text`} name={`Code`} value={Code} placeholder={`Ingresar`} onChange={onChange} />
                            <Input label={ `Project name` } type={`text`} name={`Project_name`} value={Project_name} placeholder={`Project name `} onChange={onChange} />
                            <Input label={ `Investment objective` } type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Select label={ `Country` } name={`Country`} value={Country} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                            <Select label={ `City` } name={`City`} value={City} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                            <Input label={ `Responsible` } type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                    </div>
                    <div className="Esheet-submit">
                        <Button text={`Register`} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default PagoProyecto;