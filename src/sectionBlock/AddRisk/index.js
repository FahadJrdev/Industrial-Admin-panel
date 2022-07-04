import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './addRisk.css';
import { useNavigate } from 'react-router-dom';

import axios from "../../api/axios.js";
import {toast} from "react-toastify";
const initialState = {
    data: '',
    description:''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const AddRisk = ({ title ,language,idproject,funcionRefresh}) => {
    const navigates = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { data, description } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    const callApiRegister = ()=>{
        let valor= {
        C_NOMBRE: data,
        C_CALIFICACION: description
        }
      let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
          axios.post("/riskproject/"+idproject, valor,bearerToken)
          .then((response) => {
            if(response.status===200){
              funcionRefresh(idproject)
              const backButton = document.querySelector('.adding-investor .header-add button');
              backButton.click()
             
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
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor addRisk">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='addRiskForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="addRisk-body">
                        <li>
                            <label htmlFor="data">{language.projectDetails.risk_data} </label>
                            <input type="text" name='data' value={data} onChange={onChange} placeholder='Enter'/>
                        </li>
                        <li>
                            <label htmlFor="data">{language.projectDetails.risk_description}</label>
                            <textarea type="text" name='description' value={description} rows='10' cols='20' onChange={onChange} placeholder='Enter'></textarea>
                        </li>
                    </div>
                    <div className="submit">
                        <Button text={language.global.add} background={`var(--primary-color)`} types={`button`} click={callApiRegister} />
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default AddRisk;