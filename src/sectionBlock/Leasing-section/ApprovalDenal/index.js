import React, { useReducer, useState,useEffect} from 'react';
import './AD.css';
import { FinancialHead, Input, SelectVal,Textarea } from '../Leasing-Component';
import {Button, RatingBtn} from '../../../component/buttons';
import Select from 'react-select' ;

import { useNavigate} from 'react-router-dom';
import axios from "../../../api/axios.js";
import {toast} from "react-toastify";

const ApprovalDenal = ({language,AprovalInfo,id_proyectos,Deuda,id_owners}) => {
    const navigates = useNavigate();
  const initialState = {
    Date_Of_Reques: '',
    Debtors_Name_And_Surname: '',
    Document_type: '',
    Document: '',
    Approval_date: '',
    Number_of_certificate: '',
    Number_agreement: '',
    Total_amount: '',
    Remarks: ''
  }
 
  const [opcionbutton,SetOption]=useState('opcion1')
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }
  
  const [id_proyecto,setIdProyecto]=useState('')
  const [id_owner,SetOwner]=useState('')
  const [disabled,setDisable]=useState(false)
  const [id_deuda,setDeuda]=useState('')
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const {  Date_Of_Reques, Debtors_Name_And_Surname, Document_type, Document, Approval_date, Number_of_certificate, Number_agreement, Total_amount, Remarks} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
  }

