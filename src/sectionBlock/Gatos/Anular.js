import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import {Input} from '../../component/input';
import './gatos.css';
const initialState = {
    Número_de_comprobante: '',
    Tipo_de_comprobante: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const GatosAnular = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Número_de_comprobante, Tipo_de_comprobante } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <form className='information gatos' action="" method='POST' onSubmit={handleSubmit}>
                    <ul>
                        <Input label={`Número de comprobante`} type={`text`} name={`Número_de_comprobante`} value={Número_de_comprobante} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Tipo de comprobante`} type={`text`} name={`Tipo_de_comprobante`} value={Tipo_de_comprobante} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <div className="submit-button">
                        <Button text={language.global.register} background={`var(--primary-color)`} types={`button`} click={Option} />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default GatosAnular;