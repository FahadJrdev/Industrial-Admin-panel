import React, {useReducer,useState,useEffect} from 'react'
import { Input, SelectVal,Textarea ,ManageProjectInvestorTable} from '../Leasing-section/Leasing-Component';
import {Button, RatingBtn} from '../../component/buttons';
import Select from 'react-select' ;

import './MP.css';
import { AiFillEdit } from "react-icons/ai";

import { useNavigate} from 'react-router-dom';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";

const initialState = {
  Code: '',
  Project_name: '',
  Investment_objective: '',
  Country1: '',
  City1: '',
  Responsible: '',
  Approval_date: '',
  Number_of_certificate: '',
  Number_agreement: '',
  Total_amount: '',
  Remarks: ''
}
function reducer(state, { field, value }) {
  return {
      ...state,
      [field]: value
  }
}

const ApprovalDenalProject = ({language,AprovalInf,idFondos,Deuda,idproyecto,valoridOwner,edit}) => {
  const navigates = useNavigate();
  const[allInversors,setallInversor]=useState([])
  const [disabled,setDisable]=useState(false)
  const [opcionbutton,SetOption]=useState('opcion1')
  const [state, dispatch] = useReducer(reducer, initialState);
  const [id_fondo,setFondoID]=useState('')
  const [id_proyecto,setIdProyecto]=useState('')
  const [id_owner,SetOwner]=useState('')
  const [id_deuda,setDeuda]=useState('')
  const callApiFundsGet= (id)=>{

    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
  axios.get("/fundsByFundsToInversor/"+id, {},bearerToken)
  .then((response) => {
    if(response.status===200){
      setallInversor(response.data.INVERSIONISTAS)
      }
  }).catch((err)=>{
    if(err.response){
      if(err.response.data){
        if(err.response.data.message){
          toast(err.response.data.message)
        }
      }
    }
  })
}
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const {  Code, Project_name, Investment_objective,  Country1, City1, Responsible, Approval_date, Number_of_certificate, Number_agreement, Total_amount, Remarks} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
  }
  const callproject = (id)=>{
    let bearerToken={
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
        axios.get("/project/"+id, {},bearerToken)
        .then((response) => {
          if(response.status===200){
            dispatch({ field: "Investment_objective", value: response.data[0].I_OBJETIVO_INVERSION })
            dispatch({ field: "Project_name", value: response.data[0].C_NOMBRE_PROYECTO })
            dispatch({ field: "Code", value: response.data[0].I_CODIGO })
            dispatch({ field: "Country1", value: response.data[0].I_PAIS })
            dispatch({ field: "City1", value: response.data[0].I_CIUDAD })
            dispatch({ field: "Responsible", value: response.data[0].C_RESPONSABLE })
          }
        }).catch((err)=>{
        })

}




const callApiAproval = ()=>{
  let bearerToken={
    headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
  }
let valor={
  APPROVAL_DATE_INV_PROJECT:Approval_date,
  NUMBER_CERTIFICATE_INV_PROJECT:Number_of_certificate,
  NUMBER_AGREEMENT_INV_PROJECT:Number_agreement,
  TOTAL_AMOUNT_INV_PROJECT:Total_amount,
  REMARKS_INV_PROJECT:Remarks,
  SCORE_INV_PROJECT:0,
  STATUS_INV_PROJECT:opcionbutton==='opcion1'?'aproved':opcionbutton==='opcion2'?'postpone':'rejected'

}
      axios.post("/contractinvprojectAprob/"+id_deuda+"/"+id_owner+"/"+id_fondo+"/"+id_proyecto,valor,bearerToken)
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
    useEffect(()=>{
      if(AprovalInf){
        if(AprovalInf.APPROVAL_DATE_INV_PROJECT){
          setDeuda(AprovalInf.CONTRATO_INV_PROJECT_I_CODIGO)
          setFondoID(AprovalInf.FONDO_I_CODIGO)
          SetOwner(AprovalInf.OWNER_I_CODIGO)
          setIdProyecto(AprovalInf.PROYECTO_I_CODIGO)
          dispatch({ field: "Approval_date", value:AprovalInf.APPROVAL_DATE_INV_PROJECT})
          dispatch({ field: "Number_of_certificate", value:AprovalInf.NUMBER_CERTIFICATE_INV_PROJECT})
          dispatch({ field: "Number_agreement", value:AprovalInf.NUMBER_AGREEMENT_INV_PROJECT})
          dispatch({ field: "Total_amount", value:AprovalInf.TOTAL_AMOUNT_INV_PROJECT})
          dispatch({ field: "Remarks", value:AprovalInf.REMARKS_INV_PROJECT})
          setDisable(true)
          if(AprovalInf.STATUS_INV_PROJECT==="aproved")SetOption("opcion1")
          if(AprovalInf.STATUS_INV_PROJECT==="postpone")SetOption("opcion2")
          if(AprovalInf.STATUS_INV_PROJECT==="rejected")SetOption("opcion3")
        }
      }
    },[AprovalInf]);
    useEffect(()=>{
      if(idFondos){
        setDeuda(Deuda)
        setFondoID(idFondos)
        callApiFundsGet(idproyecto)
        callproject(idproyecto)
        SetOwner(valoridOwner)
        setIdProyecto(idproyecto)
      }
    },[idFondos,idproyecto,Deuda,valoridOwner]);
    const [editing, isEditing] = useState(edit);
  return (
    <>
      <div className="Approval-denal">
        <div className="editing"><span onClick={()=>{isEditing(!editing)}} ><AiFillEdit /></span></div>
        <form action="" method="post" onSubmit={handleSubmit}>
        <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_proyec.aproval_info}</p>
                    <ul className="Esheet">
                        {
                          editing
                          ?<>
                            <Input disa={true}  label={language.contract_inver_proyec.code} type={`text`} name={`Code`} value={Code} placeholder={``} onChange={onChange} />
                            <Input  disa={true}  label={language.contract_inver_proyec.Project_Name} type={`text`} name={`Project_name`} value={Project_name} placeholder={`Enter`} onChange={onChange} />
                            <Input disa={true}  label={language.contract_inver_proyec.inverment_object} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                            <SelectVal disa={true}  label={language.contract_inver_proyec.country} name={`Country1`} value={Country1} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_inver_proyec.code}</label>
                              <p>{Code}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_proyec.Project_Name}</label>
                              <p>{Project_name}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_proyec.inverment_object}</label>
                              <p>{Investment_objective}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_proyec.country}</label>
                              <p>{Country1}</p>
                            </li>
                          </>
                        }
                    </ul>
                    <ul className="Esheet"> 
                        {
                          editing
                          ?<>
                            <SelectVal disa={true}  label={language.contract_inver_proyec.city} name={`City1`} value={City1} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                            <Input disa={true}  label={language.contract_inver_proyec.responsi} type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_inver_proyec.city}</label>
                              <p>{City1}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_proyec.responsi}</label>
                              <p>{Responsible}</p>
                            </li>
                          </>
                        }
                    </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_proyec.investorinfo}</p>
                    <ManageProjectInvestorTable header1={language.contract_inver_proyec.datereque} header2={language.contract_inver_proyec.invertorfirstlast} header3={language.contract_inver_proyec.document} header4={language.contract_inver_proyec.country}  header5={language.contract_inver_proyec.city}  header6={language.contract_inver_proyec.investment_amount} investorInfo={allInversors} />
                </div>
            <div className="inputs-part">
              <p className="inputsTitle">{language.contract_global.contract_cualifi}</p>
              <div className="analsis-state">
                <RatingBtn text={language.deuda_leasing.aproval_aproved} bg={opcionbutton==='opcion1'?`#69b644`:'#ffffff'} smallbg={opcionbutton==='opcion1'?'#ffffff':`#69b644`} color={opcionbutton==='opcion1'?'#ffffff':`#69b644`} border={opcionbutton==='opcion1'?'':`1px solid #69b644`}click={()=>{SetOption("opcion1")}}/>
                <RatingBtn text={language.deuda_leasing.aproval_postpone} bg={opcionbutton==='opcion2'?'var(--primary-color)':'#ffffff'} smallbg={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} color={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} border={`1px solid var(--primary-color)`} click={()=>{SetOption("opcion2")}}  />
                <RatingBtn text={language.deuda_leasing.aproval_reject} bg={opcionbutton==='opcion3'?`var(--secondary-color)`:'#ffffff'} smallbg={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} color={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} border={`1px solid var(--secondary-color)`} click={()=>{SetOption("opcion3")}}  />
