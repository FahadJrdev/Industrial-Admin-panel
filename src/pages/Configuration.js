import React, {useEffect, useState} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import Tab from '../component/tab';
import FundManagement from '../sectionBlock/Fund-Management';
import CreateFund from '../sectionBlock/Create-fund';
import Assign from '../sectionBlock/Assign';

const Configuration = ({lang, setLang, language, responsive}) => {
  const [attemptToCreateFund, setAttemptToCreateFund] = useState('close');
  const [assign, setAssign] = useState('off');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToCreateFund('close');
        setAssign('off');
      })
    }
    const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
    if(addingInvestorOverlay){
      addingInvestorOverlay.addEventListener('click',()=>{
        setAttemptToCreateFund('close');
        setAssign('off');
      })
    }
    const addInvestor = document.querySelectorAll('.configure .management button');
    if(addInvestor[0]){
      addInvestor[0].addEventListener('click',()=>{
        setAttemptToCreateFund('open');
      })
    }
    if(addInvestor[1]){
      addInvestor[1].addEventListener('click',()=>{
        setAssign('on');
      })
    }
  })
  const [tabName, setTabName] = useState('');
  useEffect(()=>{ 
    const configure1 = document.querySelector('.configuration .tab1');
    configure1.addEventListener('click',()=>{
      setTabName('');
    })
    const configure2 = document.querySelector('.configuration .tab2');
    configure2.addEventListener('click',()=>{
      setTabName('');
    })
    const configure3 = document.querySelector('.configuration .tab3');
    configure3.addEventListener('click',()=>{
      setTabName('');
    })
    const configure4 = document.querySelector('.configuration .tab4');
    configure4.addEventListener('click',()=>{
      setTabName('Fund management');
    })
  },[]);
  return (
    <>
      {
        attemptToCreateFund === 'open'
        ?<CreateFund title={language.funds.create_fund} language={language} />
        :<></>
      }
      {
        assign === 'on'
        ?<Assign title={language.funds.assign} language={language} />
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.configurate.title} pageDesc ={language.configurate.desc} displaySearch={`show`} />
      <main className='main configuration'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={[language.configurate.numberuser]} text={`300`} />
          <InvestorCard key={2} color={`secondary-color`}  title={[language.configurate.newuser]} text={`20`} />
          <InvestorCard key={3} color={`tartiary-color`}  title={language.configurate.storage} text={`40%`} />
        </div>
        <div className="configure">
          <Tab tab1={`Configuration and security`} tab2={`Users`} tab3={`Contract management`} tab4={`Fund management`} tabs1={language.configurate.tabs1} tabs2={language.configurate.tabs2} tabs3={language.configurate.tabs3} tabs4={language.configurate.tabs4} hideTab5={`dn`} hideCustomizer={`dn`} />
            {
              tabName === 'Fund management'
              ? <FundManagement language={language}/>
              :<></>
            }
        </div>
      </main>
    </>
  )
}

export default Configuration;