import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './gatos.css';
import {Input, SelectVal, Textarea} from '../../component/input';
const initialState = {
    Código_orden: '',
    Fecha: '',
    Estado: '',
    Forma_de_pago: '',
    Tipo_de_pago: '',
    Código_proyecto: '',
    Nombre_proyecto: '',
    País: '',
    Banco: '',
    Tipo_cuenta: '',
    Número_cuenta: '',
    Código: '',
    Nombre: '',
    Nit_identificaión: '',
    País2: '',
    Banco2: '',
    Tipo_cuenta2: '',
    Número_cuenta2: '',
    País3: '',
    Fecha_desembolso_esperada: '',
    Observaciones: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const GatosGenerar = ({ title, language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Código_orden, Fecha, Estado, Forma_de_pago, Tipo_de_pago, Código_proyecto, Nombre_proyecto, País, Banco, Tipo_cuenta, Número_cuenta, Código, Nombre, Nit_identificaión, País2, Banco2, Tipo_cuenta2, Número_cuenta2, País3, Fecha_desembolso_esperada, Observaciones} = state;
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
                <form className='information genrarGatos' action="" method='POST' onSubmit={handleSubmit}>
                    <ul>
                        <Input label={`Código orden`} type={`text`} name={`Código_orden`} value={Código_orden} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Fecha`} type={`text`} name={`Fecha`} value={Fecha} placeholder={`Enter`} onChange={onChange} />
                        <SelectVal label={`Estado`} name={`Estado`} value={Estado} placeholder={`Enter`} onChange={onChange} value1={`Estado-1`} value2={`Estado-2`} value3={`Estado-3`} hideValue4={`dn`} hideValue5={`dn`} />
                    </ul>
                    <ul>
                        <SelectVal label={`Forma de pago`} name={`Forma_de_pago`} value={Forma_de_pago} placeholder={`Enter`} onChange={onChange} value1={`Forma_de_pago-1`} value2={`Forma_de_pago-2`} value3={`Forma_de_pago-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <SelectVal label={`Tipo de pago`} name={`Tipo_de_pago`} value={Tipo_de_pago} placeholder={`Enter`} onChange={onChange} value1={`Tipo_de_pago-1`} value2={`Tipo_de_pago-2`} value3={`Tipo_de_pago-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Código proyecto`} type={`text`} name={`Código_proyecto`} value={Código_proyecto} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Nombre proyecto`} type={`text`} name={`Nombre_proyecto`} value={Nombre_proyecto} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <span className="dueno">
                        <Button text={`Información factura`} background={`var(--tartiary-color)`} types={`button`} />
                    </span>
                    <h2>{`Dueño(s) del proyecto`}</h2>
                    <ul className="duenoPro">
                        <li>Nombres</li>
                        <li>Luisa Fernanda Diaz Ayala</li>
                        <li>Brayan Steven Molano</li>
                    </ul>
                    <ul>
                        <SelectVal label={`País`} name={`País`} value={País} placeholder={`Enter`} onChange={onChange} value1={`País-1`} value2={`País-2`} value3={`País-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Banco`} type={`text`} name={`Banco`} value={Banco} placeholder={`Enter`} onChange={onChange} />
                        <SelectVal label={`Tipo cuenta`} name={`Tipo_cuenta`} value={Tipo_cuenta} placeholder={`Enter`} onChange={onChange} value1={`Tipo_cuenta-1`} value2={`Tipo_cuenta2`} value3={`Tipo_cuenta-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Número cuenta`} type={`text`} name={`Número_cuenta`} value={Número_cuenta} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <h3>Beneficiarios</h3>
                    <ul>
                        <Input label={`Código`} type={`text`} name={`Código`} value={Código} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Nombre`} type={`text`} name={`Nombre`} value={Nombre} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Nit/identificaión`} type={`text`} name={`Nit_identificaión`} value={Nit_identificaión} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <h3>Información de banco</h3>
                    <ul>
                        <SelectVal label={`País`} name={`País2`} value={País2} placeholder={`Enter`} onChange={onChange} value1={`País-1`} value2={`País-2`} value3={`País-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Banco`} type={`text`} name={`Banco2`} value={Banco2} placeholder={`Enter`} onChange={onChange} />
                        <SelectVal label={`Tipo cuenta`} name={`Tipo_cuenta2`} value={Tipo_cuenta2} placeholder={`Enter`} onChange={onChange} value1={`Tipo_cuenta-1`} value2={`Tipo_cuenta2`} value3={`Tipo_cuenta-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Número cuenta`} type={`text`} name={`Número_cuenta2`} value={Número_cuenta2} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <h3>Información desembolso</h3>
                    <ul>
                        <SelectVal label={`País`} name={`País3`} value={País3} placeholder={`Enter`} onChange={onChange} value1={`País-1`} value2={`País-2`} value3={`País-3`} hideValue4={`dn`} hideValue5={`dn`} />
                        <Input label={`Fecha desembolso esperada`} type={`text`} name={`Fecha_desembolso_esperada`} value={Fecha_desembolso_esperada} placeholder={`Enter`} onChange={onChange} />
                        <Textarea label={`Observaciones`} name={`Observaciones`} value={Observaciones} placeholder={`Enter`} onChange={onChange} cols={5} rows={2} />
                    </ul>
                    <div className="submit-button">
                        <Button text={`Generar orden de pago`} background={`var(--primary-color)`} types={`submit`}/>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default GatosGenerar;