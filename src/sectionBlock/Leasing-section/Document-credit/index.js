import React, {useState} from 'react';
import {FinancialHead, LeasingTable} from '../Leasing-Component';
import NewDoc from '../New-Doc';
import {LeasingInfo5} from '../Leasing-Component/LeasingInfo';

const DocumentCredit = ({language}) => {
    const [attemptToAddNewDoc, setAttemptToNewDoc] = useState('close');
    setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
        backButton.addEventListener('click',()=>{
            setAttemptToNewDoc('close');
        })
    }
    const addingParamrOverlay = document.querySelector('.adding-investor-overlay');
    if(addingParamrOverlay){
        addingParamrOverlay.addEventListener('click',()=>{
            setAttemptToNewDoc('close');
        })
    }
    const addParam = document.querySelector('.DocumentCredit .financial-head button');
    if(addParam){
        addParam.addEventListener('click',()=>{
            setAttemptToNewDoc('open');
        })
    }
    })
  return (
    <>
        {
            attemptToAddNewDoc === `open`
            ?<NewDoc title={`New Document`} language={language} />
            :<></>
        }
        <div className='DocumentCredit'>
            <FinancialHead text={`Gestión documentos de crédito`} btntext={`Create document`}/>
            <LeasingTable title={`Required Documents`} LeasingInfo={LeasingInfo5} language={language} />
        </div>
    </>
  )
}

export default DocumentCredit;