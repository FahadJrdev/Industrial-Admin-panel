import React, { useReducer,useState } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { DownloadIcon } from '../../component/icon/icon';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate,Link} from 'react-router-dom';
import './due.css';
const initialState = {
    code: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const Due = ({ title ,language,id_project}) => {
    const navigates = useNavigate();
    
    const [isDownload, setDownlaod] = useState(false);
    const [LinkDownkload, setLinkDownlaod] = useState('');
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { code } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const callDocument_proyect = ()=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      
            axios.get("/projectdocument/"+code,bearerToken)
            .then((response) => {
              if(response.status===200){
                setLinkDownlaod(response.data.data.C_UBICACION)
                setDownlaod(true)
                  console.log()
              }else if(response.status===201){
                setDownlaod(false)
                setLinkDownlaod('')
                toast(response.data.data);
              }
            }).catch((err)=>{
                setDownlaod(false)
                setLinkDownlaod('')
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
        <div className = "adding-investor due">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='dueForm' action="/Projects" method='POST' onSubmit={handleSubmit}>
                    <div className="due-body">
                        <li>
                            <label htmlFor="codeProject">{ language.deligence.code }</label>
                            <input type="text" name='code' value={code} onChange={onChange} placeholder='Enter'/>
                        </li>
                            <Button text={language.deligence.validate} background={`var(--tartiary-color)`} types={`button`} click={callDocument_proyect}/>
                        
                            {isDownload ?<>
                                <p className='title'>{ language.deligence.result }</p> 
                                 <button onClick={()=>{
                                    let a = document.createElement('a');
                                    a.target= '_blank';
                                    a.href = 'https://mgm.solocursos.top/storage/app/public/'+LinkDownkload;
                                    a.download = 'Deligencia.pdf';
                                    a.click();
                                 }}>Download PDF <DownloadIcon /></button>
                            </>:<></> 
                                }
                        
                        
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default Due