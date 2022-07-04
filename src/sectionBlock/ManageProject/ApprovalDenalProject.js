import React, {useReducer,useState} from 'react'
import { Input, Select,Textarea } from '../Leasing-section/Leasing-Component';
import {Button, RatingBtn} from '../../component/buttons';
import './MP.css';

const initialState = {
  Code: '',
  Project_name: '',
  Investment_objective: '',
  Country1: '',
  City1: '',
  Responsible: '',
  Date_of_request: '',
  Investors_first_and_last_names: '',
  Document_type: '',
  Document: '',
  Country2: '',
  City2: '',
  Investment_amount: '',
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

const ApprovalDenalProject = ({language}) => {
  const [opcionbutton,SetOption]=useState('opcion1')
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const {  Code, Project_name, Investment_objective,  Country1, City1, Responsible, Date_of_request, Investors_first_and_last_names, Document_type, Document, Country2 , City2, Investment_amount, Approval_date, Number_of_certificate, Number_agreement, Total_amount, Remarks} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  return (
    <>
      <div className="Approval-denal">
        <form action="" method="post" onSubmit={handleSubmit}>
        <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_proyec.aproval_info}</p>
                    <ul className="Esheet">
                        <Input label={language.contract_inver_proyec.code} type={`text`} name={`Code`} value={Code} placeholder={``} onChange={onChange} />
                        <Input label={language.contract_inver_proyec.Project_Name} type={`text`} name={`Project_name`} value={Project_name} placeholder={`Enter`} onChange={onChange} />
                        <Input label={language.contract_inver_proyec.inverment_object} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                        <Select label={language.contract_inver_proyec.country} name={`Country1`} value={Country1} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                    </ul>
                    <ul className="Esheet"> 
                        <Select label={language.contract_inver_proyec.city} name={`City1`} value={City1} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                        <Input label={language.contract_inver_proyec.responsi} type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_proyec.investorinfo}</p>
                    <ul className="Esheet">
                        <Input label={language.contract_inver_proyec.datereque} type={`date`} name={`Date_of_request`} value={Date_of_request} placeholder={`select`}  onChange={onChange} />
                        <Input label={language.contract_inver_proyec.invertorfirstlast} type={`text`} name={`Investors_first_and_last_names`} value={Investors_first_and_last_names} placeholder={`Enter`} onChange={onChange} />
                        <Select label={language.contract_inver_proyec.document_type} name={`Document_type`} value={Document_type} placeholder={`select`} value1={`Document_type-1`} value2={`Document_type-2`} value3={`Document_type-3`} value4={`Document_type-4`} hideValue5={`dn`} onChange={onChange} />
                        <Input label={language.contract_inver_proyec.document} type={`text`} name={`Document`} value={Document} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul className="Esheet"> 
                        <Select label={language.contract_inver_proyec.country} name={`Country2`} value={Country2} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                        <Select label={language.contract_inver_proyec.city} name={`City2`} value={City2} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                        <Input label={language.contract_inver_proyec.investment_amount} type={`number`} name={`Investment_amount`} value={Investment_amount} placeholder={`$`} onChange={onChange} />
                    </ul>
                </div>
            <div className="inputs-part">
              <p className="inputsTitle">{language.contract_global.contract_cualifi}</p>
              <div className="analsis-state">
              <RatingBtn text={language.deuda_leasing.aproval_aproved} bg={opcionbutton==='opcion1'?`#69b644`:'#ffffff'} smallbg={opcionbutton==='opcion1'?'#ffffff':`#69b644`} color={opcionbutton==='opcion1'?'#ffffff':`#69b644`} border={opcionbutton==='opcion1'?'':`1px solid #69b644`}click={()=>{SetOption("opcion1")}}/>
                <RatingBtn text={language.deuda_leasing.aproval_postpone} bg={opcionbutton==='opcion2'?'var(--primary-color)':'#ffffff'} smallbg={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} color={opcionbutton==='opcion2'?'#ffffff':`var(--primary-color)`} border={`1px solid var(--primary-color)`} click={()=>{SetOption("opcion2")}}  />
                <RatingBtn text={language.deuda_leasing.aproval_reject} bg={opcionbutton==='opcion3'?`var(--secondary-color)`:'#ffffff'} smallbg={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} color={opcionbutton==='opcion3'?'#ffffff':`var(--secondary-color)`} border={`1px solid var(--secondary-color)`} click={()=>{SetOption("opcion3")}}  />
¡             </div>
              <ul className="Esheet">
                  <Input label={language.deuda_leasing.aproval_date} type={`date`} name={`Approval_date`} value={Approval_date} placeholder={`MM/DD/YYYY`} onChange={onChange} />
                  <Input label={language.deuda_leasing.aproval_numbercertifi} type={`number`} name={`Number_of_certificate`} value={Number_of_certificate} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.deuda_leasing.aproval_numberagree} type={`number`} name={`Number_agreement`} value={Number_agreement} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.deuda_leasing.aproval_totalamount} type={`number`} name={`Total_amount`} value={Total_amount} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Textarea label={language.deuda_leasing.aproval_remark} name={`Remarks`} value={Remarks} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
              </ul>
            </div>
            <div className="Esheet-submit">
                <Button text={language.deuda_leasing.aproval_comunicate}  background={`var(--primary-color)`} types={`submit`}/>
            </div>
        </form>
      </div>
    </>
  )
}

export default ApprovalDenalProject;