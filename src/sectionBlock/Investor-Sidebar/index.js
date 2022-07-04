import React, {useReducer, useState,useEffect} from 'react';
import './investorCustomizer.css';
import { Button, ButtonWithArrow, Pill } from '../../component/buttons';
import { VscChevronDown } from "react-icons/vsc";
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
const initialState = {
  Nit: '',
  Company_name: '',
  Date_of_constitution: '',
  City_of_constitution: '',
  Constitution_Department: '',
  Country_of_Constitution: '',
  Economic_activity: '',
  Company_object: '',
  Sociodemographic_Department: '',
  Sociodemographic_Country: '',
  Address_main_office: '',
  Sociodemographic_City: '',
  Telephone: '',
  Email: '',
  Permit_description_1: '',
  Permit_description_2: '',
  Permit_description_3: '',
  add_special_permits: true
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const InvestorCustomizer = ({title,DataInicial,id,language}) => {
  const navigates=useNavigate()
  const [ciudad,setCiudad] = useState([]);
  const [ciudadSocio,setCiudadSocio] = useState([]);
  
  const [una] = useState('');
  const [country,CountrySet] = useState([]);
  const [state, dispatch] = useReducer(reducer,DataInicial?DataInicial:initialState);
  const onChange =(e)=>{
    dispatch({field: e.target.name, value: e.target.value})
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

 
  
const CallRegisterApiInvestor = ()=>{
  let valor={
    NIT:Nit,
    COMPANY_NAME:Company_name,
    DATE_OF_CONSTITUTION:Date_of_constitution,
    CITY_CONSTITUTION:City_of_constitution,
    CONSTITUTION_DEPARTAMENT:Constitution_Department,
    COUNTRY_OF_CONSTITUTION:Country_of_Constitution,
    ECONOMIC_ACTIVITY:Economic_activity,
    COMPANY_OBJECT:Company_object,
    DEPARTAMENT:Sociodemographic_Department,
    COUNTRY:Sociodemographic_Country,
    ADDRESS:Address_main_office,
    CITY:Sociodemographic_City,
    TELEPHONE:Telephone,
    EMAIL:Email,
    PERMISION_1:Permit_description_1,
    PERMISION_2:Permit_description_2,
    PERMISION_3:Permit_description_3
} 
let bearerToken={
  headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
}
  if(id){
    axios.put("/investors/"+id, valor,bearerToken)
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
  }else{
    axios.post("/investors/2", valor,bearerToken)
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
  }
  const {Nit, Company_name, Date_of_constitution, City_of_constitution, Constitution_Department, Country_of_Constitution, Economic_activity, Company_object, Sociodemographic_Department, Sociodemographic_Country, Address_main_office, Sociodemographic_City, Telephone, Email, Permit_description_1, Permit_description_2, Permit_description_3} = state;
  useEffect(()=>{
    callApiGetCitys(Country_of_Constitution,setCiudad)
  },[Country_of_Constitution])
  useEffect(()=>{
    callApiGetCitys(Sociodemographic_Country,setCiudadSocio)
  },[Sociodemographic_Country])

  const [switchPill,setSwitchPill] = useState(DataInicial?DataInicial.add_special_permits:initialState.add_special_permits);
  setTimeout(()=>{
      const pill = document.querySelector('.switch input');
      pill.addEventListener(`click`,()=>{
            setSwitchPill(!switchPill);
        })
        if(switchPill === true){
            pill.setAttribute(`checked`,``);
        }else{
            pill.removeAttribute(`checked`,``);
        }
  })
  
  return (
      <>
        <div className="adding-investor-overlay"></div>
        <div className="adding-investor">
            <div className="investor-add">
                <div className="header-add">
                    <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} />
                    <h1>{title}</h1>
                </div>
                <form action="" method='POST'>
                    <div className="information corporate-information">
                    <h1>{language.investorform.corporate}</h1>
                    <ul>
                        <li>
                        <label htmlFor="Nit">{language.investorform.nit}</label>
                        <input type="number" name='Nit' id='input_201px' placeholder='1' value={Nit} onChange={onChange} />
                        </li>
                        <li>
                        <label htmlFor="Company_name">{language.investorform.companyname}</label>
                        <input type="text" name='Company_name' id='input_180px' placeholder='Company name' value={Company_name} onChange={onChange} />
                        </li>
                        <li>
                        <label htmlFor="Date_of_constitution">{language.investorform.dateconsti}</label>
                        <input type='date' name='Date_of_constitution' id='input_155px' placeholder='DD/MM/YYYY' value={Date_of_constitution} onChange={onChange} />
                        </li>
                        <li>
                        <label htmlFor="Constitution_Department">{language.investorform.departamentconst}</label>
                        <select id="input_170px" name='Constitution_Department' value={Constitution_Department} onChange={onChange} placeholder='Department'>
                            <option value=""></option>
                            <option value="Dept 1">Dept 1</option>
                            <option value="Dept 2">Dept 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Constitution_Department' placeholder='Department' value={Constitution_Department} onChange={onChange} required/> 
                        <VscChevronDown />
                        </li>
                    </ul>
                    <ul>
                      
                        <li>
                        <label htmlFor="Country_of_Constitution">{language.investorform.countryconst}</label>
                        <select id="input_170px" name='Country_of_Constitution' value={country.length>0?Country_of_Constitution:"Espere"}  onChange={onChange} placeholder='Country'>
                            { country.map((info,i)=>{                              return(
                                     
                                <option value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                      )
                          })
                            }
                        </select> 
                       
                        <VscChevronDown />
                        </li>
                        <li>
                        <label htmlFor="City_of_constitution">{language.investorform.cityconst}</label>
                        <select id="input_146px" name='City_of_constitution' value={ciudad.length>0?City_of_constitution:"Espere"} onChange={onChange} placeholder='City'>
                        { ciudad.map((info,i)=>{                              return(
                                     
                                     <option value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                           )
                               })
                                 }
                        
                        </select> 
                         <VscChevronDown />
                        </li>
                        <li>
                        <label htmlFor="Economic_activity">{language.investorform.economicactivi}</label>
                        <select id="input_170px" name='Economic_activity' value={Economic_activity} onChange={onChange} placeholder='Economic activity'>
                            <option value=""></option>
                            <option value="Activity 1">Activity 1</option>
                            <option value="Activity 2">Activity 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Economic_activity' placeholder='Economic activity' value={Economic_activity} onChange={onChange} required/> 
                        <VscChevronDown />
                        </li>
                        <li>
                        <label htmlFor="Company_object">{language.investorform.companyobjec}</label>
                        <select id="input_199px" name='Company_object' value={Company_object} onChange={onChange} placeholder='Profit motive'>
                            <option value=""></option>
                            <option value="Motive 1">Motive 1</option>
                            <option value="Motive 2">Motive 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Company_object' placeholder='Profit motive' value={Company_object} onChange={onChange} required/> 
                        <VscChevronDown />
                        </li>
                    </ul>
                    </div>
                    <div className="information sociodemographic-information">
                    <h1>{language.investorform.sociodemoinfo}</h1>
                    <ul>
                        <li>
                        <label htmlFor="Sociodemographic_Department">{language.investorform.department}</label>
                        <select id="input_170px" name='Sociodemographic_Department' value={Sociodemographic_Department} onChange={onChange} placeholder='Department'>
                            <option value=""></option>
                            <option value="Dept 1">Dept 1</option>
                            <option value="Dept 2">Dept 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Sociodemographic_Department' placeholder='Department' value={Sociodemographic_Department} onChange={onChange} required/> 
                        <VscChevronDown />
                        </li>
                        <li>
                        <label htmlFor="Sociodemographic_Country">{language.investorform.country}</label>
                        <select id="input_170px" name='Sociodemographic_Country' value={country.length>0?Sociodemographic_Country:"Espere"} onChange={onChange} placeholder='Country'>
                        { country.map((info,i)=>{                              return(
                                     
                                     <option value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                           )
                               })
                                 }
                        </select>
                         <VscChevronDown />
                        </li>
                        <li>
                        <label htmlFor="Address_main_office">{language.investorform.addresmain}</label>
                        <input type="text" name='Address_main_office' id='input_201px' placeholder='Address' value={Address_main_office} onChange={onChange} />
                        </li>
                        <li>
                        <label htmlFor="Sociodemographic_City">{language.investorform.city}</label>
                        <select id="input_146px" name='Sociodemographic_City' value={ciudadSocio.length>0?Sociodemographic_City:"Espere"} onChange={onChange} placeholder='City'>
                        { ciudadSocio.map((info,i)=>{                              return(
                                     
                                     <option value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                           )
                               })
                                 }

                        </select> 
                        <VscChevronDown />
                        </li>
                    </ul>
                    </div>
                    <div className="information Contact-information">
                    <h1>{language.investorform.contactinfo}</h1>
                    <ul>
                        <li>
                        <label htmlFor="Telephone">{language.investorform.tele}</label>
                        <input type="text" name='Telephone' id='input_149px' placeholder='Telephone' value={Telephone} onChange={onChange} />
                        </li>
                        <li>
                        <label htmlFor="Email">{language.investorform.email}</label>
                        <input type="email" name='Email' id='input_295px' placeholder='Email' value={Email} onChange={onChange} />
                        </li>
                    </ul>
                    </div>
                    <div className="information Permit-information">
                    <h1>{language.investorform.specialinfo}</h1>
                    <div className="toggle_permission">
                        <p>No</p>
                        <Pill />
                        <p>{language.global.yes}</p>
                    </div>
                    {
                        switchPill === true
                        ?<>
                            <ul>
                                <li>
                                <label htmlFor="Permit_description_1">{language.investorform.permit1}</label>
                                <input type="text" name='Permit_description_1' id='input_295px' placeholder='enter permission' value={Permit_description_1} onChange={onChange} />
                                </li>
                                <li>
                                <label htmlFor="Permit_description_2">{language.investorform.permit2}</label>
                                <input type="text" name='Permit_description_2' id='input_295px' placeholder='enter permission' value={Permit_description_2} onChange={onChange} />
                                </li>
                                <li>
                                <label htmlFor="Permit_description_3">{language.investorform.permit3}</label>
                                <input type="text" name='Permit_description_3' id='input_295px' placeholder='enter permission' value={Permit_description_3} onChange={onChange} />
                                </li>
                            </ul>
                         
                        </>
                        :<>
                        <ul>
                                <li>
                                <label htmlFor="Permit_description_1">{language.investorform.permitesp}</label>
                                <input type="text" name='Permit_description_1' id='input_295px' placeholder='enter permission' value={Permit_description_1} onChange={onChange} />
                                </li>
                                </ul>
                        </>
                    }
                    </div>
                    <div className="submit-form">
                    <Button text={id?language.global.save:language.global.add} background={`var(--primary-color)`} types={`button`} click={CallRegisterApiInvestor} />
                    </div>
                </form>
            </div>
        </div>
      </>
  )
}

export default InvestorCustomizer;