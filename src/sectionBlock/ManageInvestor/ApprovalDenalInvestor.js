import React, {useReducer,useState,useEffect} from 'react'
import { Input, SelectVal,Textarea } from '../Leasing-section/Leasing-Component';
import {Button, RatingBtn} from '../../component/buttons';
import Select from 'react-select' ;
import { AiFillEdit } from "react-icons/ai";
import { useNavigate} from 'react-router-dom';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";

const initialState = {
  
  Investment_objective: '',
  Country1: '',
  City1: '',
  Investment_amount: '',
  Date_of_request: '',
  Investors_first_and_last_names: '',
  Type_of_document: '',
  Document: '',
  Country2: '',
  City2: '',
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

const ApprovalDenalInvestor = ({language,AprovalInf,idFondos,Deuda,idInversors,edit}) => {
  const navigates = useNavigate();
  const [opcionbutton,SetOption]=useState('opcion1')
  const [disabled,setDisable]=useState(false)
  const [id_fondo,setFondoID]=useState('')
  const [id_deuda,setDeuda]=useState('')
  const [IdInversor,setInversorID]=useState('')
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const {  Investment_objective,  Country1, City1, Investment_amount, Date_of_request, Investors_first_and_last_names, Type_of_document, Document, Country2 , City2, Approval_date, Number_of_certificate, Number_agreement, Total_amount, Remarks} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
  }

  const callFundInfo = (id)=>{
    let bearerToken={
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
        axios.get("/funds/"+id, {},bearerToken)
        .then((response) => {
          if(response.status===200){
            dispatch({ field: "Investment_objective", value: response.data.FONDO[0].D_VALOR_FONDO })
            dispatch({ field: "Investment_amount", value: response.data.FONDO[0].D_VALOR_INVERTIDO })
          }else{
          }
        }).catch((err)=>{
        })

}

const callInvestor = (idInvestor)=>{
  let bearerToken={
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
  }
    axios.get("/investors/"+idInvestor, {},bearerToken)
      .then((response) => {
        if(response.status===200){
         if(response.data.length>0){
          var valorJsonCorporativa=response.data[0]['DATOS'][0]['INFORMACION_COORPORATIVA']
          dispatch({ field: "Investors_first_and_last_names", value: JSON.parse(valorJsonCorporativa)['COMPANY_NAME'] })
          dispatch({ field: "Document", value:  JSON.parse(valorJsonCorporativa)['NIT'] })
          dispatch({ field: "Country2", value:  response.data[0].LUGAR[0].COUNTRY })
          dispatch({ field: "City2", value:  response.data[0].LUGAR[0].CITY })
          dispatch({ field: "Country1", value:  response.data[0].LUGAR[0].COUNTRY })
          dispatch({ field: "City1", value:  response.data[0].LUGAR[0].CITY })
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

const selectFund = (event) => {
  if(event){
    setFondoID(event.data.I_CODIGO)
      dispatch({ field: "Investment_objective", value: event.data.D_VALOR_FONDO })
      dispatch({ field: "Investment_amount", value: event.data.D_VALOR_INVERTIDO })
  }
}
const SelecDeud = (event) => {
  if(event){
    setDeuda(event.data.I_CODIGO)
    callInvestor(event.data.INVERSIONISTA_I_CODIGO)
    setInversorID(event.data.INVERSIONISTA_I_CODIGO)
  }
}
const callApiAproval = ()=>{
  let bearerToken={
    headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
  }
let valor={
  APPROVAL_DATE_INV_INVERSIONISTA:Approval_date,
  NUMBER_CERTIFICATE_INV_INVERSIONISTA:Number_of_certificate,
  NUMBER_AGREEMENT_INV_INVERSIONISTA:Number_agreement,
  TOTAL_AMOUNT_INV_INVERSIONISTA:Total_amount,
  REMARKS_INV_INVERSIONISTA:Remarks,
  SCORE_INV_INVERSIONISTA:0,
  STATUS_INV_INVERSIONISTA:opcionbutton==='opcion1'?'aproved':opcionbutton==='opcion2'?'postpone':'rejected'

}
      axios.post("/contractinvInversorAprob/"+id_deuda+"/"+IdInversor+"/"+id_fondo,valor,bearerToken)
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
        if(AprovalInf.APPROVAL_DATE_INV_INVERSIONISTA){
          setDeuda(AprovalInf.CONTRATO_INV_INVERSIONISTA_I_CODIGO)
          setFondoID(AprovalInf.FONDO_I_CODIGO)
          dispatch({ field: "Approval_date", value:AprovalInf.APPROVAL_DATE_INV_INVERSIONISTA})
          dispatch({ field: "Number_of_certificate", value:AprovalInf.NUMBER_CERTIFICATE_INV_INVERSIONISTA})
          dispatch({ field: "Number_agreement", value:AprovalInf.NUMBER_AGREEMENT_INV_INVERSIONISTA})
          dispatch({ field: "Total_amount", value:AprovalInf.TOTAL_AMOUNT_INV_INVERSIONISTA})
          dispatch({ field: "Remarks", value:AprovalInf.REMARKS_INV_INVERSIONISTA})
          setDisable(true)
          if(AprovalInf.STATUS_INV_INVERSIONISTA==="aproved")SetOption("opcion1")
          if(AprovalInf.STATUS_INV_INVERSIONISTA==="postpone")SetOption("opcion2")
          if(AprovalInf.STATUS_INV_INVERSIONISTA==="rejected")SetOption("opcion3")
        }
      }
    },[AprovalInf]);
    useEffect(()=>{
      if(idFondos){
        setDeuda(Deuda)
        setFondoID(idFondos)
        callFundInfo(idFondos)
        callInvestor(idInversors)
        setInversorID(idInversors)
      }
    },[idFondos,idInversors,Deuda]);
    const [editing, isEditing] = useState(edit);
  return (
    <>
      <div className="Approval-denal">
        <div className="editing"><span onClick={()=>{isEditing(!editing)}} ><AiFillEdit /></span></div>
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
                <p className="inputsTitle">{language.contract_inver_invest.aproval_info}</p>
                <ul className="Esheet">
                  {
                    editing
                    ?<>
                    <Input disa={true}   label={language.contract_inver_invest.inverment_object} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                    <Input disa={true} label={language.contract_inver_invest.country} type={`text`} name={`Country1`} value={Country1} placeholder={`Enter`} onChange={onChange} />
                    <Input disa={true} label={language.contract_inver_invest.city} type={`text`} name={`City1`} value={City1} placeholder={`Enter`} onChange={onChange} />               
                    <Input disa={true} label={language.contract_inver_invest.investment_amount} type={`text`} name={`Investment_amount`} value={Investment_amount} placeholder={`$`} onChange={onChange} />            
                    </>
                    :<>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.inverment_object}</label>
                        <p>{Investment_objective}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.country}</label>
                        <p>{Country1}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.city}</label>
                        <p>{City1}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.investment_amount}</label>
                        <p>{Investment_amount}</p>
                      </li>
                    </>
                  }
                </ul>
            </div>
            <div className="inputs-part">
                <p className="inputsTitle">{language.contract_inver_invest.investorinfo}</p>
                <ul className="Esheet">
                  {
                    editing
                    ?<>
                      <Input disa={true} label={language.contract_inver_invest.datereque} type={`date`} name={`Date_of_request`} value={Date_of_request}  onChange={onChange} />
                      <Input disa={true} label={language.contract_inver_invest.invertorfirstlast} type={`text`} name={`Investors_first_and_last_names`} value={Investors_first_and_last_names} placeholder={`Enter`} onChange={onChange} />
                      <SelectVal disa={true} label={language.contract_inver_invest.document_type} name={`Type_of_document`} value={Type_of_document} placeholder={`select`} value1={`Document_type-1`} value2={`Document_type-2`} value3={`Document_type-3`} value4={`Document_type-4`} hideValue5={`dn`} onChange={onChange} />
                      <Input disa={true} label={language.contract_inver_invest.document} type={`text`} name={`Document`} value={Document} placeholder={`Enter`} onChange={onChange} />
                    </>
                    :<>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.datereque}</label>
                        <p>{Date_of_request}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.invertorfirstlast}</label>
                        <p>{Investors_first_and_last_names}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.document_type}</label>
                        <p>{Type_of_document}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.document}</label>
                        <p>{Document}</p>
                      </li>
                    </>
                  }
                </ul>
                <ul className="Esheet">
                  {
                    editing
                    ?<>
                      <Input disa={true} label={language.contract_inver_invest.country} type={`text`} name={`Country2`} value={Country2} placeholder={`Enter`} onChange={onChange} />    
                      <Input disa={true} label={language.contract_inver_invest.city} type={`text`} name={`City2`} value={City2} placeholder={`Enter`} onChange={onChange} />
                    </>
                    :<>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.country}</label>
                        <p>{Country2}</p>
                      </li>
                      <li className="savedInfo">
                        <label>{language.contract_inver_invest.city}</label>
                        <p>{City2}</p>
                      </li>
                    </>
                  }
                 </ul>
            </div>
            <div className="inputs-part">
              <p className="inputsTitle">{language.contract_global.contract_cualifi}</p>
              <div className="analsis-state">
                <RatingBtn text={language.deuda_leasing.aproval_aproved} bg={opcionbutton==='opcion1'?`#69b644`:'#ffffff'} smallbg={opcionbutton==='opcion1'?'#ffffff':`#69b644`} color={opcionbutton==='opcion1'?'#ffffff':`#69b644`} border={opcionbutton==='opcion1'?'':`1px solid #69b644`}click={()=>{SetOption("opcion1")}}/>
                <RatingBtn text={language.deuda_leasing.aproval_postpone} bg={opcionbutton==='opcion2'?'var(--primary-color)':'#ffffff'} smallbg={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} color={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} border={`1px solid var(--primary-color)`} click={()=>{SetOption("opcion2")}}  />
                <RatingBtn text={language.deuda_leasing.aproval_reject} bg={opcionbutton==='opcion3'?`var(--secondary-color)`:'#ffffff'} smallbg={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} color={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} border={`1px solid var(--secondary-color)`} click={()=>{SetOption("opcion3")}}  />
              </div>
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
                    {disabled?<></>:<> <Button text={language.deuda_leasing.aproval_comunicate}  background={`var(--primary-color)`} types={`button`} click={callApiAproval}/>
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

export default ApprovalDenalInvestor