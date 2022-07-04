import React, {useState, useEffect} from 'react';
import './PI.css';
import { AiFillEdit } from "react-icons/ai";
import { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { VscChevronDown } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

import axios from "../../api/axios.js";
import {toast} from "react-toastify";
const initialState = {
  Code: '',
  Project_name:'',
  Description:'',
  Contract_type:'',
  Investment_objective:'',
  Capital_commitments: '',
  USD_Invested:'',
  Investment_period:'',
  Project_status: '',
  Country: '',
  City: '',
  Address: '',
  Date_investment: '',
  Approved_investment_amount: '',
  Responsible: '',
  Projected_departure_date: ''
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const ProjectInfo = ({title,language,datInicial,id}) => {
  const navigates=useNavigate()
  const [isEditing, setEditing] = useState('no');
  useEffect(()=>{
    const editElement = document.querySelector('.ProjectInfo ul li svg');
    if(editElement){
      editElement.addEventListener('click',()=>{
        setEditing('yes');
      })
    }
    const submitButton = document.querySelector('.ProjectInfo ul li button');
    if(submitButton){
        submitButton.addEventListener('click',()=>{
            setEditing('no');
        })
    }
  },[])
  
  const [state, dispatch] = useReducer(reducer,datInicial?datInicial:initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const [ciudad,setCiudad] = useState([]);
  
  const [una,setOne] = useState('');
  const [countrys,CountrySet] = useState([]);
  const {Code, Project_name, Description, Contract_type, Investment_objective, Capital_commitments, USD_Invested, Investment_period, Project_status, Country, City, Address, Date_investment, Approved_investment_amount, Responsible, Projected_departure_date} = state;
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
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const callApiUpdateProject = ()=>{
    let valor= {
                  C_NOMBRE_PROYECTO : Project_name,
                  C_DESCRIPCION : Description,
                  I_TIPO_CONTRATO: Contract_type,
                  I_OBJETIVO_INVERSION : Investment_objective,
                  I_CAPITAL_COMPROMISOS_LP : Capital_commitments,
                  D_USD_INVERTIDOS : USD_Invested,
                  F_PERIODO_INVERSIONISTA : Investment_period,
                  C_ESTADO_PROYECTO : Project_status,
                  I_PAIS : Country,
                  I_CIUDAD : City,
                  C_DIRECCION : Address,
                  FECHA_INVERSION : Date_investment,
                  C_MONTO_INV_APRO : Approved_investment_amount,
                  C_RESPONSABLE : Responsible,
                  F_FECHA_PROYECTADA_SALIDA :Projected_departure_date
      }
  let bearerToken={
    headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
  }
      axios.put("/project/"+id, valor,bearerToken)
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
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor PI">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back}background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form action="" method='POST' className='ProjectInfo information'  onSubmit={handleSubmit}>
                    <ul>
                    <li style={{order: 2}}>
                        <label htmlFor="Code">{language.projects.code}</label>
                        {
                        isEditing==='no'
                        ?<p>{Code}</p>
                        :<input type="text" name='Code'  value={Code} disabled placeholder='Code' onChange={onChange} />
                        }
                    </li>
                    <li style={{order: 3}}>
                        <label htmlFor="Project_name">{language.projects.Project_Name}</label>
                        {
                        isEditing ==='no'
                        ?<p>{Project_name}</p>
                        :<input type="text" name='Project_name' value={Project_name} placeholder='Project name' onChange={onChange} />
                        }
                    </li>
                    <li  style={{order: 4}}>
                        <label htmlFor="Description">{language.projects.Description}</label>
                        {
                        isEditing ==='no'
                        ?<p>{Description}  </p>
                        :<textarea type="text" name='Description' value={Description} onChange={onChange} placeholder='Description' row='8' column='25'></textarea>
                        }
                    </li>
                    <li  style={{order: 5}}>
                        <AiFillEdit />
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Contract_type">{language.projects.Contract_type}</label>
                        {
                        isEditing==='no'
                        ?<p>{Contract_type}</p>
                        :<>
                        <select className="input_201px" name='Contract_type' value={Contract_type} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="1">Type 1</option>
                            <option value="2">Type 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Contract_type' placeholder='Select' value={Contract_type} onChange={onChange} /> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    <li>
                        <label htmlFor="Investment_objective">{language.projects.Investment_objective}</label>
                        {
                        isEditing === 'no'
                        ?<p>{Investment_objective}</p>
                        :<input type="number" name='Investment_objective' value={Investment_objective} placeholder='Enter' onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Capital_commitments">{language.projects.Capital_commitments}</label>
                        {
                        isEditing==='no'
                        ?<p>{Capital_commitments}</p>
                        :<input type="number" name='Capital_commitments'  value={Capital_commitments} placeholder="$" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="USD_Invested">{language.projects.USD_Invested}</label>
                        {
                        isEditing==='no'
                        ?<p>{USD_Invested}</p>
                        :<input type="number" name='USD_Invested' disabled value={USD_Invested} placeholder="$" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Investment_period">{language.projects.period_invesrt}</label>
                        {
                        isEditing==='no'
                        ?<p>{Investment_period}</p>
                        :<input type="date" name='Investment_period'  value={Investment_period} placeholder="Enter" onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Project_status">{language.projects.project_status}</label>
                        {
                        isEditing==='no'
                        ?<p>{Project_status}</p>
                        :<>
                        <select className="input_201px" name='Project_status' value={Project_status} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="start">Start</option>
                            <option value="implement">Implementation</option>
                            <option value="monitorin">Monitoring</option>
                            <option value="disinvestmt">Disinvestment</option>
                        </select> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    <li>
                        <label htmlFor="Country">{language.projects.Country}</label>
                        {
                        isEditing==='no'
                        ?<p>{Country}</p>
                        :<>
                        <select className="input_201px" name='Country' value={countrys.length>0?Country:"Espere"} onChange={onChange} placeholder='Select'>
                        { countrys.map((info,i)=>{                              return(
                                     
                                     <option value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                           )
                               })
                        }
                        </select> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    <li>
                        <label htmlFor="City">{language.projects.City}</label>
                        {
                        isEditing==='no'
                        ?<p>{City}</p>
                        :<>
                        <select className="input_201px" name='City' value={ciudad.length>0?City:"Espere"}onChange={onChange} placeholder='Select'>
                        { ciudad.map((info,i)=>{                              return(
                                     
                                     <option value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                           )
                               })
                        }
                        </select>  
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Address">{language.projects.Address}</label>
                        {
                        isEditing==='no'
                        ?<p>{Address}</p>
                        :<input type="text" name='Address'  value={Address} placeholder="Enter" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Date_investment">{language.projects.Date_investment}</label>
                        {
                        isEditing==='no'
                        ?<p>{Date_investment}</p>
                        :<input type="date" name='Date_investment' value={Date_investment} placeholder="MM/DD/YYYY" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Approved_investment_amount">{language.projects.Approved_investment_amount}</label>
                        {
                        isEditing==='no'
                        ?<p>{Approved_investment_amount}</p>
                        :<input type="number" name='Approved_investment_amount'  value={Approved_investment_amount} placeholder="$" onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Responsible">{language.projects.Responsible}</label>
                        {
                        isEditing==='no'
                        ?<p>{Responsible}</p>
                        :<input type="text" name='Responsible'  value={Responsible} placeholder="Enter" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Projected_departure_date">{language.projects.Projected_departure_date}</label>
                        {
                        isEditing==='no'
                        ?<p>{Projected_departure_date}</p>
                        :<input type="date" name='Projected_departure_date' value={Projected_departure_date} placeholder="MM/DD/YYYY" onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <div className="submit-button">
                    {
                        isEditing==='no'
                        ?<></>
                        :<Button text={language.global.save} background={`var(--primary-color)`} types={`button`} click={callApiUpdateProject} />
                    }
                    </div>
                    <div className='register'><Button text={language.projects.registerproject_owner} background={`var(--primary-color)`} types={`button`} /></div>
                </form>
            </div>
        </div>
    </>
  )
}

export default ProjectInfo;