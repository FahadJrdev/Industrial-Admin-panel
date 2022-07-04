import React, {useState, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import {Button} from '../buttons';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate} from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';

export const InvestorDatosItem = ({info}) => {
    return(
        <Link  to={{ pathname: '/InvestorsDetail?'+info.INVERSIONISTA['id'], state:info.INVERSIONISTA['id'] }}>
            <ul key={info.INVERSIONISTA['id']} className="listBody">
                <li className='listItem'>{JSON.parse(info.DATOS[0].INFORMACION_COORPORATIVA).COMPANY_NAME}</li>
                <li className='listItem'>{JSON.parse(info.DATOS[0].INFORMACION_COORPORATIVA).CITY_CONSTITUTION}</li>
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
    if(info.C_ESTADO_PROYECTO=='start'){
        colors='green'
        valor='Start'
    }else if(info.C_ESTADO_PROYECTO=='implement'){
        colors='yellow'
        valor='Implementing'
    }else if(info.C_ESTADO_PROYECTO=='monitorin'){
        colors='blue'
        valor='Monitoring'
    }else if(info.C_ESTADO_PROYECTO=='disinvestmt'){
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
    const initialState = {
        Data: '',
        Description:''
    }

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
      <Link to="/DetalleFacturasFondo">
          <ul className="listBody">
              <li className='listItem'>{info.Nombre}</li>
              <li className='listItem'>{info.facturas}</li>
              <li className='listItem'>{info.totalFocturas}</li>
              <li className='listItem'>{info.Actions}</li>
          </ul>
      </Link>
  )
}
export const BillingDetailItem = ({info}) => {
  return(
      <Link to="#">
          <ul className="listBody">
              <li className='listItem'>{info.Invoicing_date}</li>
              <li className='listItem'>{info.Ndeg}</li>
              <li className='listItem'>{info.Amount}</li>
              <li className='listItem'>{info.Actions}</li>
          </ul>
      </Link>
  )
}
export const BankConfigItem = ({info}) => {
  return(
      <Link to="/AccountDetail">
          <ul className="listBody">
              <li className='listItem'>{info.Code}</li>
              <li className='listItem'>{info.Country}</li>
              <li className='listItem'>{info.Names}</li>
              <li className='listItem'>{info.Identity}</li>
              <li className='listItem'>{info.Actions}</li>
          </ul>
      </Link>
  )
}
export const ContractManagementItem = ({info, link}) => {
  return(
      <Link to={link}>
          <ul className="listBody">
              <li className='listItem'>{info.item1}</li>
              <li className='listItem'>{info.item2}</li>
              <li className='listItem'>{info.item3}</li>
              <li className='listItem' style={{color: `${info.color}`, fontWeight: 700}}>{info.item4}</li>
              <li className='listItem'>{info.item5}</li>
          </ul>
      </Link>
  )
}