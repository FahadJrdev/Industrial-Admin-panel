import React, {useState} from 'react';
import {FinancialHead, LeasingTable} from '../Leasing-Component';
import NewWar from '../New-Warrenty';
import {LeasingInfo6} from '../Leasing-Component/LeasingInfo';

const WarrentyCredit = ({language}) => {
    const [attemptToAddNewWar, setAttemptToNewWar] = useState('close');
    setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
        backButton.addEventListener('click',()=>{
            setAttemptToNewWar('close');
        })
    }
    const addingParamrOverlay = document.querySelector('.adding-investor-overlay');
    if(addingParamrOverlay){
        addingParamrOverlay.addEventListener('click',()=>{
            setAttemptToNewWar('close');
        })
    }
    const addParam = document.querySelector('.WarrentyCredit .financial-head button');
    if(addParam){
        addParam.addEventListener('click',()=>{
            setAttemptToNewWar('open');
        })
    }
    })
  return (
    <>
        {
            attemptToAddNewWar === `open`
            ?<NewWar title={`New Documents Warranty`} language={language} />
            :<></>
        }
        <div className='WarrentyCredit'>
            <FinancialHead text={`Management of credit warranties`} btntext={`Create document`}/>
            <LeasingTable title={`Documents warranties`} LeasingInfo={LeasingInfo6} language={language} />
        </div>
    </>
  )
}

export default WarrentyCredit;