import React, { useReducer,useState } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate} from 'react-router-dom';
import { Input, SelectVal} from '../Leasing-section/Leasing-Component';
import './Pm.css';
import { ResponsiveContainer } from 'recharts';
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
    
    const [tipodepago]=useState([{name:'Tipo 1',value:1},{name:'Tipo 2',value:2},{name:'Tipo 3',value:3},{name:'Tipo 4',value:4}])
  const [contrato]=useState([{name:'Contrato deuda Leasing',value:1}])
    const navigates = useNavigate();

    const PaidManual=()=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
        let valor={
            CODIGO_INVOICE_PAGO:Code,
            IDENTITY_INVOICE_PAGO:Identification,
            NOMBRE_INVOICE_PAGO:Nombre,
            LINEA_INVOICE_PAGO:Línea,
            N_PRODUCT_INVOICE_PAGO:Número_de_producto,
            TIPO_PAGO_INVOICE_PAGO:Tipo_de_pago,
            REF_UNO_INVOICE_PAGO:Referencia_1,
            REF_DOS_INVOICE_PAGO:Referencia_2,
            MONTO_INVOICE_PAGO:Valor_a_pagar,
            FECHA_INVOICE_PAGO:Fecha_de_corte
        }
            axios.post("/revenuemanagementInvoicePago/"+Tipo_de_contrato,valor,bearerToken)
            .then((response) => {
                toast(response.data.message)
                navigates(-1)
            }).catch((err)=>{
                console.log(err)
              if(err.response){
                if(err.response.data){
                  if(err.response.status===401){
                    navigates('/')
                  }else{
                    if(err.response.data.message){
                      toast(err.response.data.message)
                    }else{
                      let message="";
                      let valorKeys=Object.keys(err.response.data.error)
                      valorKeys.forEach(element => {
                        err.response.data.error[element].forEach((mensaje)=>{
                          message+=mensaje+" ,"
                        })
                      });
                      
                      toast(message);
                    }
                  }
                  
                }
              }
            })
    
      }
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const { Code, Identification, Nombre, Tipo_de_contrato, Línea, Número_de_producto, Tipo_de_pago, Referencia_1, Valor_a_pagar, Referencia_2, Fecha_de_corte } = state;
    
    const handleSubmit = (event) => {
        event.preventDefault();
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
                            <Input label={ language.revenues.paymancode } type={`number`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanidentifi } type={`text`} name={`Identification`} value={Identification} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanname } type={`text`} name={`Nombre`} value={Nombre} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                             <SelectVal  label={ language.revenues.paymantypeproduc } name={`Tipo_de_contrato`} value={Tipo_de_contrato} placeholder={`Select`} onChange={onChange} array={contrato}/>
                                
                               <Input label={ language.revenues.paymanlin } type={`text`} name={`Línea`} value={Línea} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                        <ul>
                            <Input label={ language.revenues.paymannumbprod } type={`text`} name={`Número_de_producto`} value={Número_de_producto} placeholder={`Enter`} onChange={onChange} />
                           
                            <SelectVal label={ language.revenues.paymantypepay } name={`Tipo_de_pago`} value={Tipo_de_pago} placeholder={`Select`} onChange={onChange} array={tipodepago}/>
                        </ul>
                        <ul>
                            <Input label={ language.revenues.paymanrefer1 } type={`text`} name={`Referencia_1`} value={Referencia_1} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanrevalpay } type={`number`} name={`Valor_a_pagar`} value={Valor_a_pagar} placeholder={`Enter`} onChange={onChange} />
                            <p className="pago-text">{ language.revenues.paymanrecuo }  </p>
                        </ul>
                        <ul>
                            <Input label={ language.revenues.paymanrefer12 }  type={`text`} name={`Referencia_2`} value={Referencia_2} placeholder={`Enter`} onChange={onChange} />
                            <Input label={ language.revenues.paymanredatefin }  type={`date`} name={`Fecha_de_corte`} value={Fecha_de_corte} placeholder={`Enter`} onChange={onChange} />
                        </ul>
                    </div>
                    <p className="pago-text"></p>
                    <div className="Esheet-submit">
                        <Button text={language.revenues.paymanrepadi} background={`var(--primary-color)`} types={`button`} click={PaidManual} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default PagoManual