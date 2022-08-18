import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import {Input, SelectVal} from '../../component/input';
import './uti.css';
const initialState = {
    Número_de_comprobante: '',
    Tipo_de_comprobante: '',
    Fecha_del_comprobante: '',
    Identificación_tercero: '',
    Nombre_del_tercero: '',
    Tipo_de_movimiento: '',
    Valor: '',
    Detalle: '',
    Concepto: '',
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const Financiera = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Número_de_comprobante, Tipo_de_comprobante, Fecha_del_comprobante, Identificación_tercero, Nombre_del_tercero, Tipo_de_movimiento, Valor, Detalle, Concepto } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval Financiera">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <form className='information financiera' action="" method='POST' onSubmit={handleSubmit}>
                    <ul>
                        <Input label={`Número de comprobante`} type={`text`} name={`Número_de_comprobante`} value={Número_de_comprobante} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Tipo de comprobante`} type={`text`} name={`Tipo_de_comprobante`} value={Tipo_de_comprobante} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Fecha del comprobante`} type={`text`} name={`Fecha_del_comprobante`} value={Fecha_del_comprobante} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Identificación tercero`} type={`text`} name={`Identificación_tercero`} value={Identificación_tercero} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul>
                        <Input label={`Nombre del  tercero`} type={`text`} name={`Nombre_del_tercero`} value={Nombre_del_tercero} placeholder={`Enter`} onChange={onChange} />
                        <SelectVal label={`Tipo de movimiento`} name={`Tipo_de_movimiento`} value={Tipo_de_movimiento} placeholder={`Enter`} onChange={onChange} value1={`Tipo_de_movimiento-1`} value2={`Tipo_de_movimiento-2`} value3={`Tipo_de_movimiento-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Valor`} type={`text`} name={`Valor`} value={Valor} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul>
                        <Input label={`Detalle`} type={`text`} name={`Detalle`} value={Detalle} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Concepto`} type={`text`} name={`Concepto`} value={Concepto} placeholder={`Enter`} onChange={onChange} />
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

export default Financiera;