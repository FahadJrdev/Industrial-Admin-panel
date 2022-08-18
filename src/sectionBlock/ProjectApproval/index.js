import React, { useReducer ,useEffect} from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { DownloadIcon } from '../../component/icon/icon';
import './pa.css';
import { VscChevronDown } from "react-icons/vsc";

import axios from "../../api/axios.js";
import {toast} from "react-toastify";
const initialState = {
    Projected_date_of_release: '',
    Project_name: '',
    aprobado: '',
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const Approval = ({ title, language ,idprodject,close,aproveVal}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Projected_date_of_release, Project_name, aprobado } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    useEffect(()=>{
        if(aproveVal.fechaArob){
            dispatch({ field: "Projected_date_of_release", value:aproveVal.fechaArob })
            dispatch({ field: "Project_name", value: aproveVal.nombreapro })
            dispatch({ field:  "aprobado", value: aproveVal.statusaprob })

        }
     
       },[aproveVal]);
    
    const AproveProject = ()=>{
        let bearerToken={
            headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
          }
    
          let valor={
            NOMBRE_APROBA:Project_name,
            FECHA_APROBA:Projected_date_of_release,
            STATUS_APROBA:aprobado
            }
            axios.put("/projectAprobaCommittee/"+idprodject, valor,bearerToken)
            .then((response) => {
                close('close')
            }).catch((err)=>{
              if(err.response){
                if(err.response.data){
                  if(err.response.data.message){
                    alert(err.response.data.message)
                  }
                }
              }
            })
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='approvalForm information' action="" method='POST' onSubmit={handleSubmit}>
                    <div className="approval-body">
                        <ul>
                             <li>
                                <label htmlFor="Projected_date_of_release">{ language.projectDetails.approvalprojecdate }</label>
                                <input type="date" name='Projected_date_of_release' value={Projected_date_of_release} onChange={onChange} placeholder='MM/DD/YYYY'/>
                            </li>
                            <li>
                                    <label htmlFor="aprobado">{ language.projectDetails.approvalprojecestado }</label>
                                    <select className="input_201px" name='aprobado' value={aprobado} onChange={onChange} placeholder='Select'>
                                        <option value=""></option>
                                        <option value="1">Aprobado</option>
                                        <option value="2">Rechazado</option>
                                    </select> 
                                    <VscChevronDown />
                                </li>
                            
                        </ul>
                        <ul>
                        <li>
                                <label htmlFor="Project_name">{ language.projectDetails.aprrovalnombre }</label>
                                <input type="text" name='Project_name' value={Project_name} onChange={onChange} placeholder='Name'/>
                            </li>
                            
                        </ul>
                        <Button text={ language.projectDetails.approvalvalidate } background={`var(--tartiary-color)`} types={`button`} click={AproveProject}/>
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default Approval;