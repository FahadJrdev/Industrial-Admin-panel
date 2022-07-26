import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { Input, Select} from '../Leasing-section/Leasing-Component';
import './Pm.css';
const initialState = {
    Code: '',
    Identification: '',
    Nombre: '',
    Tipo_de_contrato: '',
    Línea: '',
    Número_de_producto: '',
    Tipo_de_pago: '',
    Referencia_1: '',
    Valor_a_pagar: '',
    Referencia_2: '',
    Fecha_de_corte: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const PagoManual = ({ title ,language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const { Code, Identification, Nombre, Tipo_de_contrato, Línea, Número_de_producto, Tipo_de_pago, Referencia_1, Valor_a_pagar, Referencia_2, Fecha_de_corte } = state;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor PagoManual">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='PagoManualForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="PagoManual-body">
                        <ul>
                            <Input label={ language.revenues.paymancode } type={`text`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanidentifi } type={`text`} name={`Identification`} value={Identification} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanname } type={`text`} name={`Nombre`} value={Nombre} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Select label={ language.revenues.paymantypeproduc } name={`Tipo_de_contrato`} value={Tipo_de_contrato} placeholder={`select`} value1={`Tipo_de_contrato-1`} value2={`Tipo_de_contrato-2`} value3={`Tipo_de_contrato-3`} value4={`Tipo_de_contrato-4`} hideValue5={`dn`} onChange={onChange} />
                            <Input label={ language.revenues.paymanlin } type={`text`} name={`Línea`} value={Línea} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Input label={ language.revenues.paymannumbprod } type={`text`} name={`Número_de_producto`} value={Número_de_producto} placeholder={`Enter`} onChange={onChange} />
                            <Select label={ language.revenues.paymantypepay } name={`Tipo_de_pago`} value={Tipo_de_pago} placeholder={`select`} value1={`Tipo_de_pago-1`} value2={`Tipo_de_pago-2`} value3={`Tipo_de_pago-3`} value4={`Tipo_de_pago-4`} hideValue5={`dn`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Input label={ language.revenues.paymanrefer1 } type={`text`} name={`Referencia_1`} value={Referencia_1} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanrevalpay } type={`text`} name={`Valor_a_pagar`} value={Valor_a_pagar} placeholder={`Enter`} onChange={onChange} />
                            <p className="pago-text">{ language.revenues.paymanrecuo }  2022/01/30:00.00.00.000000</p>
                        </ul>
                        <ul>
                            <Input label={ language.revenues.paymanrefer12 }  type={`text`} name={`Referencia_2`} value={Referencia_2} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanredatefin }  type={`text`} name={`Fecha_de_corte`} value={Fecha_de_corte} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                    </div>
                    <p className="pago-text">TOTAL: $60000</p>
                    <div className="Esheet-submit">
                        <Button text={`Pagar`} background={`var(--primary-color)`} types={`submit`} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default PagoManual