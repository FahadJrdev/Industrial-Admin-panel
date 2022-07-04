import React, {useState, useReducer} from 'react';
import './SC.css';
import { FinancialHead, LeasingTable, Input, Select } from '../Leasing-Component';
import SubTab from '../../../component/tab/subTab';
import {Searchbox} from '../../../component/searchbox';
import {LeasingInfo1, LeasingInfo2} from '../Leasing-Component/LeasingInfo';
import {Button} from '../../../component/buttons';
import LeasingParameter from '../Leasing-Parameter';

const ScoringContract = ({language}) => {
  const initialState = {
    Valid_from: '',
    Until: '',
    Acceptance_score: '',
    Customer: ''
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
  const { Valid_from, Until, Acceptance_score, Customer } = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  const [subTab,setSubTab] = useState('Scoring base data');
  const [attemptToAddParameter, setAttemptToAddParameter] = useState('close');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToAddParameter('close');
      })
    }
    const addingParamrOverlay = document.querySelector('.adding-investor-overlay');
    if(addingParamrOverlay){
      addingParamrOverlay.addEventListener('click',()=>{
        setAttemptToAddParameter('close');
      })
    }
    const addParam = document.querySelector('.financial-head button');
    if(addParam){
      addParam.addEventListener('click',()=>{
        setAttemptToAddParameter('open');
      })
    }
  })
  return (
    <>
      {
        attemptToAddParameter === `open`
        ?<LeasingParameter title={`Add parameter`} language={language} />
        :<></>
      }

      <div className="Scoring-contract">
        <FinancialHead text={`Debt contract scoring parameterization `} btntext={`Add Parameter`} />
        <SubTab action={setSubTab} subtab1={`Scoring base data`} subtab2={`Evaluation sheets`} subtabs1={`Scoring base data`} subtabs2={`Evaluation sheets`} subhideTab3={`dn`} subhideTab4={`dn`} subhideTab5={`dn`} subhideTab6={`dn`} subhideTab7={`dn`} subhideCustomizer={`dn`} />
        
        {
          subTab === 'Scoring base data'
          ?<>
            <div className="search">
              <Searchbox />
            </div>
            <LeasingTable title={`Basic Concepts of Calculations`} LeasingInfo={LeasingInfo1} language={language} />
          </>
          :<></>
        }
        {
          subTab === 'Evaluation sheets'
          ?<>
            <form action="" method="post" onSubmit={handleSubmit}>
              <ul className="Esheet">
                <Input label={`Valid from`} type={`text`} name={`Valid_from`} value={Valid_from} placeholder={`Enter Date`} onChange={onChange} />
                <Input label={`Until`} type={`text`} name={`Until`} value={Until} placeholder={`Enter Date`} onChange={onChange} />
                <Input label={`Acceptance score`} type={`text`} name={`Acceptance_score`} value={Acceptance_score} placeholder={`Enter`} onChange={onChange} />
                <Select label={`Customer`} name={`Customer`} value={Customer} placeholder={`Select`} onChange={onChange} value1={`Customer-1`} value2={`Customer-2`} value3={`Customer-3`} value4={`Customer-4`} hideValue5={`dn`}/>
              </ul>
              <div className="Esheet-submit">
                <Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
              </div>
            </form>
            <LeasingTable title={`Parameters`} LeasingInfo={LeasingInfo2} language={language} />
          </>
          :<></>
        }
      </div>
    </>
  )
}

export default ScoringContract;