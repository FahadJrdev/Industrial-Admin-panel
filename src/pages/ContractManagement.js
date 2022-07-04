import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import Tab from '../component/tab';
import {ContractManagementTable} from '../component/table';
import {ContractManagementLeasingInfo, ContractManagementProjectInfo, ContractManagementInvestorInfo} from '../data/InvestorInfo';
import './pageStyle.css';

const ContractManagement = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [isNavigate, setNavigate] = useState(false);
    const [tabName, setTabName] = useState('Debt contracts leasing');
    useEffect(()=>{
        const backButton = document.querySelector('.first-part .buttonwitharrow');
        if(backButton){
          backButton.addEventListener('click',() => {
            setNavigate(!isNavigate);
          });
          if(isNavigate){
            navigate(-1);
          }
        }
      },[isNavigate,navigate]);
  return (
    <>
      <div className="ContractManagement">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Contract Management`} pageDesc={`Administration `} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main ContractManagement"> 
              <Tab action={setTabName} tab1={`Debt contracts leasing`} tab2={`Investment contracts to projects`} tab3={`Investment contracts to investor`} hideTab4={`dn`} tabs1={`Debt contracts leasing`} tabs2={`Investment contracts to projects`} tabs3={`Investment contracts to investor`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} />
              {
                tabName === 'Debt contracts leasing'
                ?<>
                    <ContractManagementTable header1={`Filing`}  header2={`Date of request`}  header3={`Debtor's name and surname`}  header4={`State`} header5={`Actions`} data={ContractManagementLeasingInfo} link={`/Leasing`} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
                :<></>
              }
              {
                tabName === 'Investment contracts to projects'
                ?<>
                    <ContractManagementTable header1={`Code`}  header2={`Date of filing`}  header3={`Names and surnames responsible`}  header4={`State`} header5={`Actions`} data={ContractManagementProjectInfo} link={`/ManageProject`} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
                :<></>
              }
              {
                tabName === 'Investment contracts to investor'
                ?<>
                  <ContractManagementTable header1={`Code`}  header2={`Date of filing`}  header3={`Names and surnames responsible`}  header4={`State`} header5={`Actions`} data={ContractManagementInvestorInfo} link={`/ManageInvestor`} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
                :<></>
              }
        </main>
      </div>
    </>
  )
}

export default ContractManagement;