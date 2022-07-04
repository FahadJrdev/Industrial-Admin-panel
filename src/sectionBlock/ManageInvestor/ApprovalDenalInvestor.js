import React, {useReducer} from 'react'
import { Input, Select,Textarea } from '../Leasing-section/Leasing-Component';
import {Button, RatingBtn} from '../../component/buttons';

const initialState = {
  Fund_to_invest: '',
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

const ApprovalDenalInvestor = ({language}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const { Fund_to_invest, Investment_objective,  Country1, City1, Investment_amount, Date_of_request, Investors_first_and_last_names, Type_of_document, Document, Country2 , City2, Approval_date, Number_of_certificate, Number_agreement, Total_amount, Remarks} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  return (
    <>
      <div className="Approval-denal">
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
                <p className="inputsTitle">{`Information on the project to be invested`}</p>
                <ul className="Esheet">
                    <Select label={`Fund to invest`} name={`Fund_to_invest`} value={Fund_to_invest} placeholder={`select`} value1={`Fund_to_invest-1`} value2={`Fund_to_invest-2`} value3={`Fund_to_invest-3`} value4={`Fund_to_invest-4`} hideValue5={`dn`} onChange={onChange} />
                    <Input label={`Investment objective`} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                    <Select label={`Country`} name={`Country1`} value={Country1} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                    <Select label={`City`} name={`City1`} value={City1} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                </ul>
                <ul className="Esheet"> 
                    <Input label={`Investment amount`} type={`text`} name={`Investment_amount`} value={Investment_amount} placeholder={`$`} onChange={onChange} />
                  </ul>
            </div>
            <div className="inputs-part">
                <p className="inputsTitle">{`Investor information`}</p>
                <ul className="Esheet">
                    <Select label={`Date of request`} name={`Date_of_request`} value={Date_of_request} placeholder={`select`} value1={`Date_of_request-1`} value2={`Date_of_request-2`} value3={`Date_of_request-3`} value4={`Date_of_request-4`} hideValue5={`dn`} onChange={onChange} />
                    <Input label={`Investor's first and last names`} type={`text`} name={`Investors_first_and_last_names`} value={Investors_first_and_last_names} placeholder={`Enter`} onChange={onChange} />
                    <Select label={`Type of document`} name={`Type_of_document`} value={Type_of_document} placeholder={`select`} value1={`Document_type-1`} value2={`Document_type-2`} value3={`Document_type-3`} value4={`Document_type-4`} hideValue5={`dn`} onChange={onChange} />
                    <Input label={`Document`} type={`text`} name={`Document`} value={Document} placeholder={`Enter`} onChange={onChange} />
                </ul>
                <ul className="Esheet"> 
                    <Select label={`Country`} name={`Country2`} value={Country2} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                    <Select label={`City`} name={`City2`} value={City2} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                </ul>
            </div>
            <div className="inputs-part">
              <p className="inputsTitle">{`Contract qualification`}</p>
              <div className="analsis-state">
                  <RatingBtn text={language.deuda_leasing.aproval_aproved} bg={`#69b644`} smallbg={'#ffffff'} color={'#ffffff'} border={''} />
                  <RatingBtn text={language.deuda_leasing.aproval_postpone} bg={`#ffffff`} smallbg={'var(--primary-color)'} color={'#var(--text-dark)'} border={'1px solid var(--primary-color)'} />
                  <RatingBtn text={language.deuda_leasing.aproval_reject} bg={`#ffffff`} smallbg={'var(--secondary-color)'} color={'#var(--text-dark)'} border={'1px solid var(--secondary-color)'} />
              </div>
              <ul className="Esheet">
                  <Input label={language.deuda_leasing.aproval_date} type={`text`} name={`Approval_date`} value={Approval_date} placeholder={`MM/DD/YYYY`} onChange={onChange} />
                  <Input label={language.deuda_leasing.aproval_numbercertifi} type={`text`} name={`Number_of_certificate`} value={Number_of_certificate} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.deuda_leasing.aproval_numberagree} type={`text`} name={`Number_agreement`} value={Number_agreement} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.deuda_leasing.aproval_totalamount} type={`text`} name={`Total_amount`} value={Total_amount} placeholder={`Enter`} onChange={onChange} />
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

export default ApprovalDenalInvestor