import React, {useState, useEffect} from 'react';
import './POI.css';
import { AiFillEdit } from "react-icons/ai";
import { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { VscChevronDown } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

import axios from "../../api/axios.js";
import {toast} from "react-toastify";

const initialState = {
  Names: '',
  Surnames:'',
  Type_of_identification:'',
  Identification: '',
  Department:'',
  Country:'',
  Address_main_office: '',
  City: '',
  Telephone: '',
  Email: ''
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const ProjectOwnerInfo = ({title,language,datoRetorno,idproject,setOwner,idOwner,setIdOwner, edit}) => {
  const navigates = useNavigate();
  const [isEditing, setEditing] = useState(edit);
  useEffect(()=>{
    const editElement = document.querySelector('.ProjectOwnerInfo ul li svg');
    if(editElement){
      editElement.addEventListener('click',()=>{
        setEditing('yes');
      })
    }
    const submitButton = document.querySelector('.ProjectOwnerInfo ul li button');
    if(submitButton){

      submitButton.addEventListener('click',()=>{
        setEditing('no');
      })
    }
  },[])
  
  const [ciudad,setCiudad] = useState([]);
  
  const [idOwners,setIdOwners] = useState('');
  const [una] = useState('');
  const [countrys,CountrySet] = useState([]);
  const [state, dispatch] = useReducer(reducer,datoRetorno?datoRetorno:initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const {Names, Surnames, Type_of_identification, Identification, Department, Country, Address_main_office, City, Telephone, Email} = state;

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
const Option =()=>{
      if(idOwner){
        setIdOwners(idOwner)
        callApiRegisterUpdate()
      }else{
        callApiRegister()
      }
}
  const callApiRegister = ()=>{
    console.log(idOwners)
    let valor= {
      NAMES:Names,
      SURNAMES:Surnames,
      TYPE_IDENTIFICATION:Type_of_identification,
      IDENTIFICATION:Identification,
      DEPARTAMENT:Department,
      COUNTRY:Country,
      ADDRESS:Address_main_office,
      CITY:City,
      TELEPHONE:Telephone,
      EMAIL:Email
      }
  let bearerToken={
    headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
  }
      axios.post("/projectowner/"+idOwners, valor,bearerToken)
      .then((response) => {
        if(response.status===200){
            setIdOwner(response.data.id)
          setOwner({
            Names: Names,
            Surnames:Surnames,
            Type_of_identification:Type_of_identification,
            Identification: Identification,
            Department:Department,
            Country:Country,
            Address_main_office: Address_main_office,
            City: City,
            Telephone: Telephone,
            Email:Email
          })
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
    const callApiRegisterUpdate = ()=>{
      let valor= {
        NAMES:Names,
        SURNAMES:Surnames,
        TYPE_IDENTIFICATION:Type_of_identification,
        IDENTIFICATION:Identification,
        DEPARTAMENT:Department,
        COUNTRY:Country,
        ADDRESS:Address_main_office,
        CITY:City,
        TELEPHONE:Telephone,
        EMAIL:Email
        }
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
        axios.put("/projectowner/"+idOwner, valor,bearerToken)
        .then((response) => {
          if(response.status===200){
            const backButton = document.querySelector('.adding-investor .header-add button');
                backButton.click()
            setOwner({
              Names: Names,
              Surnames:Surnames,
              Type_of_identification:Type_of_identification,
              Identification: Identification,
              Department:Department,
              Country:Country,
              Address_main_office: Address_main_office,
              City: City,
              Telephone: Telephone,
              Email:Email
            })
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
                    <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} /> 
                    <h1>{title}</h1>
                </div> 
                <form action="" method='POST' className='ProjectOwnerInfo information'  onSubmit={handleSubmit}>
                    <p className='OwnerInfoTitle'>{language.projectDetails.propetar_basicinfo}</p>
                    <ul>
                        <li style={{order: 2}}>
                            <label htmlFor="Names">{language.projectDetails.propetar_names}</label>
                            {
                            isEditing==='no'
                            ?<p>{Names}</p>
                            :<input type="text" name='Names'  value={Names} placeholder='Names' onChange={onChange} />
                            }
                        </li>
                        <li style={{order: 3}}>
                            <label htmlFor="Surnames">{language.projectDetails.propetar_surname}</label>
                            {
                            isEditing ==='no'
                            ?<p>{Surnames}</p>
                            :<input type="text" name='Surnames' value={Surnames} placeholder='Surnames' onChange={onChange} />
                            }
                        </li>
                        <li style={{order: 4}}>
                            <label htmlFor="Type_of_identification">{language.projectDetails.propetar_typeidentifica}</label>
                            {
                            isEditing ==='no'
                            ?<p>{Type_of_identification}  </p>
                            :<textarea type="text" name='Type_of_identification' value={Type_of_identification} onChange={onChange} placeholder='Type of identification' row='8' column='25'></textarea>
                            }
                        </li>
                        <li style={{order: 5}}>
                            <label htmlFor="Identification">{language.projectDetails.propetar_identifiaci}</label>
                            {
                            isEditing ==='no'
                            ?<p>{Identification}  </p>
                            :<textarea type="text" name='Identification' value={Identification} onChange={onChange} placeholder='Identification' row='8' column='25'></textarea>
                            }
                        </li>
                        <li style={{order: 5}}>
                            <AiFillEdit />
                        </li>
                    </ul>
                    <p className='OwnerInfoTitle'>{language.projectDetails.propetar_soscio}</p>
                    <ul>
                        <li>
                            <label htmlFor="Department">{language.projectDetails.propetar_department}</label>
                            {
                            isEditing==='no'
                            ?<p>{Department}</p>
                            :<>
                            <select className="input_201px" name='Department' value={Department} onChange={onChange} placeholder='Select'>
                                <option value=""></option>
                                <option value="Department 1">Department 1</option>
                                <option value="Department 2">Department 2</option>
                            </select> 
                            <input className='selectInput' type="text" name='Department' placeholder='Select' value={Department} onChange={onChange} /> 
                            <VscChevronDown />
                            </>
                        }
                        </li>
                        <li>
                            <label htmlFor="Country">{language.projectDetails.propetar_country}</label>
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
                            <label htmlFor="Address_main_office">{language.projectDetails.propetar_addresmain}</label>
                            {
                            isEditing==='no'
                            ?<p>{Address_main_office}</p>
                            :<input type="text" name='Address_main_office'  value={Address_main_office} placeholder="Enter" onChange={onChange} />
                            }
                        </li>
                        <li>
                            <label htmlFor="City">{language.projectDetails.propetar_city}</label>
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
                    <p className='OwnerInfoTitle'>{language.projectDetails.propetar_contactinfo}</p>
                    <ul>
                        <li>
                            <label htmlFor="Telephone">{language.projectDetails.propetar_telepho}</label>
                            {
                            isEditing==='no'
                            ?<p>{Telephone}</p>
                            :<input type="text" name='Telephone'  value={Telephone} placeholder="Enter" onChange={onChange} />
                            }
                        </li>
                        <li>
                            <label htmlFor="Projected_departure_date">{language.projectDetails.propetar_email}</label>
                            {
                            isEditing==='no'
                            ?<p>{Email}</p>
                            :<input type="text" name='Email' value={Email} placeholder="Email" onChange={onChange} />
                            }
                        </li>
                    </ul>
                    <div className="submit-button">
                    {
                        isEditing==='no'
                        ?<></>
                        :<Button text={language.global.accept} background={`var(--primary-color)`} types={`button`} click={Option} />
                    }
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default ProjectOwnerInfo;