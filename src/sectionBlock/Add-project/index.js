import React, {useReducer,useState,useEffect} from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './project.css';
import { VscChevronDown } from "react-icons/vsc";
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
const initialState = {
    Code: '',
    Project_name: '',
    Contract_type:'',
    Investment_objective:'',
    Capital_commitments:'',
    USD_Invested:'',
    Country:'',
    City:'',
    Address:'',
    Date_investment:'',
    Approved_investment_amount:'',
    Responsible:'',
    Projected_departure_date:'',
    Description:''
  }
  
  function reducer(state, {field,value}) {
    return {
      ...state,
      [field]: value
    }
  }
  
const AddProjects = ({title,language}) => {
  
  const navigates = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ciudad,setCiudad] = useState([]);
  
  const [una] = useState('');
  const [countrys,CountrySet] = useState([]);
  const onChange =(e)=>{
    dispatch({field: e.target.name, value: e.target.value})
  }
  const {Code,Project_name,Contract_type,Investment_objective,Investment_period,Capital_commitments,USD_Invested,Country,City,Address,Date_investment,Approved_investment_amount,Responsible,Projected_departure_date,Description} =state;
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const callApiGetCountry = ()=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    axios.get("/countries", {},bearerToken)
        .then((response) => {
          
          CountrySet( [])
          if(response.status===200){
            if(response.data){
            CountrySet( response.data)
            }
          }
        }).catch((err)=>{
          CountrySet( [])
        })
      }

      const callApiGetCitys = (id,funcon)=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
        axios.get("/citys/"+id, {},bearerToken)
            .then((response) => {
              
              funcon( [])
              if(response.status===200){
                if(response.data){
                  funcon( response.data)
                }
              }
            }).catch((err)=>{
              funcon( [])
            })
          }
          useEffect(()=>{
            callApiGetCountry()
          },[una])
          useEffect(()=>{
            callApiGetCitys(Country,setCiudad)
          },[Country])
  const callApiRegisterProject = ()=>{
    let valor= {
                  C_NOMBRE_PROYECTO : Project_name,
                  C_DESCRIPCION : Description,
                  I_TIPO_CONTRATO: Contract_type,
                  I_OBJETIVO_INVERSION : Investment_objective,
                  I_CAPITAL_COMPROMISOS_LP : Capital_commitments,
                  D_USD_INVERTIDOS : USD_Invested,
                  F_PERIODO_INVERSIONISTA :Investment_period,
                  C_ESTADO_PROYECTO : 'start',
                  I_PAIS : Country,
                  I_CIUDAD : City,
                  C_DIRECCION : Address,
                  FECHA_INVERSION : Date_investment,
                  C_MONTO_INV_APRO : Approved_investment_amount,
                  C_RESPONSABLE : Responsible,
                  F_FECHA_PROYECTADA_SALIDA :Projected_departure_date,
                  FONDO_I_CODIGO : 0,
                  TIPO_I_CODIGO : 0
      }
  let bearerToken={
    headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
  }

      axios.post("/project/0/0", valor,bearerToken)
      .then((response) => {
        if(response.status===200){
          if(response.data){
              const backButton = document.querySelector('.adding-investor .header-add button');
              backButton.click()
              window.location.reload()
          }
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

  return (
    <>
    <div className="adding-investor-overlay"></div>
    <div className="adding-investor">
        <div className="investor-add aproject">
            <div className="header-add">
                <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} />
                <h1>{title}</h1>
            </div>
            <form action="/Projects" method='POST' className='add-project information' onSubmit={handleSubmit}>
                <ul>
                    <li><label htmlFor="Code">{language.projects.code}</label><input type="text" name='Code' value={Code} onChange={onChange} /></li>
                    <li><label htmlFor="Project_name">{language.projects.Project_Name}</label><input type="text" name='Project_name' value={Project_name} placeholder='Project name' onChange={onChange} /></li>
                    <li><label htmlFor="Contact_type">{language.projects.Contract_type}</label><input type="number" name='Contract_type' value={Contract_type} placeholder='$' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li><label htmlFor="Investment_objective">{language.projects.Investment_objective}</label><input type="number" name='Investment_objective' value={Investment_objective} placeholder='Enter' onChange={onChange}/></li>
                    <li><label htmlFor="Capital_commitments">{language.projects.Capital_commitments}</label><input type="number" name='Capital_commitments' value={Capital_commitments} placeholder='$' onChange={onChange} /></li>
                    <li><label htmlFor="USD_Invested">{language.projects.USD_Invested}</label><input type="number" name='USD_Invested' value={USD_Invested} placeholder='$' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li>
                        <label htmlFor="Country">{language.projects.Country}</label>
                        <select className="input_201px" name='Country' value={countrys.length>0?Country:"Espere"} onChange={onChange} placeholder='Select'>
                        { countrys.map((info,i)=>{                              
                                  return(
                                      <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                    )
                               })
                        }
                        </select> 
                        <VscChevronDown />
                    </li>
                    <li>
                        <label htmlFor="City">{language.projects.City}</label>
                        <select className="input_201px" name='City' value={ciudad.length>0?City:"Espere"} onChange={onChange} placeholder='Select'>
                        { ciudad.map((info,i)=>{                              
                                    return( 
                                     <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                           )
                               })
                        }
                        </select> 
                        <VscChevronDown />
                    </li>
                    <li><label htmlFor="Address">{language.projects.Address}</label><input type="text" name='Address' value={Address} placeholder='Enter' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li><label htmlFor="Date_investment">{language.projects.Date_investment}</label><input type="date" name='Date_investment' value={Date_investment} placeholder='MM/DD/YYYY' onChange={onChange} /></li>
                    <li><label htmlFor="Approved_investment_amount">{language.projects.Approved_investment_amount}</label><input type="number" name='Approved_investment_amount' value={Approved_investment_amount} placeholder='$' onChange={onChange} /></li>
                    <li><label htmlFor="Responsible">{language.projects.Responsible}</label><input type="text" name='Responsible' value={Responsible} placeholder='Enter' onChange={onChange} /></li>
                </ul>
                <ul>
                <li><label htmlFor="Investment_period">{language.projects.Investment_period}</label><input type="date" name='Investment_period' value={Investment_period} placeholder='MM/DD/YYYY' onChange={onChange} /></li>
                    <li><label htmlFor="Projected_departure_date">{language.projects.Projected_departure_date}</label><input type="date" name='Projected_departure_date' value={Projected_departure_date} placeholder='MM/DD/YYYY' onChange={onChange} /></li>
                    <li><label htmlFor="Description">{language.projects.Description}</label><textarea type="text" name='Description' value={Description} placeholder='Fund Description' onChange={onChange} rows={10} column={30}></textarea></li>
                </ul>
                <Button text={language.global.add} background={`var(--primary-color)`} types={`button`}  click={callApiRegisterProject}/>
            </form>
        </div>
    </div>
    </>
  )
}

export default AddProjects;