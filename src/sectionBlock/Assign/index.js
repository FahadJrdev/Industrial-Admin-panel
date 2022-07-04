import React, {useReducer, useState,useEffect} from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './assign.css';
import { VscChevronDown } from "react-icons/vsc";
import Select from 'react-select' ;
import { useNavigate } from 'react-router-dom';

import {toast} from "react-toastify";
import axios from "../../api/axios.js";
const initialState = {
    Code: '',
    Disbursement_value:'',
    Committed_value:'',
    Date_of_disbursement: '',
    Project_Code:'',
    Project_name:'',
    Type_identification:'',
    Identification:'',
    Company_name:''
  }
  
  function reducer(state, {field,value}) {
    return {
      ...state,
      [field]: value
    }
  }
  const Assign = ({title,language}) => {
    const navigates=useNavigate()
    const [optionState,setOptionState] = useState(false);
    const [option,setOption] = useState('');
    const [idInvestor,SetIDInvestor] = useState('');
    const [idProyect,SetIDProyect] = useState('');
    const [idFunds,SetIDFunds] = useState('');
    const [selected,SetOpcion] = useState('');
    const [fundsAll,setList] = useState([]);
    const [InvesorAll,setInvestor] = useState([]);
    const [ProyectosAll,setProyectos] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
    };
    useEffect(()=>{
      document.body.addEventListener('click',()=>{
        setOptionState(false);
      })
    },[]);
    useEffect(()=>{
      
      callListFounds()
      if(option==='option1'){
        SetOpcion(language.asign.option1)
        callListInvestors()
      }else if(option==='option2'){
        SetOpcion(language.asign.option2)
        callListProjects()
      }else if(option==='option3'){
        SetOpcion(language.asign.option3)
        callListInvestors()
        callListProjects()

      }
    },[option,language.asign.option1,language.asign.option2,language.asign.option3])
    const callListFounds = ()=>{
      let bearerToken={
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      }
          axios.get("/funds", {},bearerToken)
          .then((response) => {
            if(response.status===200){
              setList(response.data.map((valor)=>{
                return {
                  value:valor.I_CODIGO,
                  label:valor.C_NOMBRE?valor.C_NOMBRE:valor.C_DESCRIPCION,
                  data:valor
                }
              }))
            }else{
              setList([])
            }
          }).catch((err)=>{
              
            setList([])
          })
  
  }
 
  const callListInvestors = ()=>{
    let bearerToken={
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
        axios.get("/investors", {},bearerToken)
        .then((response) => {
          if(response.status===200){
            setInvestor(response.data.inversores.map((valor)=>{
              return {
                value:valor.DATOS[0].INVERSIONISTA_I_CODIGO,
                label:JSON.parse(valor.DATOS[0].INFORMACION_COORPORATIVA).NIT,
                data:JSON.parse(valor.DATOS[0].INFORMACION_COORPORATIVA)
              }
            }))
          }else{
            setInvestor([])
          }
        }).catch((err)=>{
            
          setInvestor([])
        })

}
const callListProjects = ()=>{
  let bearerToken={
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
  }
      axios.get("/project", {},bearerToken)
      .then((response) => {
        if(response.status===200){
          setProyectos(response.data.filter(valorelemetnt => valorelemetnt.FONDO_I_CODIGO === 0).map((valor)=>{
            return {
              value:valor.I_CODIGO,
              label:valor.C_NOMBRE_PROYECTO,
              data:valor
            }
         
        }))
        }else{
          setProyectos([])
        }
      }).catch((err)=>{
          
        setProyectos([])
      })

}
  const { Code, Disbursement_value, Committed_value, Date_of_disbursement,Project_name, Identification, Company_name} = state;

  const callRegisterFundstoInvestor = ()=>{
    let valor={
      DESCRIPCION:"Ingreso",
      D_VALOR:Disbursement_value,
      FECHA_DESEMBOLSO:Date_of_disbursement,
      VALOR_COMPROMETIDO:Committed_value,
      INVERSIONISTA_I_CODIGO:idInvestor,
      FONDO_I_CODIGO:idFunds
    } 
    
    let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
      if(idInvestor){
        if(idFunds){
          axios.post("/investment/"+idInvestor+"/"+idFunds, valor,bearerToken)
          .then((response) => {
            if(response.status===200){
              if(response.data){
                  const backButton = document.querySelector('.investor-add .header-add button');
                  backButton.click()
                  window.location.reload()
              }
            }
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
        }else{
          toast("Debes seleccionar un Fondo")

        }
       
      }else{
        toast("Debes seleccionar un inversor")

      }
   
  }
  const callRegisterFundsToProyecttoInvestor = ()=>{    
    let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }  
       let valor={
        DESCRIPCION:"Ingreso",
        D_VALOR:Disbursement_value,
        FECHA_DESEMBOLSO:Date_of_disbursement,
        VALOR_COMPROMETIDO:Committed_value,
        INVERSIONISTA_I_CODIGO:idInvestor,
        FONDO_I_CODIGO:idFunds
      } 
      if(idProyect){
        if(idFunds){
          if(idInvestor){
            axios.post("/investment/"+idInvestor+"/"+idFunds, valor,bearerToken)
            .then((response) => {
              if(response.status===200){
                if(response.data){
                  axios.put("/projectf/"+idProyect+"/"+idFunds, {},bearerToken)
                  .then((response) => {
                    if(response.status===200){
                      if(response.data){
                          const backButton = document.querySelector('.investor-add .header-add button');
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
            }).catch((err)=>{
              console.log(err)
              if(err.response){
                if(err.response.data){
                  if(err.response.data.message){
                    toast(err.response.data.message)
                  }
                }
              }
            })


          }else{
            toast("Debes seleccionar un Inversor")

          }
        
        }else{
          toast("Debes seleccionar un Fondo")

        }
       
      }else{
        toast("Debes seleccionar un Proyecto")

      }
   
  }
  
  const callRegisterFundsToProyect = ()=>{    
    let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
      if(idProyect){
        if(idFunds){
          axios.put("/projectf/"+idProyect+"/"+idFunds, {},bearerToken)
          .then((response) => {
            if(response.status===200){
              if(response.data){
                  const backButton = document.querySelector('.investor-add .header-add button');
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
          toast("Debes seleccionar un Fondo")

        }
       
      }else{
        toast("Debes seleccionar un Proyecto")

      }
   
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const SelecFondo = (event) => {
    if(event){
      SetIDFunds(event.data.I_CODIGO)
      dispatch({field:"Code", value:event.data.I_CODIGO})
    }
  }
  const SelecProyect = (event) => {
    if(event){
      SetIDProyect(event.data.I_CODIGO)
      dispatch({field:"Project_name", value:event.data.C_NOMBRE_PROYECTO})
    }
  }
  
  const SelectInvestor = (event) => {
    if(event){
      SetIDInvestor(event.value)
      dispatch({field:"Identification", value:event.data.NIT})
      dispatch({field:"Company_name", value:event.data.COMPANY_NAME})
    }
  }
  return (
    <>
    <div className="adding-investor-overlay"></div>
    <div className="adding-investor">
        <div className="investor-add cfund">
            <div className="header-add">
                <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} />
                <h1>{title}</h1>
            </div>
            <div className="assignment">
                <p htmlFor="assign">{language.asign.type} </p>
                <ul onClick={(e)=>{e.stopPropagation();setOptionState(!optionState);}} name='assign'>
                  {
                    optionState=== true
                    ?<>
                      <li onClick={(e)=>{setOption('option1');}}>{language.asign.option1} </li>
                      <li onClick={(e)=>{setOption('option2');}}>{language.asign.option2}</li>
                      <li onClick={(e)=>{setOption('option3');}}>{language.asign.option3}</li>
                    </>
                    :<></>
                  }
                    
                </ul> 
                <input className='selectInput' type="text" name='assign' placeholder='Select' value={selected} onChange={onChange}/> 
                <VscChevronDown />
            </div>
            <div className="assignment-body">
              {
                option === 'option1'
                ?
                <form action="" method='POST' onSubmit={handleSubmit}>
                <div className="assignment-input">
                  
                  <ul>
                    
                  <li>
                      <label htmlFor="Code">{language.fundsassign.fondos}</label>                 
                      <Select options={fundsAll} onChange={SelecFondo} />
                    </li>
                    <li>
                      <label htmlFor="Code">{language.fundsassign.code}</label>
                      <input className='selectInput' disabled type="text" name='Code' placeholder='' value={Code} onChange={onChange}/> 
                    </li>
                    <li>
                      <label htmlFor="Disbursement_value">{language.fundsassign.disturbemvalue}</label>
                      <input className='selectInput' type="number" name='Disbursement_value' placeholder='$' value={Disbursement_value} onChange={onChange}/> 
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <label htmlFor="Committed_value">{language.fundsassign.commitedval}</label>
                      <input className='selectInput' type="number" name='Committed_value' placeholder='$' value={Committed_value} onChange={onChange}/> 
                    </li>
                    <li>
                      <label htmlFor="Date_of_disbursement">{language.fundsassign.datedisturbem}</label>
                      <input className='selectInput' type="date" name='Date_of_disbursement' placeholder='' value={Date_of_disbursement} onChange={onChange}/> 
                    </li>
                  </ul>
                </div>
                <div className="project-data">
                  <p>{language.fundsassign.dataInvestor}</p>
                  <ul className='investor-data'>
                    <li>
                      <label htmlFor="Type_identification">{language.fundsassign.typeidentification}</label>
                      <Select options={InvesorAll} onChange={SelectInvestor} />
                    </li>
                    
                    <li>
                      <label htmlFor="Identification">{language.fundsassign.identification}</label>
                      <input className='selectInput' disabled type="text" name='Identification' placeholder='Enter' value={Identification} onChange={onChange}/> 
                    </li>
                    <li>
                      <label htmlFor="Company_name">{language.fundsassign.compayname}</label>
                      <input className='selectInput'disabled type="text" name='Company_name' placeholder='Enter' value={Company_name} onChange={onChange}/> 
                    </li>
                  </ul>
                </div>
                <div className="submit">
                  <Button text={language.global.add} background={`var(--primary-color)`} types={`button`} click={callRegisterFundstoInvestor} />
                </div>
                </form>
                :(
                  option === 'option2'
                  ?<form action="" method='POST' onSubmit={handleSubmit}>
                    
                  
                  <div className="assignment-input">
                    <ul>
                    <li>
                      <label htmlFor="Code">{language.fundsassign.fondos}</label>                 
                      <Select options={fundsAll} onChange={SelecFondo} />
                    </li>
                      <li>
                        <label htmlFor="Code">{language.fundsassign.code}</label>
                        <input className='selectInput' disabled type="text" name='Code' placeholder='' value={Code} onChange={onChange}/> 
                      </li>
                      <li>
                        <label htmlFor="Disbursement_value">{language.fundsassign.disturbemvalue}</label>
                        <input className='selectInput' type="text" name='Disbursement_value' placeholder='$' value={Disbursement_value} onChange={onChange}/> 
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <label htmlFor="Committed_value">{language.fundsassign.commitedval}</label>
                        <input className='selectInput' type="text" name='Committed_value' placeholder='$' value={Committed_value} onChange={onChange}/> 
                      </li>
                      <li>
                        <label htmlFor="Date_of_disbursement">{language.fundsassign.datedisturbem}</label>
                        <input className='selectInput' type="date" name='Date_of_disbursement' placeholder='' value={Date_of_disbursement} onChange={onChange}/> 
                      </li>
                    </ul>
                  </div>
                  <div className="project-data">
                    <p>{language.fundsassign.projectdata}</p>
                    <ul>
                      <li>
                        <label htmlFor="Project_Code">{language.fundsassign.code}</label>
                        <Select options={ProyectosAll} onChange={SelecProyect} />
                      </li>
                      <li>
                        <label htmlFor="Project_name">{language.fundsassign.projectname}</label>
                        <input className='selectInput' disabled type="text" name='Project_name' placeholder='Enter' value={Project_name} onChange={onChange}/> 
                      </li>
                    </ul>
                  </div>
                  <div className="submit">
                    <Button text={language.global.add} background={`var(--primary-color)`} types={`button`} click={callRegisterFundsToProyect}/>
                  </div>
                  </form>
                  :(
                    option === 'option3'
                    ?<form action="" method='POST' onSubmit={handleSubmit}>
                      <div className="assignment-input">
                        <ul>
                        <li>
                      <label htmlFor="Code">{language.fundsassign.fondos}</label>                 
                      <Select options={fundsAll} onChange={SelecFondo} />
                    </li>
                          <li>
                            <label htmlFor="Code">{language.fundsassign.code}</label>
                            <input className='selectInput' type="text" disabled name='Code' placeholder='' value={Code} onChange={onChange}/> 
                          </li>
                          <li>
                            <label htmlFor="Disbursement_value">{language.fundsassign.disturbemvalue}</label>
                            <input className='selectInput' type="text" name='Disbursement_value' placeholder='$' value={Disbursement_value} onChange={onChange}/> 
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <label htmlFor="Committed_value">{language.fundsassign.commitedval}</label>
                            <input className='selectInput' type="text" name='Committed_value' placeholder='$' value={Committed_value} onChange={onChange}/> 
                          </li>
                          <li>
                            <label htmlFor="Date_of_disbursement">{language.fundsassign.datedisturbem}</label>
                            <input className='selectInput' type="date" name='Date_of_disbursement' placeholder='' value={Date_of_disbursement} onChange={onChange}/> 
                          </li>
                        </ul>
                      </div>
                      <div className="project-data">
                        <p>{language.fundsassign.projectdata}</p>
                        <ul>
                          <li>
                            <label htmlFor="Project_Code">{language.fundsassign.code}</label>
                            <Select options={ProyectosAll} onChange={SelecProyect} />
                          </li>
                          <li>
                            <label htmlFor="Project_name">{language.fundsassign.projectname}</label>
                            <input className='selectInput' type="text" name='Project_name' disabled placeholder='Enter' value={Project_name} onChange={onChange}/> 
                          </li>
                        </ul>
                        <p>{language.fundsassign.dataInvestor}</p>
                        <ul className='investor-data'>
                          <li>
                            <label htmlFor="Type_identification">{language.fundsassign.typeidentification}</label>
                            <Select options={InvesorAll} onChange={SelectInvestor} />
                          </li>
                          
                          <li>
                            <label htmlFor="Identification">{language.fundsassign.identification}</label>
                            <input className='selectInput' disabled type="text" name='Identification' placeholder='Enter' value={Identification} onChange={onChange}/> 
                          </li>
                          <li>
                            <label htmlFor="Company_name">{language.fundsassign.compayname}</label>
                            <input className='selectInput'disabled type="text" name='Company_name' placeholder='Enter' value={Company_name} onChange={onChange}/> 
                          </li>
                        </ul>
                      </div>
                      <div className="submit">
                        <Button text={language.global.add} background={`var(--primary-color)`} types={`button`} click={callRegisterFundsToProyecttoInvestor} />
                      </div>
                    </form>
                    :<></>
                  )
                )
              }
            </div>
        </div>
    </div>
    </>
  )
}

export default Assign;