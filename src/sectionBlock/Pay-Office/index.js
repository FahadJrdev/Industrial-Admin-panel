import React, {useReducer} from 'react';
import { Input, Select,Textarea } from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import './PO.css';

const initialState = {
  Code: '',
  Pay_office_status: '',
  Company: '',
  Name: '',
  Total_amount: '',
  Country: '',
  City: '',
  Telephone: '',
  Responsible: '',
  Company_pay_office_code: '',
  Reference1: '',
  Reference2: '',
  Description: ''
}
function reducer(state, { field, value }) {
  return {
      ...state,
      [field]: value
  }
}

const PayOffice = ({language}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const { Code, Pay_office_status, Company, Name, Country, City, Telephone, Responsible, Company_pay_office_code, Reference1, Reference2, Description} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  return (
    <>
      <div className="Approval-denal pay-office">
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
              <ul className="Esheet">
                  <Input label={`Code`} type={`text`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                  <Input label={`Pay office status`} type={`text`} name={`Pay_office_status`} value={Pay_office_status} placeholder={`Enter`} onChange={onChange} />
                  <Input label={`Company`} type={`text`} name={`Company`} value={Company} placeholder={`Enter`} onChange={onChange} />
                  <Input label={`Name`} type={`text`} name={`Name`} value={Name} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Select label={`Country`} name={`Country`} value={Country} placeholder={`select`} value1={`Country-1`} value2={`Country-2`} value3={`Country-3`} value4={`Country-4`} hideValue5={`dn`} onChange={onChange} />
                  <Select label={`City`} name={`City`} value={City} placeholder={`select`} value1={`City-1`} value2={`City-2`} value3={`City-3`} value4={`City-4`} hideValue5={`dn`} onChange={onChange} />
                  <Input label={`Telephone`} type={`text`} name={`Telephone`} value={Telephone} placeholder={`Enter`} onChange={onChange} />
                  <Input label={`Responsible`} type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Input label={`Company pay office code`} type={`text`} name={`Company_pay_office_code`} value={Company_pay_office_code} placeholder={`Enter`} onChange={onChange} />
                  <Input label={`Reference 1`} type={`text`} name={`Reference1`} value={Reference1} placeholder={`Enter`} onChange={onChange} />
                  <Input label={`Reference 2`} type={`text`} name={`Reference2`} value={Reference2} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Textarea label={`Description`} name={`Description`} value={Description} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
              </ul>
            </div>
            <div className="Esheet-submit">
                <Button text={`Manage pay office`}  background={`var(--primary-color)`} types={`submit`}/>
            </div>
        </form>
      </div>
    </>
  )
}

export default PayOffice;