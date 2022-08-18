import React, { useReducer,useState } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { Textarea } from '../Leasing-section/Leasing-Component';
import { DownloadIcon } from '../../component/icon/icon';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate} from 'react-router-dom';
import './due.css';
const initialState = {
    code: '',
    descripcion:''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const Due = ({ title ,language,id_project}) => {
    const navigates = useNavigate();
    const [primeravez, setPrimera] = useState(true);
    const [filename, setfilename] = useState('');
    
    const [isDownload, setDownlaod] = useState(false);
    const [LinkDownkload, setLinkDownlaod] = useState('');
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { code,descripcion } = state;
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
                
        dispatch({ field: "descripcion", value: response.data.data.C_DESCRIPCION })
                setPrimera(false)
                setLinkDownlaod(response.data.data.C_UBICACION)
                setDownlaod(true)
              }else if(response.status===201){
                dispatch({ field: "descripcion", value: "" })
                setPrimera(false)
                setDownlaod(false)
                setLinkDownlaod('')
                toast(response.data.data);
              }
            }).catch((err)=>{
              dispatch({ field: "descripcion", value: "" })
              setPrimera(false)
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
         const selectFIle =  ()=>{
            document.getElementById('selectFile').click()
          }
          const callUpload = ()=>{
            let bearerToken={
              headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
            }
            var formData = new FormData();
            var imagefile =document.getElementById('selectFile');
            formData.append("DOCUMENT_FILE", imagefile.files[0]);
            formData.append("C_DESCRIPCION", descripcion);
                axios.post("/projectdocument/"+code,formData,bearerToken)
                .then((response) => {
                  toast("Upload Deligence correct");
                 navigates(-1)
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
          }
          const putname =(event)=>{
            var imagefile =document.getElementById('selectFile');
            setfilename(imagefile.files[0].name)
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
                            
                        {primeravez?<></>:<>
                        {isDownload ?<>
                                <p className='title'>{ language.deligence.result }</p> 
                                 <button onClick={()=>{
                                    let a = document.createElement('a');
                                    a.target= '_blank';
                                    a.href = 'https://mgm.solocursos.top/public/'+LinkDownkload;
                                    a.download = 'Deligencia.pdf';
                                    a.click();
                                 }}>Download PDF <DownloadIcon /></button>
                                 <Textarea name={`descripcion`} value={descripcion} label={language.deligence.observa} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
           
                            </>:<>
                            
                            <input id="selectFile" type="file" style={{display:"none"}} onChange={putname}/>
                                 <button onClick={selectFIle} >Upload PDF {filename} <DownloadIcon /></button>
                                  <Textarea name={`descripcion`} value={descripcion}  label={language.deligence.observa} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
                                  <Button text={language.deligence.upload} background={`var(--tartiary-color)`} types={`button`} click={callUpload}/>
                            
                            
                            </> 
                                }
                        
                        
                        </>}
                          
                        
                        
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default Due