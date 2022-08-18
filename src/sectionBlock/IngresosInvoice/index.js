import React, {useState,useEffect} from 'react';
import {Button, ButtonWithArrow } from '../../component/buttons';
import './II.css';
import axios from "../../api/axios.js";
const Invoice = ({ title ,language, idinvoce, color, state,close}) => {
    const [status, setStatus] = useState("start");
    const [idStar,setid] = useState("");
    const [Star] = useState("");
    const [NumberFactura, setNumberFact] = useState("");
    const [Deudor, setNAmeDeudo] = useState("");
    const [Fecha, setFechaFact] = useState("");
    const [tipo, setContrato] = useState("");
    const [statuss, setStatuss] = useState(false);
    const [Anulado, setAnulado] = useState(false);
    const [MontoFact, setMontoFact] = useState(0);
    const LoadData =()=>{
        let bearerToken={
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
          }
              axios.get("/revenuemanagementInvoiceDetail/"+idStar, {},bearerToken)
              .then((response) => {
                if(response.status===200){
                    setAnulado(response.data.ANULADO)
                    setNumberFact(response.data.FACTURA)
                    setNAmeDeudo(response.data.DEUDOR)
                    setMontoFact(response.data['TOTAL A PAGAR'])
                    setFechaFact(response.data['FECHA'])
                    setContrato(response.data['TIPO DE CONTRATO'])
                    setStatuss(response.data.status)
                    if(!response.data.status){
                        setStatus("start")

                    }else{
                        setStatus("paid")
                    }
                }else{
                }
              }).catch((err)=>{
              })
    }
    useEffect(()=>{
        setid(idinvoce)
      },[Star]);

      useEffect(()=>{
        LoadData()
      },[idStar,setid]);
      const cerrar=()=>{
        close('close')
      }
   return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor invoice">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} types={`button`}/> 
                    <h1>{title}</h1>  
               </div> 
                <div className="invoice-desc">
                    <h2 className="N">{language.billing_detail.invoice_detinvonum} {NumberFactura}</h2>
                    {Anulado?<> <p className="state" style={{color: "red"}}>Anulado</p></>:<> <p className="state" style={{color: color}}>{state}</p></>}

                    <p className="tipo">{language.billing_detail.invoice_detitypecontr}: {tipo} <br />{language.billing_detail.invoice_detdeud}: {Deudor}</p>
                    <p className="pay">{language.billing_detail.invoice_detpaytotla}</p>
                    <h1 className="dollar">$ {MontoFact}</h1>
                    <div className="date invoiceDate">
                        <h5>{language.billing_detail.invoice_detinvoicedate}</h5>
                        <p>{Fecha}</p>
                    </div>
                    <div className="date expireDate">
                        <h5>{language.billing_detail.invoice_detinvoicedate}</h5>
                        <p>{Fecha}</p>
                    </div>
                </div>
                <div className="invoice-status">
                    <div>
                        <p style={{color: 'var(--primary-color)', fontSize: '16px'}}>{language.billing_detail.invoice_detactivity}</p>
                        <ul className="status">
                            <li >
                                <div onClick={()=>{setStatus("start")}} className={`pin ${status==="start"?"active":""} ${status==="sent"?"active":""} ${status==="see"?"active":""} ${status==="paid"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{language.billing_detail.invoice_detastat1}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                            <li >
                                <div onClick={()=>{setStatus("sent")}} className={`pin ${status==="sent"?"active":""} ${status==="see"?"active":""} ${status==="paid"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{language.billing_detail.invoice_detastat2}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                            <li >
                                <div onClick={()=>{setStatus("see")}} className={`pin ${status==="see"?"active":""} ${status==="paid"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{language.billing_detail.invoice_detastat3}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                            <li >
                                <div onClick={()=>{setStatus("paid")}} className={`pin ${status==="paid"?"active":""}`}></div>
                                <div className="stat">
                                    <p>{language.billing_detail.invoice_detastat4}</p>
                                    <p>12/04/2022</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="submit">
                        <Button text={language.global.accept} background={`var(--primary-color)`} types={`button`}  click={cerrar}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Invoice;