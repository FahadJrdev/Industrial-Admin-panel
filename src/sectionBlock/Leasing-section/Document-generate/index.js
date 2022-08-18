import React, { useState, useReducer }  from 'react';
import './dg.css';
import { FinancialHead } from '../Leasing-Component';
import {Button} from '../../../component/buttons';
import {Input} from '../../../component/input';
import { AiFillEdit } from "react-icons/ai";

const initialState = {
    Tipo_de_documento1: 'Letter of instruction ',
    Número_consecutivo1: '12',
    Observaciones1: '-',
    Tipo_de_documento2: 'Promissory note',
    Número_consecutivo2: '13',
    Observaciones2: '-',
    Tipo_de_documento3: 'Other',
    Número_consecutivo3: '14',
    Observaciones3: '-',
    Tipo_de_documento4: 'Other',
    Número_consecutivo4: '35',
    Observaciones4: '-',
    Número_de_comprobante: '1234',
    Tipo_de_comprobante: 'tipo de comprobante '
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}

const DocumentGenerate = ({language}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Tipo_de_documento1, Número_consecutivo1, Observaciones1, Tipo_de_documento2, Número_consecutivo2, Observaciones2, Tipo_de_documento3, Número_consecutivo3, Observaciones3, Tipo_de_documento4, Número_consecutivo4, Observaciones4, Número_de_comprobante, Tipo_de_comprobante } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    const [editing, isEditing] = useState(false);
  return (
    <>
      <div className="Contract-formalization">
        <FinancialHead text={`Documents supporting the operation`} hideBtn={`dn`} />
        <div className="Esheet-submit">
            <Button text={`Generar documentos`} background={`var(--primary-color)`} types={`submit`} />
        </div>
        <form className='generate-contract information' action="" method='POST' onSubmit={handleSubmit}>
            <div className="empresa">
                <div onClick={()=>{isEditing(!editing)}} className="editing"><AiFillEdit /></div>
                <div className="empresaTable">
                    <div className="responsiveFix">
                        <div className="responsiveAuto">
                            <ul>
                                <li>Tipo de documento</li>
                                <li>Número consecutivo</li>
                                <li>Observaciones</li>
                            </ul>
                            <ul>
                                <li><input type="text" name="Tipo_de_documento1" value={Tipo_de_documento1} onChange={onChange} /></li>
                                <li><input type="text" name="Número_consecutivo1" value={Número_consecutivo1} onChange={onChange} /></li>
                                <li><input type="text" name="Observaciones1" value={Observaciones1} onChange={onChange} /></li>
                            </ul>
                            <ul>
                                <li><input type="text" name="Tipo_de_documento2" value={Tipo_de_documento2} onChange={onChange} /></li>
                                <li><input type="text" name="Número_consecutivo2" value={Número_consecutivo2} onChange={onChange} /></li>
                                <li><input type="text" name="Observaciones2" value={Observaciones2} onChange={onChange} /></li>
                            </ul>
                            <ul>
                                <li><input type="text" name="Tipo_de_documento3" value={Tipo_de_documento3} onChange={onChange} /></li>
                                <li><input type="text" name="Número_consecutivo3" value={Número_consecutivo3} onChange={onChange} /></li>
                                <li><input type="text" name="Observaciones3" value={Observaciones3} onChange={onChange} /></li>
                            </ul>
                            <ul>
                                <li><input type="text" name="Tipo_de_documento4" value={Tipo_de_documento4} onChange={onChange} /></li>
                                <li><input type="text" name="Número_consecutivo4" value={Número_consecutivo4} onChange={onChange} /></li>
                                <li><input type="text" name="Observaciones4" value={Observaciones4} onChange={onChange} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>  
            <h4>Formalización  del contrato</h4>
            <ul className="contrato">
                <Input label={`Número de comprobante`} type={`text`} name={`Número_de_comprobante`} value={Número_de_comprobante} placeholder={`Enter`} onChange={onChange}/>
                <Input label={`Tipo de comprobante`} type={`text`} name={`Tipo_de_comprobante`} value={Tipo_de_comprobante} placeholder={`Enter`} onChange={onChange}/>
            </ul>
            <div className="submit-button">
                <Button text={`send`} background={`var(--primary-color)`} types={`submit`} />
            </div>
        </form>      
      </div>
    </>
  )
}

export default DocumentGenerate;