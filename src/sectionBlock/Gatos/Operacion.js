import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { Input, Select} from '../Leasing-section/Leasing-Component';
import './gatos.css';
import {LastPagoTable, LastPagoTable2} from '../../component/table';
import {LastPagoInfo, LastPagoInfo2} from '../../data/InvestorInfo';
const initialState = {
    Código_factura: '',
    Número_de_factura: '',
    Estado: '',
    Fecha_de_ingreso: '',
    Fecha_de_la_factura: '',
    Fecha_vencimiento: '',
    Fecha_radicación: '',
    Concepto_del_pago: '',
    Código: '',
    Nit_identifición: '',
    Nombre_Razón_social: '',
    Número_de_pagos: '',
    V_Total_factura: '',
    Descuento_total: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const GatosOperacion = ({ title ,language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const { Código_factura, Número_de_factura, Estado, Fecha_de_ingreso, Fecha_de_la_factura, Fecha_vencimiento, Fecha_radicación, Concepto_del_pago, Código, Nit_identifición, Nombre_Razón_social, Número_de_pagos, V_Total_factura, Descuento_total } = state;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor PagoFactura">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='PagoFacturaForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="PagoFactura-body">
                        <ul>
                            <Input label={`Código factura`} type={`text`} name={`Código_factura`} value={Código_factura} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ `Número de factura` } type={`text`} name={`Número_de_factura`} value={Número_de_factura} placeholder={`Select`} onChange={onChange} />
                            <Select label={ `Estado` } name={`Estado`} value={Estado} placeholder={`select`} value1={`Estado-1`} value2={`Estado-2`} value3={`Estado-3`} value4={`Estado-4`} hideValue5={`dn`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Input label={ `Fecha de ingreso` } type={`text`} name={`Fecha_de_ingreso`} value={Fecha_de_ingreso} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ `Fecha de la factura` } type={`text`} name={`Fecha_de_la_factura`} value={Fecha_de_la_factura} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ `Fecha vencimiento` } type={`text`} name={`Fecha_vencimiento`} value={Fecha_vencimiento} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ `Fecha radicación` } type={`text`} name={`Fecha_radicación`} value={Fecha_radicación} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Select label={ `Concepto del pago` } name={`Concepto_del_pago`} value={Concepto_del_pago} placeholder={`select`} value1={`Concepto_del_pago-1`} value2={`Concepto_del_pago-2`} value3={`Concepto_del_pago-3`} value4={`Concepto_del_pago-4`} hideValue5={`dn`} onChange={onChange} />
                        </ul>
                        <h4>Datos del proveedor</h4>
                        <ul>
                            <Input label={ `Código` } type={`text`} name={`Código`} value={Código} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ `Nit/identifición` } type={`text`} name={`Nit_identifición`} value={Nit_identifición} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ `Nombre/ Razón social` } type={`text`} name={`Nombre_Razón_social`} value={Nombre_Razón_social} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <LastPagoTable2 language={language} data={LastPagoInfo2} />
                        <ul>
                            <Select label={ `Número de pagos` } name={`Número_de_pagos`} value={Número_de_pagos} placeholder={`Enter`} value1={`Número_de_pagos-1`} value2={`Número_de_pagos-2`} value3={`Número_de_pagos-3`} value4={`Número_de_pagos-4`} hideValue5={`dn`} onChange={onChange} />
                        </ul>
                        <div className="lastPagoTable">
                            <LastPagoTable language={language} data={LastPagoInfo} />
                            <ul>
                                <h3>Totales</h3>
                                <Input label={ `V/ Total factura` } type={`text`} name={`V_Total_factura`} value={V_Total_factura} placeholder={`Enter`} onChange={onChange} />
                                <Input label={ `Descuento total` } type={`text`} name={`Descuento_total`} value={Descuento_total} placeholder={`Enter`} onChange={onChange} />
                            </ul>
                        </div>
                    </div>
                    <div className="Esheet-submit">
                        <Button text={`Registrar factura`} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default GatosOperacion;