import React, {useReducer} from 'react';
import {FinancialHead, Input, Textarea, LeasingTable} from '../Leasing-Component';
import './II.css';
import {Button} from '../../../component/buttons';
import {LeasingInfo7, LeasingInfo8} from '.././Leasing-Component/LeasingInfo';

const InfoInsurance = ({language}) => {
  const initialState = {
    Branch: '',
    From:'',
    Until: '',
    Value: '',
    Policy: '',
    Company1: '',
    Name1: '',
    Insured_value: '',
    Company2: '',
    Name2: '',
    Premium_value: '',
    Value_of_travel_assistance: '',
    Commission: '',
    VAT: '',
    Interest_insured: ''
  }

  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const { Branch, From, Until, Value, Policy, Company1, Name1, Insured_value, Company2, Name2, Premium_value, Value_of_travel_assistance, Commission, VAT, Interest_insured } = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  return (
    <div className="InfoInsurance">
        <FinancialHead text={`Insurance information management `} hideBtn={`dn`} />
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="Insurance-body">
                <div className="insurance-main">
                  <div className="insurance-first">
                    <div className="I-f-first">
                      <p>Validity</p>
                      <ul>
                        <Input label={`Branch`} type={`text`} name={`Branch`} value={Branch} placeholder={`AUTOMOBILES`} onChange={onChange} />
                        <Input label={`From`} type={`text`} name={`From`} value={From} placeholder={`MM/DD/YYYY`} onChange={onChange} />
                      </ul>
                    </div>
                    <div className="I-f-first">
                      <p>Attribute</p>
                      <ul>
                        <Input label={`Until`} type={`text`} name={`Until`} value={Until} placeholder={`MM/DD/YYYY`} onChange={onChange} />
                        <Input label={`Value`} type={`text`} name={`Value`} value={Value} placeholder={`Enter`} onChange={onChange} />
                      </ul>
                    </div>
                  </div>
                  <p>Insurance information</p>
                  <div className="insurance-second">
                    <div className="insurance-input">
                      <ul>
                        <Input label={`Policy`} type={`text`} name={`Policy`} value={Policy} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Company`} type={`text`} name={`Company1`} value={Company1} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Name`} type={`text`} name={`Name1`} value={Name1} placeholder={`Enter`} onChange={onChange} />
                      </ul>
                      <ul>
                        <Input label={`Insured value`} type={`text`} name={`Insured_value`} value={Insured_value} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Company`} type={`text`} name={`Company2`} value={Company2} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Name`} type={`text`} name={`Name2`} value={Name2} placeholder={`Enter`} onChange={onChange} />
                      </ul>
                      <ul>
                        <Input label={`Premium value`} type={`text`} name={`Premium_value`} value={Premium_value} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Value of travel assistance`} type={`text`} name={`Value_of_travel_assistance`} value={Value_of_travel_assistance} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`Commission`} type={`text`} name={`Commission`} value={Commission} placeholder={`Enter`} onChange={onChange} />
                        <Input label={`VAT`} type={`text`} name={`VAT`} value={VAT} placeholder={`Enter`} onChange={onChange} />
                      </ul>
                    </div>
                    <div className="insurance-textarea">
                      <Textarea label={`Interest insured`} name={`Interest_insured`} value={Interest_insured} placeholder={`Description`} onChange={onChange} rows={11} cols={20} />
                    </div>
                  </div>
                </div>
                <div className="insurance-submit">
                  <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
                </div>
            </div>
        </form>
        <LeasingTable title={`Conditions`} LeasingInfo={LeasingInfo7} language={language} />
        <LeasingTable title={`Conditions`} LeasingInfo={LeasingInfo8} language={language} />

    </div>
  )
}

export default InfoInsurance;