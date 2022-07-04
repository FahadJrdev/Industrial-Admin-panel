import React, {useReducer} from 'react';
import { Input, Select, ManageProjectTable} from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import {InvestmentInfo} from './InvestmentInfo';

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
    Perioricity: '',
    Start_date: '',
    Form_of_payment: '',
    Number_of_quotas: ''
  }
  
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }

const ContractCreationInvestor = ({ language }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { Fund_to_invest, Investment_objective,  Country1, City1, Investment_amount, Date_of_request, Investors_first_and_last_names, Type_of_document, Document, Country2 , City2, Perioricity, Start_date, Form_of_payment, Number_of_quotas} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( 
        <div className="Contract-creation">
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_invest.information_proejct}</p>
                    <ul className="Esheet">
                        <Select label={language.contract_inver_invest.funt_invest} name={`Fund_to_invest`} value={Fund_to_invest} placeholder={`select`} value1={`Fund_to_invest-1`} value2={`Fund_to_invest-2`} value3={`Fund_to_invest-3`} value4={`Fund_to_invest-4`} hideValue5={`dn`} onChange={onChange} />
                        <Input label={language.contract_inver_invest.inverment_object} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                        <Select label={language.contract_inver_invest.country} name={`Country1`} value={Country1} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                        <Select label={language.contract_inver_invest.city} name={`City1`} value={City1} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                    </ul>
                    <ul className="Esheet"> 
                        <Input label={language.contract_inver_invest.investment_amount} type={`number`} name={`Investment_amount`} value={Investment_amount} placeholder={`$`} onChange={onChange} />
                     </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_invest.investorinfo}</p>
                    <ul className="Esheet">
                        <Input label={language.contract_inver_invest.datereque} type={`date`} name={`Date_of_request`} value={Date_of_request} placeholder={`select`}  onChange={onChange} />
                        <Input label={language.contract_inver_invest.invertorfirstlast} type={`text`} name={`Investors_first_and_last_names`} value={Investors_first_and_last_names} placeholder={`Enter`} onChange={onChange} />
                        <Select label={language.contract_inver_invest.document_type} name={`Type_of_document`} value={Type_of_document} placeholder={`select`} value1={`Document_type-1`} value2={`Document_type-2`} value3={`Document_type-3`} value4={`Document_type-4`} hideValue5={`dn`} onChange={onChange} />
                        <Input label={language.contract_inver_invest.document} type={`text`} name={`Document`} value={Document} placeholder={`Enter`} onChange={onChange} />
                    </ul>
                    <ul className="Esheet"> 
                        <Select label={language.contract_inver_invest.country} name={`Country2`} value={Country2} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                        <Select label={language.contract_inver_invest.city} name={`City2`} value={City2} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                    </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_global.inver_terms}</p>
                    <ul className="Esheet">
                        <Select label={language.contract_global.periocity} name={`Perioricity`} value={Perioricity} placeholder={`select`} value1={`Perioricity-1`} value2={`Perioricity-2`} value3={`Perioricity-3`} value4={`Perioricity-4`} hideValue5={`dn`} onChange={onChange} />
                        <Input label={language.contract_global.start_date} type={`date`} name={`Start_date`} value={Start_date} placeholder={`Enter`} onChange={onChange} />
                        <Input label={language.contract_global.form_payment} type={`text`} name={`Form_of_payment`} value={Form_of_payment} placeholder={`Enter`} onChange={onChange} />
                        <Select label={language.contract_global.number_fee} name={`Number_of_quotas`} value={Number_of_quotas} placeholder={`select`} value1={`Number_of_quotas-1`} value2={`Number_of_quotas-2`} value3={`Number_of_quotas-3`} value4={`Number_of_quotas-4`} hideValue5={`dn`} onChange={onChange} />
                    </ul>
                </div>
                <div className="project-submit">
                    <Button text={language.contract_global.generate} background={`var(--tartiary-color)`} types={`submit`} />
                </div>
            </form>
            <ManageProjectTable header1={language.contract_global.payment_date} header2={`Form of payment`} header3={`Value`} ProjectInfo={InvestmentInfo} />
            <div className="Esheet-submit">
                <Button text={language.contract_global.create_cont} background={`var(--primary-color)`} types={`button`} />
            </div>
        </div>
    )
}

export default ContractCreationInvestor;