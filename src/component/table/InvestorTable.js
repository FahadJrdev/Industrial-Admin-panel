import React, {useState, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import {Button} from '../buttons';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate} from 'react-router-dom';

export const InvestorDatosItem = ({info}) => {
    return(
        <Link  to={{ pathname: '/InvestorsDetail?'+info.INVERSIONISTA['id'], state:info.INVERSIONISTA['id'] }}>
            <ul key={info.INVERSIONISTA['id']} className="listBody">
                <li className='listItem'>{JSON.parse(info.INFORMACION_COORPORATIVA).COMPANY_NAME}</li>
                <li className='listItem'>{JSON.parse(info.INFORMACION_COORPORATIVA).CITY_CONSTITUTION}</li>
                <li className='listItem'>{info.INVERSION.length}</li>
                <li className='listItem'>{info['TOTAL DE FONDOS ASIGNADOS']}</li>
                <li className='listItem'>See more</li>
            </ul>
        </Link>
    )
}

export const InvestorItem = ({info}) => {
    return(
        <Link to={{ pathname: '/InvestorsDetail?'+info.INVERSIONISTA['id'], state: info.INVERSIONISTA['id']}}>
            <ul key={info.INVERSIONISTA['id']} className="listBody">
           
                <li className='listItem'>NO DATO</li>
                <li className='listItem'>NO DATO</li>
                <li className='listItem'>{info.INVERSION.length}</li>
                <li className='listItem'>{info['TOTAL DE FONDOS ASIGNADOS']}</li>
                <li className='listItem'>See more</li>
            </ul>
        </Link>
    )
}
export const InvestorItemc = ({info}) => {
  return(
      <Link  to={{ pathname: '/InvestorsDetail?'+info.DATOS[0].INVERSIONISTA_I_CODIGO, state:info.DATOS[0].INVERSIONISTA_I_CODIGO }}>
          <ul key={info.DATOS[0].INVERSIONISTA_I_CODIGO} className="listBody">
              <li className='listItem'>{JSON.parse(info.DATOS[0].INFORMACION_COORPORATIVA).COMPANY_NAME}</li>
              <li className='listItem'>{JSON.parse(info.DATOS[0].INFORMACION_COORPORATIVA).CITY_CONSTITUTION}</li>
              <li className='listItem'>{info.INVERSION.length}</li>
              <li className='listItem'>{info['TOTAL DE FONDOS ASIGNADOS']}</li>
              <li className='listItem'>See more</li>
          </ul>
      </Link>
  )
}
export const InvestorItemcs = ({info}) => {
  console.log(info)
  return(
      <Link  to={{ pathname: '/InvestorsDetail?'+info.ID, state:info.ID }}>
          <ul key={info.ID} className="listBody">
              <li className='listItem'>{info.NAME}</li>
              <li className='listItem'>{info.COUNTRY}</li>
              <li className='listItem'>{info.INV_PRO}</li>
              <li className='listItem'>{info.INVERTIDOS}</li>
              <li className='listItem'>See more</li>
          </ul>
      </Link>
  )
}
export const FundItem = ({info}) => {
    return(
        <Link to={{ pathname: '/FundDetails?'+info.I_CODIGO, state: info.I_CODIGO}}>
            <ul key={info.id} className="listBody">
                <li className='listItem'>{info.I_CODIGO}</li>
                <li className='listItem'>{info.C_NOMBRE}</li>
                <li className='listItem'>{info.D_VALOR_FONDO}</li>
                <li className='listItem'>{info.D_VALOR_INVERTIDO}</li>
            </ul>
        </Link>
    )
}

export const ProjectItem =({info, i, setProjectStatus}) => {
    let colors=''
    let valor=''
    if(info.C_ESTADO_PROYECTO==='start'){
        colors='green'
        valor='Start'
    }else if(info.C_ESTADO_PROYECTO==='implement'){
        colors='yellow'
        valor='Implementing'
    }else if(info.C_ESTADO_PROYECTO==='monitorin'){
        colors='blue'
        valor='Monitoring'
    }else if(info.C_ESTADO_PROYECTO==='disinvestmt'){
        colors='black'
        valor='Disinvestement'
    }
    return(
        
            <ul key={i} className='listBody'>
                <li className='listItem'>{info.C_NOMBRE_PROYECTO}</li>
                <li className='listItem'>{info.I_PAIS}</li>
                <li className='listItem'>{info.FECHA_INVERSION}</li>
                <li className='listItem'>{info.C_MONTO_INV_APRO}</li>
                <li onClick={()=>{setProjectStatus({open:'open',valor:info.C_ESTADO_PROYECTO})}} className='listItem' style={{color:colors}}>{valor}</li>
                <Link to={{ pathname: '/ProjectDetails?'+info.I_CODIGO, state: info.I_CODIGO}}><li className='listItem'>See more</li></Link>
            </ul>
        
    )
}

