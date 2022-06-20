import React, {useReducer, useState,useEffect} from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './assign.css';
import { VscChevronDown } from "react-icons/vsc";
import Select from 'react-select' ;

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
    const [optionState,setOptionState] = useState(false);
    const [option,setOption] = useState('');
    const [fundsAll,setList] = useState([]);
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
      if(option==='option1'){
        callListFounds()
      }
    },[option])
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
                  label:valor.C_NOMBRE?valor.C_NOMBRE:valor.C_DESCRIPCION
                }
              }))
            }else{
              setList([])
            }
          }).catch((err)=>{
              
            setList([])
          })
  
  }

  const { Code, Disbursement_value, Committed_value, Date_of_disbursement,Project_Code,Project_name, Type_identification, Identification, Company_name} = state;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
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
                <input className='selectInput' type="text" name='assign' placeholder='Select'/> 
                <VscChevronDown />
            </div>
            <div className="assignment-body">
              {
                option === 'option1'
                ?
                <form action="" method='POST' onSubmit={handleSubmit}>
                  
                <Select options={fundsAll}/>
                <div className="assignment-input">
                  <ul>
                    <li>
                      <label htmlFor="Code">Code</label>
                      <input className='selectInput' type="text" name='Code' placeholder='' value={Code} onChange={onChange}/> 
                    </li>
                    <li>
                      <label htmlFor="Disbursement_value">Disbursement value</label>
                      <input className='selectInput' type="text" name='Disbursement_value' placeholder='$' value={Disbursement_value} onChange={onChange}/> 
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <label htmlFor="Committed_value">Committed value</label>
                      <input className='selectInput' type="text" name='Committed_value' placeholder='$' value={Committed_value} onChange={onChange}/> 
                    </li>
                    <li>
                      <label htmlFor="Date_of_disbursement">Date of disbursement</label>
                      <input className='selectInput' type="date" name='Date_of_disbursement' placeholder='' value={Date_of_disbursement} onChange={onChange}/> 
                    </li>
                  </ul>
                </div>
                <div className="project-data">
                  <p>Investor data</p>
                  <ul className='investor-data'>
                    <li>
                      <label htmlFor="Type_identification">Type identification</label>
                      <select name='Type_identification' value={Type_identification} onChange={onChange} placeholder='Select' >
                          <option value=""></option>
                          <option value="Identification1">Identification1</option>
                          <option value="Identification2">Identification2</option>
                          <option value="Identification3">Identification3</option>
                      </select> 
                      <input className='selectInput' type="text" name='Type_identification' placeholder='Select' value={Type_identification} onChange={onChange}/> 
                      <VscChevronDown />
                    </li>
                    <li>
                      <label htmlFor="Identification">Identification</label>
                      <input className='selectInput' type="text" name='Identification' placeholder='Enter' value={Identification} onChange={onChange}/> 
                    </li>
                    <li>
                      <label htmlFor="Company_name">Company name</label>
                      <input className='selectInput' type="text" name='Company_name' placeholder='Enter' value={Company_name} onChange={onChange}/> 
                    </li>
                  </ul>
                </div>
                <div className="submit">
                  <Button text={`Add`} background={`var(--primary-color)`} types={`submit`} />
                </div>
                </form>
                :(
                  option === 'option2'
                  ?<form action="" method='POST' onSubmit={handleSubmit}>
                  <div className="assignment-input">
                    <ul>
                      <li>
                        <label htmlFor="Code">Code</label>
                        <input className='selectInput' type="text" name='Code' placeholder='' value={Code} onChange={onChange}/> 
                      </li>
                      <li>
                        <label htmlFor="Disbursement_value">Disbursement value</label>
                        <input className='selectInput' type="text" name='Disbursement_value' placeholder='$' value={Disbursement_value} onChange={onChange}/> 
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <label htmlFor="Committed_value">Committed value</label>
                        <input className='selectInput' type="text" name='Committed_value' placeholder='$' value={Committed_value} onChange={onChange}/> 
                      </li>
                      <li>
                        <label htmlFor="Date_of_disbursement">Date of disbursement</label>
                        <input className='selectInput' type="date" name='Date_of_disbursement' placeholder='' value={Date_of_disbursement} onChange={onChange}/> 
                      </li>
                    </ul>
                  </div>
                  <div className="project-data">
                    <p>Project data</p>
                    <ul>
                      <li>
                        <label htmlFor="Project_Code">Code</label>
                        <select name='Project_Code' value={Project_Code} onChange={onChange} placeholder='Select' >
                            <option value=""></option>
                            <option value="Code1">Code1</option>
                            <option value="Code2">Code2</option>
                            <option value="Code3">Code3</option>
                        </select> 
                        <input className='selectInput' type="text" name='Project_Code' placeholder='Select' value={Project_Code} onChange={onChange}/> 
                        <VscChevronDown />
                      </li>
                      <li>
                        <label htmlFor="Project_name">Project name</label>
                        <input className='selectInput' type="text" name='Project_name' placeholder='Enter' value={Project_name} onChange={onChange}/> 
                      </li>
                    </ul>
                  </div>
                  <div className="submit">
                    <Button text={`Add`} background={`var(--primary-color)`} types={`submit`} />
                  </div>
                  </form>
                  :(
                    option === 'option3'
                    ?<form action="" method='POST' onSubmit={handleSubmit}>
                      <div className="assignment-input">
                        <ul>
                          <li>
                            <label htmlFor="Code">Code</label>
                            <input className='selectInput' type="text" name='Code' placeholder='' value={Code} onChange={onChange}/> 
                          </li>
                          <li>
                            <label htmlFor="Disbursement_value">Disbursement value</label>
                            <input className='selectInput' type="text" name='Disbursement_value' placeholder='$' value={Disbursement_value} onChange={onChange}/> 
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <label htmlFor="Committed_value">Committed value</label>
                            <input className='selectInput' type="text" name='Committed_value' placeholder='$' value={Committed_value} onChange={onChange}/> 
                          </li>
                          <li>
                            <label htmlFor="Date_of_disbursement">Date of disbursement</label>
                            <input className='selectInput' type="date" name='Date_of_disbursement' placeholder='' value={Date_of_disbursement} onChange={onChange}/> 
                          </li>
                        </ul>
                      </div>
                      <div className="project-data">
                        <p>Project data</p>
                        <ul>
                          <li>
                            <label htmlFor="Project_Code">Code</label>
                            <select name='Project_Code' value={Project_Code} onChange={onChange} placeholder='Select' >
                                <option value=""></option>
                                <option value="Code1">Code1</option>
                                <option value="Code2">Code2</option>
                                <option value="Code3">Code3</option>
                            </select> 
                            <input className='selectInput' type="text" name='Project_Code' placeholder='Select' value={Project_Code} onChange={onChange}/> 
                            <VscChevronDown />
                          </li>
                          <li>
                            <label htmlFor="Project_name">Project name</label>
                            <input className='selectInput' type="text" name='Project_name' placeholder='Enter' value={Project_name} onChange={onChange}/> 
                          </li>
                        </ul>
                        <p>Investor data</p>
                        <ul className='investor-data'>
                          <li>
                            <label htmlFor="Type_identification">Type identification</label>
                            <select name='Type_identification' value={Type_identification} onChange={onChange} placeholder='Select' >
                                <option value=""></option>
                                <option value="Identification1">Identification1</option>
                                <option value="Identification2">Identification2</option>
                                <option value="Identification3">Identification3</option>
                            </select> 
                            <input className='selectInput' type="text" name='Type_identification' placeholder='Select' value={Type_identification} onChange={onChange}/> 
                            <VscChevronDown />
                          </li>
                          <li>
                            <label htmlFor="Identification">Identification</label>
                            <input className='selectInput' type="text" name='Identification' placeholder='Enter' value={Identification} onChange={onChange}/> 
                          </li>
                          <li>
                            <label htmlFor="Company_name">Company name</label>
                            <input className='selectInput' type="text" name='Company_name' placeholder='Enter' value={Company_name} onChange={onChange}/> 
                          </li>
                        </ul>
                      </div>
                      <div className="submit">
                        <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
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