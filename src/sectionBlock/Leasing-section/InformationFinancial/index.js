import React, {useReducer} from 'react';
import './IF.css';
import {Button} from '../../../component/buttons';
import {Input, Select, Checkbox, FinancialHead} from '../Leasing-Component';
const initialState = {
  Code: '',
  Name_of_credit_line:'',
  Capacity_required: '',
  Charges_for_arrears: '',
  Modify_parameter: '',
  Active: '',
  Collect_balance: '',
  Grace: '',
  Warranty_required: '',
  Outstanding_installments: '',
  Calendar: '',
  Way: '',
  Settlement_type: '',
  Collection_of_arrears_about: '',
  Source: '',
  Amortization_type: '',
  Type_of: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}

const InformationFinancial = ({language}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const { Code, Name_of_credit_line, Capacity_required, Charges_for_arrears, Modify_parameter, Active, Collect_balance, Grace, Warranty_required, Outstanding_installments, Calendar, Way, Settlement_type, Collection_of_arrears_about, Source, Amortization_type, Type_of } = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  return (
    <div className="Information-financial">
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="first">
            <FinancialHead text={`Parameterization of financial information debt contract `} btntext={`Add Parameter`} hideBtn={`dn`} />
            <ul>
                <Input label={`Code`} type={`text`} name={`Code`} value={Code} placeholder={`Automátic`} onChange={onChange} />
                <Input label={`Name of credit line`} type={`text`} name={`Name_of_credit_line`} value={Name_of_credit_line} placeholder={`Enter`} onChange={onChange} />
            </ul>
          </div>
          <div className="second">
            <div className="second-first">
              <div>
                <ul>
                  <Checkbox label={`Capacity required`} name={`Capacity_required`} value={Capacity_required} onChange={onChange} />
                  <Checkbox label={`Charges for arrears`} name={`Charges_for_arrears`} value={Charges_for_arrears} onChange={onChange} />
                </ul>
                <ul>
                  <Checkbox label={`Modify parameter`} name={`Modify_parameter`} value={Modify_parameter} onChange={onChange} />
                  <Checkbox label={`Active`} name={`Active`} value={Active} onChange={onChange} />
                </ul>
                <ul>
                  <Checkbox label={`Collect balance`} name={`Collect_balance`} value={Collect_balance} onChange={onChange} />
                  <Checkbox label={`Grace`} name={`Grace`} value={Grace} onChange={onChange} />
                </ul>
              </div>
              <div>
                <ul>
                  <Select label={`Warranty required`} name={`Warranty_required`} value={Warranty_required} placeholder={`Select`} onChange={onChange} value1={`Warrenty-1`} value2={`Warrenty-2`} value3={`Warrenty-3`} value4={`Warrenty-4`} hideValue5={`dn`}/>
                  <Input label={`Outstanding installments`} type={`text`} name={`Outstanding_installments`} value={Outstanding_installments} placeholder={`Enter`} onChange={onChange} />
                </ul>
                <ul>
                  <Select label={`Calendar`} name={`Calendar`} value={Calendar} placeholder={`Select`} onChange={onChange} value1={`Calendar-1`} value2={`Calendar-2`} value3={`Calendar-3`} hideValue4={`dn`} hideValue5={`dn`}/>
                  <Select label={`Way`} name={`Way`} value={Way} placeholder={`Select`} onChange={onChange} value1={`Way-1`} value2={`Way-2`} value3={`Way-3`} value4={`Way-4`} hideValue5={`dn`}/>
                </ul>
              </div>
            </div>
            <div className="second-second">
              <ul>
                  <Select label={`Settlement type`} name={`Settlement_type`} value={Settlement_type} placeholder={`Select`} onChange={onChange} value1={`Settlement_type-1`} value2={`Settlement_type-2`} value3={`Settlement_type-3`} value4={`Settlement_type-4`} hideValue5={`dn`}/>
                  <Select label={`Collection of arrears about`} name={`Collection_of_arrears_about`} value={Collection_of_arrears_about} placeholder={`Select`} onChange={onChange} value1={`Collection_of_arrears_about-1`} value2={`Collection_of_arrears_about-2`} value3={`Collection_of_arrears_about-3`} value4={`Collection_of_arrears_about-4`} hideValue5={`dn`}/>
                  <Select label={`Source`} name={`Source`} value={Source} placeholder={`Select`} onChange={onChange} value1={`Source-1`} value2={`Source-2`} value3={`Source-3`} value4={`Source-4`} hideValue5={`dn`}/>
              </ul>
              <ul>
                  <Select label={`Amortization type`} name={`Amortization_type`} value={Amortization_type} placeholder={`Select`} onChange={onChange} value1={`Amortization_type-1`} value2={`Amortization_type-2`} value3={`Amortization_type-3`} value4={`Amortization_type-4`} hideValue5={`dn`}/>
              </ul>
              <ul>
                  <Select label={`Type of`} name={`Type_of`} value={Type_of} placeholder={`No grace`} onChange={onChange} value1={`Type_of-1`} value2={`Type_of-2`} value3={`Type_of-3`} value4={`Type_of-4`} hideValue5={`dn`}/>
              </ul>
            </div>
          </div>
          <div className="third">
            <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
          </div>
        </form>
    </div>
  )
}

export default InformationFinancial;