export const RiskItem = ({info,language,refresh}) => {
    const navigates = useNavigate();
    const [isEdit, setEdit] = useState(false);

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        Data: info.C_NOMBRE,
        Description:info.C_CALIFICACION,
        id:info.I_CODIGO
    });
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Data, Description,id} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const callapiRiesgoUpdate = ()=>{
        let valor= {
            C_NOMBRE : Data,
            C_CALIFICACION : Description
          }
      let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
    
          axios.put("/riskproject/"+id, valor,bearerToken)
          .then((response) => {
            if(response.status===200){
                setEdit(!isEdit)
            }
          }).catch((err)=>{
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
        const CallDeleteRiesgo = ()=>{
          let bearerToken={
            headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
          }
        
              axios.delete("/riskproject/"+id,bearerToken)
              .then((response) => {
                if(response.status===200){
                    refresh()
                }
              }).catch((err)=>{
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
    return(
    <ul className="listBody">
            <form action="" method="post" onSubmit={handleSubmit}>
                <li className='listItem'>
                    {
                        isEdit
                        ?<>
                            <textarea name="Data" value={Data} id="" cols="10" rows="4" onChange={onChange} placeholder={`Data`}></textarea>
                        </>
                        :<>{Data}</>
                    }
                </li>
                <li className='listItem'>
                    {
                        isEdit
                        ?<>
                             <textarea name="Description" value={Description} id="" cols="10" rows="4" onChange={onChange} placeholder={`Description`}></textarea>
                        </>
                        :<>{Description}</>
                    }
                </li>
                <li className='listItem'>
                    {
                        isEdit
                        ?<div className="submit-riskEdit">
                            <Button text={language.global.save} background={`var(--primary-color)`} types={`button`} click={callapiRiesgoUpdate} />
                        </div>
                        :<></>
                    }
                </li>
                <li className='listItem'><span onClick={CallDeleteRiesgo}><AiOutlineDelete/></span> <span onClick={()=>{setEdit(!isEdit)}}><AiFillEdit /></span></li>
            </form>
        </ul>
      
        
        
    )
}

export const BillingItem = ({info}) => {
  return(
          <ul className="listBody">
              <li className='listItem'>{info.NOMBRE}</li>
              <li className='listItem'>{info.NUMERO_FACTURAS}</li>
              <li className='listItem'>{info.IMPORTE}</li>
              
      <Link to={{ pathname: '/DetalleFacturasFondo?'+info.ID_FONDO, state: info.ID_FONDO}}>
              <li className='listItem'>see more</li>
              
      </Link>
          </ul>
  )
}
export const BillingDetailItem = ({info}) => {
  let valor={
    id:info.ID,
    state:info.STATUS?"Pagado":"Sin pagar"
  }
  let color=info.STATUS?{color: "#85B900", fontWeight: '600'}:{color: "#DE5753", fontWeight: '600'}
  return(
          <ul className="listBody">
              <li className='listItem'>{info.INVOICE_DATE}</li>
              <li className='listItem'>{info.TIPO_CONTRATO}</li>
              <li className='listItem'>{info.NUMERO_FACTURA}</li>
              <li className='listItem'>{info.AMOUNT}</li>
              <li className='listItem' style={color} >{valor.state}</li>
              <li className='listItem'><span data-state={JSON.stringify(valor)} className="invoiceBtn2"><Button text={`see more`} background={`var(--primary-color)`} types={`button`} /></span> <span data-state={info.state} className="invoiceBtn"><Button text={`Anular`} background={`var(--primary-color)`} types={`button`} /></span></li>
          </ul>
  )
}
export const BankConfigItem = ({info}) => {
  return(
      <Link to={{ pathname: '/BankDetail?'+info.I_CODIGO, state: info.I_CODIGO}}>
          <ul className="listBody">
              <li className='listItem'>{info.CODE_BANK_FILE}</li>
              <li className='listItem'>{info.COUNTRY_BANK_FILE}</li>
              <li className='listItem'>{info.NAME_BANK_FILE}</li>
              <li className='listItem'>{info.I_CODIGO}</li>
              <li className='listItem'>See more</li>
          </ul>
      </Link>
  )
}
export const ContractManagementItem = ({info, link,opcions}) => {
  let color={}
  let texto=""
  let nombre=""
  let fechas=""
  let stado=""
 if(opcions==="1"){
  stado=info.STATUS
 }else if(opcions==="2"){
  stado=info.STATUS

 }else{
  stado=info.STATUS
 }
  if(stado==="aproved"){
    color={
     color:'#a3cb40',
     fontWeight:700
   }
   texto="APROVED"
 }else if (stado==="rejected"){
   color={
     color:'#f1abab',
     fontWeight:700
   }
   texto="REJECTED"
 }else if (stado==="postpone"){
   color={
     color:'#ffd47f',
     fontWeight:700
   }
   texto="POSTPONED"
 }else{
   color={
     color:'black',
     fontWeight:700
   }
   texto="SOLICITED"
 }
 if(opcions==="1"){
  fechas=info.created_at.split("T")[0]
   let jsoncorporativa=info.INFORMACION_COORPORATIVA
  nombre=JSON.parse(jsoncorporativa)['NAMES']+" "+JSON.parse(jsoncorporativa)['SURNAMES']
}else if(opcions==="2"){
   let jsoncorporativa=info.INFORMACION_COORPORATIVA
   nombre=JSON.parse(jsoncorporativa)['NAMES']+" "+JSON.parse(jsoncorporativa)['SURNAMES']
   fechas=info.created_at.split("T")[0]
}else{
  let jsoncorporativa=info.INFORMACION_COORPORATIVA
  if(JSON.parse(jsoncorporativa)){
    nombre=JSON.parse(jsoncorporativa)['COMPANY_NAME']
    fechas=info.created_at.split("T")[0]

  }

}
if(opcions==="1"){
 
  return( <Link to={{ pathname: link+'?'+info.ID_CONTRATO, state: info.I_CODIGO}}>
  <ul className="listBody">
      <li className='listItem'>{info.ID_CONTRATO}</li>
      <li className='listItem'>{fechas}</li>
      <li className='listItem'>{nombre}</li>
      <li className='listItem' style={color}>{texto}</li>
      <li className='listItem'>{"See more"}</li>
  </ul>
</Link>
)
}else{
  return(
    <Link to={{ pathname: link+'?'+info.ID_CONTRATO, state: info.I_CODIGO}}>
        <ul className="listBody">
            <li className='listItem'>{info.ID_CONTRATO}</li>
            <li className='listItem'>{fechas}</li>
            <li className='listItem'>{nombre}</li>
            <li className='listItem' style={color}>{texto}</li>
            <li className='listItem'>{"See more"}</li>
        </ul>
    </Link>
  )
}

 
}
export const InvoiceItem = ({info}) => {
  return(
    <ul className="listBody">
        <li className="listItem">{info.item1}</li>
        <li className="listItem">{info.item2}</li>
        <li className="listItem">{info.item3}</li>
    </ul>
  )
}

export const RevenueItem1 = ({info}) => {
  return(
    <ul className="listBody">
        <div className="listItem">{info.item1}</div>
        <div className="listItem">{info.item2}</div>
        <div className="listItem">{info.item3}</div>
    </ul>
  )
}
export const RevenueItem2 = ({info,setPagoManual}) => {
  const botonclick = (event)=>{
    if(event.target.dataset.state==="NO PAGO"){
      setPagoManual("open")
    }
  }
  return(
    <ul className="listBody">
        <div className="listItem">{info.item1}</div>
        <div className="listItem">{info.item2}</div>
        <div className="listItem">{info.item3}</div>
        <div className="listItem status"  data-state={info.item4} onClick={botonclick} style={{color: info.color, textDecoration: info.decoration}} >{info.item4}</div>
    </ul>
  )
}

export const ItemPermision = ({index,info,setDelete}) => {

  return(
    <ul className="listBody">
        <div className="listItem">{info.name}</div>
        <div className="listItem">{info.id}</div>
        <div className="listItem"  onClick={()=>{
      setDelete({numero:index,id:info.id})
  }}> <span  ><AiOutlineDelete /></span> </div>
    </ul>
  )
}