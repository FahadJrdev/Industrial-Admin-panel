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
    Tipo: '',
    Tipo_de_contrato: '',
    Número_de_producto: '',
    Code: '',
    Identificación: '',
    Nombre: '',
    Línea: '',
    Tipo_de_pago: '',
    Referencia_1: '',
    Valor_a_pagar: '',
    Fecha_de_corte: '',
    Code1: '',
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
const Financiera2 = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  
        Número_de_comprobante, 
        Tipo_de_comprobante, 
        Fecha_del_comprobante, 
        Identificación_tercero, 
        Nombre_del_tercero, 
        Tipo_de_movimiento, 
        Valor, Detalle, 
        Concepto, 
        Tipo, 
        Tipo_de_contrato,
        Número_de_producto,
        Code,
        Identificación,
        Nombre,
        Línea,
        Tipo_de_pago,
        Referencia_1,
        Valor_a_pagar,
        Fecha_de_corte,
        Code1,
        Project_name,
        Investment_objective,
        Country,
        City,
        Responsible
    } = state;
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
                <form className='information financiera financiera2' action="" method='POST' onSubmit={handleSubmit}>
                    <h1>La información contable se genero mediante el mecanismo de carga.</h1>
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
                    <h2>Detalle de la operación</h2>
                    <ul>
                        <SelectVal label={`Tipo`} name={`Tipo`} value={Tipo} placeholder={`Enter`} onChange={onChange} value1={`Tipo-1`} value2={`Tipo-2`} value3={`Tipo-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <SelectVal label={`Tipo de contrato`} name={`Tipo_de_contrato`} value={Tipo_de_contrato} placeholder={`Enter`} onChange={onChange} value1={`Tipo_de_contrato-1`} value2={`Tipo_de_contrato-2`} value3={`Tipo_de_contrato-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Número de producto`} type={`text`} name={`Número_de_producto`} value={Número_de_producto} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul>
                        <Input label={`Code`} type={`text`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Identificación`} type={`text`} name={`Identificación`} value={Identificación} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Nombre`} type={`text`} name={`Nombre`} value={Nombre} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul>
                        <Input label={`Línea`} type={`text`} name={`Línea`} value={Línea} placeholder={`Enter`} onChange={onChange} />
                        <SelectVal label={`Tipo de pago`} name={`Tipo_de_pago`} value={Tipo_de_pago} placeholder={`Enter`} onChange={onChange} value1={`Tipo_de_pago-1`} value2={`Tipo_de_pago-2`} value3={`Tipo_de_pago-3`} hideValue4={`dn`} hideValue5={`dn`} />
                    </ul>
                    <ul>
                        <Input label={`Referencia 1`} type={`text`} name={`Referencia_1`} value={Referencia_1} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Valor a pagar`} type={`text`} name={`Valor_a_pagar`} value={Valor_a_pagar} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Fecha de corte`} type={`text`} name={`Fecha_de_corte`} value={Fecha_de_corte} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <h2>Información del proyecto</h2>
                    <ul>
                        <Input label={`Code`} type={`text`} name={`Code1`} value={Code1} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Project name`} type={`text`} name={`Project_name`} value={Project_name} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Investment objective`} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                        <SelectVal label={`Country`} name={`Country`} value={Country} placeholder={`Enter`} onChange={onChange} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} hideValue4={`dn`} hideValue5={`dn`} />
                    </ul>
                    <ul>
                        <SelectVal label={`City`} name={`City`} value={City} placeholder={`Enter`} onChange={onChange} value1={`City-1`} value2={`City-2`} value3={`City-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Responsible`} type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
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

export default Financiera2;