import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import {Input, Textarea} from '../../component/input';
import './gatos.css';
const initialState = {
    Fecha_de_operación: '',
    Usuario_que_registro: '',
    Observaciones: '',
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const GatosAprobar = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Fecha_de_operación, Usuario_que_registro, Observaciones } = state;
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
                        <Input label={`Fecha de operación`} type={`text`} name={`Fecha_de_operación`} value={Fecha_de_operación} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Usuario que registro`} type={`text`} name={`Usuario_que_registro`} value={Usuario_que_registro} placeholder={`Enter`} onChange={onChange} />
                        <Textarea label={`Observaciones`} name={`Observaciones`} value={Observaciones} placeholder={`Enter`} onChange={onChange} cols={5} rows={10} />   
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

export default GatosAprobar;