const callProjectOwner=(idProject)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    axios.get("/projectowner/"+idProject, {},bearerToken)
  .then((response) => {
    if(response.status===200){
      if(response.data.length>0){
        var valorJsonCorporativa=response.data[0]['INFORMACION_COORPORATIVA']
        dispatch({ field: 'Debtors_Name_And_Surname', value: JSON.parse(valorJsonCorporativa)['NAMES']+" "+  JSON.parse(valorJsonCorporativa)['SURNAMES']})
        dispatch({ field: 'Document_type', value: JSON.parse(valorJsonCorporativa)['TYPE_IDENTIFICATION']})
        dispatch({ field: 'Document', value: JSON.parse(valorJsonCorporativa)['IDENTIFICATION']})
      }else{
        toast("No owner in the project")
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
  useEffect(()=>{
    if(AprovalInfo){
      if(AprovalInfo.APPROVAL_DATE){
        setDeuda(AprovalInfo.DEUDA_I_CODIGO)
        dispatch({ field: "Approval_date", value:AprovalInfo.APPROVAL_DATE})
        dispatch({ field: "Number_of_certificate", value:AprovalInfo.NUMBER_CERTIFICATE})
        dispatch({ field: "Approval_date", value:AprovalInfo.APPROVAL_DATE})
        dispatch({ field: "Number_agreement", value:AprovalInfo.NUMBER_AGREEMENT})
        dispatch({ field: "Total_amount", value:AprovalInfo.TOTAL_AMOUNT})
        dispatch({ field: "Remarks", value:AprovalInfo.REMARKS})
        setRating(AprovalInfo.SCORE)
        setDisable(true)
        if(AprovalInfo.STATUS==="aproved")SetOption("opcion1")
        if(AprovalInfo.STATUS==="postpone")SetOption("opcion2")
        if(AprovalInfo.STATUS==="rejected")SetOption("opcion3")
      }
      
    }
  },[AprovalInfo]);
  useEffect(()=>{
    setIdProyecto(id_proyectos)
  },[id_proyectos]);
useEffect(()=>{
  if(id_owners){
    SetOwner(id_owners)
    callProjectOwner(id_owners)
  }
  },[id_owners]);
  useEffect(()=>{
    if(Deuda){
      setDeuda(Deuda)
    }
  },[Deuda]);
  
const [rating, setRating] = useState(0);

const changeval =(event)=>{
  if(event){
    setRating(event.target.value)
  }
}

const callApiAproval = ()=>{
  let bearerToken={
    headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
  }
let valor={
  APPROVAL_DATE:Approval_date,
  NUMBER_CERTIFICATE:Number_of_certificate,
  NUMBER_AGREEMENT:Number_agreement,
  TOTAL_AMOUNT:Total_amount,
  REMARKS:Remarks,
  SCORE:rating,
  STATUS:opcionbutton==='opcion1'?'aproved':opcionbutton==='opcion2'?'postpone':'rejected'
}
      axios.post("/contractmanagementAprob/"+id_deuda+"/"+id_owner+"/"+id_proyecto,valor,bearerToken)
      .then((response) => {
        toast("Created Succes");
        navigates(-1)
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
      <div className="Approval-denal">
        
        <FinancialHead text={ language.deuda_leasing.aproval_info } hideBtn={`dn`} />
        <form action="" method="post" onSubmit={handleSubmit}>
            <ul className="Esheet">
                <Input disa={disabled} label={ language.deuda_leasing.aproval_date_reques} type={`date`} name={`Date_Of_Reques`} value={Date_Of_Reques} placeholder={`DD/MM/YYYY`} onChange={onChange} />
                <Input label={ language.deuda_leasing.aproval_debtor_name_surname} disa={true}  type={`text`} name={`Debtors_Name_And_Surname`} value={Debtors_Name_And_Surname} placeholder={`Enter Name`} onChange={onChange} />
                <SelectVal label={ language.deuda_leasing.aproval_debtor_document_type} disa={true} name={`Document_type`} value={Document_type} placeholder={`Select`} onChange={onChange} value1={`Document_type-1`} value2={`Document_type-2`} value3={`Document_type-3`} value4={`Document_type-4`} hideValue5={`dn`}/>
                <Input label={ language.deuda_leasing.aproval_debtor_document} disa={true} type={`text`} name={`Document`} value={Document} placeholder={`Enter`} onChange={onChange} />

            </ul>

            <p className="inputsTitle">{ language.deuda_leasing.aproval_creditanaly}</p>
            <div className="rating-graph">
                <div className="graph">
                    <div className='half-donut'>
                        <div className="hole">
                            <div className="line" style={{transform: `rotate(${(rating/10)*1.8}deg)`}}></div>
                            <div className="center-point"></div>
                        </div>
                    </div>
                    <p className="rating">{rating}</p>
                    <p>{ language.deuda_leasing.aproval_score}</p>
                    {disabled?<>
                    <input disabled type="range" min="0" max="1000" onChange={changeval}  value={rating} step="1"/>
                    
                    </>:<>
                    <input type="range" min="0" max="1000" onChange={changeval}  value={rating} step="1"/>
                    
                    </>}
                    {/* <span onClick={()=>{setRating(rating+10)}} style={{fontSize: "14px", marginRight: "10px", cursor: "pointer"}}>increase</span>
                    <span onClick={()=>{setRating(rating-10)}} style={{fontSize: "14px", marginRight: "10px", cursor: "pointer"}}>descrease</span> */}
                </div>
            </div>
            <p className="inputsTitle">{ language.deuda_leasing.aproval_credit_rating}</p>
            <div className="analsis-state">
                <RatingBtn text={language.deuda_leasing.aproval_aproved} bg={opcionbutton==='opcion1'?`#69b644`:'#ffffff'} smallbg={opcionbutton==='opcion1'?'#ffffff':`#69b644`} color={opcionbutton==='opcion1'?'#ffffff':`#69b644`} border={opcionbutton==='opcion1'?'':`1px solid #69b644`}click={()=>{SetOption("opcion1")}}/>
                <RatingBtn text={language.deuda_leasing.aproval_postpone} bg={opcionbutton==='opcion2'?'var(--primary-color)':'#ffffff'} smallbg={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} color={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} border={`1px solid var(--primary-color)`} click={()=>{SetOption("opcion2")}}  />
                <RatingBtn text={language.deuda_leasing.aproval_reject} bg={opcionbutton==='opcion3'?`var(--secondary-color)`:'#ffffff'} smallbg={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} color={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} border={`1px solid var(--secondary-color)`} click={()=>{SetOption("opcion3")}}  />
            </div>
            <ul className="Esheet">
                <Input disa={disabled} label={language.deuda_leasing.aproval_date} type={`date`} name={`Approval_date`} value={Approval_date} placeholder={`MM/DD/YYYY`} onChange={onChange} />
                <Input disa={disabled} label={language.deuda_leasing.aproval_numbercertifi} type={`text`} name={`Number_of_certificate`} value={Number_of_certificate} placeholder={`Enter`} onChange={onChange} />
                <Input disa={disabled} label={language.deuda_leasing.aproval_numberagree} type={`text`} name={`Number_agreement`} value={Number_agreement} placeholder={`Enter`} onChange={onChange} />
                <Input disa={disabled} label={language.deuda_leasing.aproval_totalamount} type={`text`} name={`Total_amount`} value={Total_amount} placeholder={`Enter`} onChange={onChange} />
            </ul>
            <ul className="Esheet">
              
                <Textarea disa={disabled} label={language.deuda_leasing.aproval_remark} name={`Remarks`} value={Remarks} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
             </ul>
            <div className="Esheet-submit">
              {disabled?<></>:<><Button text={language.deuda_leasing.aproval_comunicate}  background={`var(--primary-color)`} types={`button`} click={callApiAproval}/>
           </>}
                 </div>
        </form>
      </div>
    </>
  )
}

export default ApprovalDenal;