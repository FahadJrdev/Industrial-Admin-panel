import React, {useReducer, useState,useEffect} from 'react';
import './investorCustomizer.css';
import { Button, ButtonWithArrow, Pill } from '../../component/buttons';
import { TablePermision } from '../../component/table';
import { VscChevronDown } from "react-icons/vsc";
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import { AddIcon } from '../../component/icon/icon';

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
  add_special_permits: true,
  restrict_number: '',
  restrict_edit: ''
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
  const [countryPerm,setCountryPerm] = useState([]);
  const [selecprem,selecCoun] = useState({});
  const [keydelete,borrado] = useState({});
  const [permi,setAddPermision] = useState([]);
  const [una] = useState('');
  const [country,CountrySet] = useState([]);
  const [state, dispatch] = useReducer(reducer,DataInicial?DataInicial:initialState);
  const onChange =(e)=>{
    dispatch({field: e.target.name, value: e.target.value})
  }
  const onChangs =(e)=>{
   selecCoun({name:countryPerm[e.target.selectedIndex-1].C_NOMBRE,id:e.target.value,index:(e.target.selectedIndex-1)} )
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
              setCountryPerm(response.data)
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
    PERMISION_3:Permit_description_3,
    PAISES_REST:JSON.stringify(permi.map((valor)=>{
      return valor.id
    }))
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
    axios.post("/investors", valor,bearerToken)
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
  const {Nit, Company_name, Date_of_constitution, City_of_constitution, Constitution_Department, Country_of_Constitution, Economic_activity, Company_object, Sociodemographic_Department, Sociodemographic_Country, Address_main_office, Sociodemographic_City, Telephone, Email, Permit_description_1, Permit_description_2, Permit_description_3, restrict_number, restrict_edit} = state;
  useEffect(()=>{
    if(Country_of_Constitution){
      callApiGetCitys(Country_of_Constitution,setCiudad)

    }
  },[Country_of_Constitution])
  useEffect(()=>{
    if(Sociodemographic_Country){
      callApiGetCitys(Sociodemographic_Country,setCiudadSocio)

    }
  },[Sociodemographic_Country])

  const [switchPill,setSwitchPill] = useState(DataInicial?DataInicial.add_special_permits:initialState.add_special_permits);
  setTimeout(()=>{
      const pill = document.querySelector('.switch input');
      if(pill){
        pill.addEventListener(`click`,()=>{
              setSwitchPill(!switchPill);
          })
          if(switchPill === true){
              pill.setAttribute(`checked`,``);
          }else{
              pill.removeAttribute(`checked`,``);
          }
      }
  })
  const agregarCountry=()=>{
    let count =countryPerm
    let Permissions=permi
    let valor=count.splice(selecprem.index,1)
    let valor2=Permissions.push(selecprem)
    setCountryPerm(count)
    setAddPermision(Permissions)
    selecCoun({})
  }
  useEffect(()=>{
    if(permi.length>0){
      let count =countryPerm
      let Permissions=permi
      console.log(Permissions[keydelete.numero])
      let valor=count.push({I_CODIGO:Permissions[keydelete.numero].id,C_NOMBRE:Permissions[keydelete.numero].name})
      let valor2=Permissions.splice(keydelete.numero,1)
      setCountryPerm(count)
      if(Permissions.length>0){
        setAddPermision(Permissions)
      }else{
      setAddPermision([])
      }
      selecCoun({})
    }
  },[keydelete, countryPerm, permi])
  const restrictList = [10103284756, 10103284758];
  const [restrictItem, setRestrictItem] = useState(restrictList);
  // const [editRestrict, isEditRestrict] = useState(false);
  const addRestrictNumber = () => {
    const restrictInput = document.querySelector("#restrictInput");
    console.log(restrictInput);
    if(restrictInput){
      restrictList.push(Number(restrictInput.value));
      setRestrictItem(restrictList);
      restrictInput.value = 0;
    }
    console.log({restrictItem, restrictList});
  }
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
                                     
                                <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
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
                                     
                                     <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
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
                                     
                                     <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
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
                        { ciudadSocio.map((info,i)=>{                              
                          return(           
                                     <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
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
                      <h6>Ingresa el código del parámetro restrictivo</h6>
                      <div className="toggle_permission">
                          <p>No</p>
                          <Pill />
                          <p>{language.global.yes}</p>
                      </div>
                      {
                          switchPill === true
                          ?<>
                      <div className="restriction">
                        <div className="restrict">
                          <ul className="restrict-body">
                            <li>Código de restricción</li>
                            <li><input type="number" name='restrict_number' id="restrictInput" placeholder='Enter' value={restrict_number} onChange={onChange} /></li>
                            {
                              restrictItem.map((item, i) => {
                                return(
                                  <>
                                      <li key={i}>{item}</li>
                                  </>
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div className="edit-restrict">
                          <span onClick={addRestrictNumber} ><AddIcon /></span>
                          <span><AiFillEdit /></span>
                        </div>
                      </div>
                      <ul>
                          <li className="listItem">
                          <label htmlFor="selecperm">{language.investorform.country}</label>
                          <select id="input_170px" name='selecperm'  onChange={onChangs} placeholder='Country'>
                                      <option value={""}>{""}</option>
                          { countryPerm.map((info,i)=>{   
                            return(
                                      
                                      <option key={i} value={info.I_CODIGO}>{info.C_NOMBRE}</option>
                                            )
                                })
                                  }
                          </select>
                          <VscChevronDown />
                          </li>
                          <span onClick={agregarCountry} ><AiFillCheckCircle size={50} 
                                color="blue"/></span>
                      </ul>
                          <TablePermision data={permi} language={language} deletes={borrado} />                        
                          </>
                          :<>
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