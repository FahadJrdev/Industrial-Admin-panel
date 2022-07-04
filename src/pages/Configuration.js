import React, {useEffect, useState} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import Tab from '../component/tab';
import FundManagement from '../sectionBlock/Fund-Management';
import CreateFund from '../sectionBlock/Create-fund';
import Assign from '../sectionBlock/Assign';
import GeneralTab from '../sectionBlock/ConfigTab';

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
  const [responsiveTab, setResponsiveTab] = useState("");
  setTimeout(()=>{
    const backResponsiveButton = document.querySelector('.responsiveConfigDetail .first-part .buttonwitharrow');
    if(backResponsiveButton){
      backResponsiveButton.addEventListener('click',() => {
        setResponsiveTab("");
      });
    }
  })
  useEffect(()=>{ 
    const configure1 = document.querySelector('.responsiveConfigDetail .configuration .tab1');
    if(configure1){
      configure1.addEventListener('click',()=>{
        setResponsiveTab('Configuration and security');
      })
    }
    const configure2 = document.querySelector('.responsiveConfigDetail .configuration .tab2');
    if(configure2){
      configure2.addEventListener('click',()=>{
        setResponsiveTab('Users');
      })
    }
    const configure3 = document.querySelector('.responsiveConfigDetail .configuration .tab3');
    if(configure3){
      configure3.addEventListener('click',()=>{
        setResponsiveTab('Contract management');
      })
    }
    const configure4 = document.querySelector('.responsiveConfigDetail .configuration .tab4');
    if(configure4){
      configure4.addEventListener('click',()=>{
        setResponsiveTab('Fund management');
      })
    }
  },[responsiveTab]);
  const [tabName, setTabName] = useState('Configuration and security');
  useEffect(()=>{ 
    const configure1 = document.querySelector('.configuration .tab1');
    if(configure1){
      configure1.addEventListener('click',()=>{
        setTabName('Configuration and security');
      })
    }
    const configure2 = document.querySelector('.configuration .tab2');
    if(configure2){
      configure2.addEventListener('click',()=>{
        setTabName('Users');
      })
    }
    const configure3 = document.querySelector('.configuration .tab3');
    if(configure3){
      configure3.addEventListener('click',()=>{
        setTabName('Contract management');
      })
    }
    const configure4 = document.querySelector('.configuration .tab4');
    if(configure4){
      configure4.addEventListener('click',()=>{
        setTabName('Fund management');
      })
    }
  },[tabName]);
  
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
      {
        responsive.responsiveID
        ?<>
          <div className="responsiveConfigDetail">
            {
              responsiveTab === ''
              ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.configurate.title} pageDesc ={language.configurate.desc} displaySearch={`show`} />
              <main className='main configuration'>
                <div className="cards grid-container">   
                  <InvestorCard key={1} color={`primary-color`}  title={[language.configurate.numberuser]} text={`300`} />
                  <InvestorCard key={2} color={`secondary-color`}  title={[language.configurate.newuser]} text={`20`} />
                  <InvestorCard key={3} color={`tartiary-color`}  title={language.configurate.storage} text={`40%`} />
                </div>
                <div className="configure">
                  <Tab action={setResponsiveTab} tab1={`Configuration and security`} tab2={`Users`} tab3={`Contract management`} tab4={`Fund management`} tabs1={language.configurate.tabs1} tabs2={language.configurate.tabs2} tabs3={language.configurate.tabs3} tabs4={language.configurate.tabs4} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} />
                </div>
              </main>
            </>
              :<></>
            }
            {
              responsiveTab === 'Configuration and security'
              ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Configuration and security`} displayArrowBtn={`show`} />
              <main className='main configuration'>
                <div className="configure">
                  <GeneralTab itemClass={`gtab1`} item1={language.configurate.tab1_generalparam} item2={language.configurate.tab1_keymanagamen} item3={language.configurate.tab1_bankfile} item4={language.configurate.tab1_accestofunctionaliti}  item5={language.configurate.tab1_auditweblog} link1={`#`} link2={`#`} link3={`/BankFileConfiguration`} link4={`#`} link5={`#`} />    
                </div>
              </main>
            </>
              :<></>
            }
            {
              responsiveTab === 'Users'
              ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Users`} displayArrowBtn={`show`} />
              <main className='main configuration'>
                <div className="configure">
                  <GeneralTab itemClass={`gtab2`} item1={language.configurate.tab2_bancendUser} item2={language.configurate.tab2_UserProfile} item3={language.configurate.tab2_Parametrization} hideItem4={`dn`} hideItem5={`dn`} link1={`#`} link2={`#`} link3={`#`} link4={`#`} link5={`#`} />    
                </div>
              </main>
            </>
              :<></>
            }
            {
              responsiveTab === 'Contract management'
              ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Contract management`} displayArrowBtn={`show`} />
              <main className='main configuration'>
                <div className="configure">
                  <GeneralTab itemClass={`gtab3`} item1={language.configurate.tab3_ContractManagament} item2={language.configurate.tab3_managementdebt}  item3={language.configurate.tab3_contratproject} item4={language.configurate.tab3_investmentcontract} item5={language.configurate.tab3_debtcontractcollection} link1={`#`} link2={`/Leasing`} link3={`/ManageProject`} link4={`/ManageInvestor`} link5={`#`} />    
                </div>
              </main>
            </>
              :<></>
            }
            {
              responsiveTab === 'Fund management'
              ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Fund management`} displayArrowBtn={`show`} />
              <main className='main configuration'>
                <div className="configure">
                   <FundManagement language={language}/>    
                </div>
              </main>
            </>
              :<></>
            }
          </div>
        </>
      :<>
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.configurate.title} pageDesc ={language.configurate.desc} displaySearch={`show`} />
        <main className='main configuration newConfig'>
          <div className="cards grid-container">   
            <InvestorCard key={1} color={`primary-color`}  title={[language.configurate.numberuser]} text={`300`} />
            <InvestorCard key={2} color={`secondary-color`}  title={[language.configurate.newuser]} text={`20`} />
            <InvestorCard key={3} color={`tartiary-color`}  title={language.configurate.storage} text={`40%`} />
          </div>
          <div className="configure">
            <Tab action={setTabName} tab1={`Configuration and security`} tab2={`Users`} tab3={`Contract management`} tab4={`Fund management`} tabs1={language.configurate.tabs1} tabs2={language.configurate.tabs2} tabs3={language.configurate.tabs3} tabs4={language.configurate.tabs4} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} />
              {
                tabName === 'Configuration and security'
                ?<GeneralTab itemClass={`gtab1`} item1={language.configurate.tab1_generalparam} item2={language.configurate.tab1_keymanagamen} item3={language.configurate.tab1_bankfile} item4={language.configurate.tab1_accestofunctionaliti}  item5={language.configurate.tab1_auditweblog} link1={`#`} link2={`#`} link3={`/BankFileConfiguration`} link4={`#`} link5={`#`} />
                :<></>
              }
              {
                tabName === 'Users'
                ?<GeneralTab itemClass={`gtab2`} item1={language.configurate.tab2_bancendUser} item2={language.configurate.tab2_UserProfile} item3={language.configurate.tab2_Parametrization} hideItem4={`dn`} hideItem5={`dn`} link1={`#`} link2={`#`} link3={`#`} link4={`#`} link5={`#`} />
                :<></>
              }
              {
                tabName === 'Contract management'
                ?<GeneralTab itemClass={`gtab3`} item1={language.configurate.tab3_ContractManagament} item2={language.configurate.tab3_managementdebt}  item3={language.configurate.tab3_contratproject} item4={language.configurate.tab3_investmentcontract} item5={language.configurate.tab3_debtcontractcollection} link1={`#`} link2={`/Leasing`} link3={`/ManageProject`} link4={`/ManageInvestor`} link5={`#`} />
                :<></>
              }
              {
                tabName === 'Fund management'
                ? <FundManagement language={language}/>
                :<></>
              }
          </div>
        </main>
      </>
      }
    </>
  )
}

export default Configuration;