¡             </div>
              <ul className="Esheet">
                  {
                    editing
                    ?<>
                      <Input disa={disabled} label={language.deuda_leasing.aproval_date} type={`date`} name={`Approval_date`} value={Approval_date} placeholder={`MM/DD/YYYY`} onChange={onChange} />
                      <Input disa={disabled} label={language.deuda_leasing.aproval_numbercertifi} type={`number`} name={`Number_of_certificate`} value={Number_of_certificate} placeholder={`Enter`} onChange={onChange} />
                      <Input disa={disabled} label={language.deuda_leasing.aproval_numberagree} type={`number`} name={`Number_agreement`} value={Number_agreement} placeholder={`Enter`} onChange={onChange} />
                      <Input disa={disabled} label={language.deuda_leasing.aproval_totalamount} type={`number`} name={`Total_amount`} value={Total_amount} placeholder={`Enter`} onChange={onChange} />
                    </>
                    :<>
                        <li className="savedInfo">
                          <label>{language.deuda_leasing.aproval_date}</label>
                          <p>{Approval_date}</p>
                        </li>
                        <li className="savedInfo">
                          <label>{language.deuda_leasing.aproval_numbercertifi}</label>
                          <p>{Number_of_certificate}</p>
                        </li>
                        <li className="savedInfo">
                          <label>{language.deuda_leasing.aproval_numberagree}</label>
                          <p>{Number_agreement}</p>
                        </li>
                        <li className="savedInfo">
                          <label>{language.deuda_leasing.aproval_totalamount}</label>
                          <p>{Total_amount}</p>
                        </li>
                    </>
                  }
              </ul>
              <ul className="Esheet">
                {
                  editing
                  ?<>
                    <Textarea disa={disabled} label={language.deuda_leasing.aproval_remark} name={`Remarks`} value={Remarks} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
                  </>
                  :<>
                    <li className="savedInfo">
                      <label>{language.deuda_leasing.aproval_remark}</label>
                      <p>{Remarks}</p>
                    </li>
                  </>
                }
              </ul>
            </div>
            <div className="Esheet-submit">
              {
                editing
                ?<>
                  {disabled?<></>:<>  <Button text={language.deuda_leasing.aproval_comunicate}  background={`var(--primary-color)`} types={`button`} click={callApiAproval}/>
                </>}
                </>
                :<></>
              }
               
            </div>
        </form>
      </div>
    </>
  )
}

export default ApprovalDenalProject;