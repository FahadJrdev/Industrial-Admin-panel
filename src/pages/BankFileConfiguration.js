import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import Tab from '../component/tab';
import {BankConfigTable} from '../component/table';
import {BankConfigInfo} from '../data/InvestorInfo';
import BankAccountInput from '../sectionBlock/BankAccountInput';
import GeneralInfoSearch from '../sectionBlock/General-info-search';
import PayOffice from '../sectionBlock/Pay-Office';
import './pageStyle.css';

const BankFileConfiguration = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [isNavigate, setNavigate] = useState(false);
    const [tabName, setTabName] = useState('Account configuration');
    const [search, setSearch] = useState ("no");
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
      <div className="BankFileConfiguration">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Bank File Configuration`} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main bankfileconfig"> 
              <Tab action={setTabName} tab1={`Account configuration`} tab2={`Pay office`} tab3={`Others`} hideTab4={`dn`} tabs1={`Account configuration`} tabs2={`Pay office`} tabs3={`Others`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} />
              {
                tabName === 'Account configuration'
                ?<>
                    <BankAccountInput language={language} setSearch={setSearch} />
                    {
                      search === 'yes'
                      ?<GeneralInfoSearch language={language} title={`Search results`} />
                      :<>
                        <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} inactive={`inactive`} hideCustomizer={`flex`} />
                        <BankConfigTable header1={`Account code`}  header2={`Country`}  header3={`Names and surnames`}  header4={`Identity`} header5={`Actions`} data={BankConfigInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                      </>
                    }
                </>
                :<></>
              }
              {
                tabName === 'Pay office'
                ?<PayOffice language={language} />
                :<></>
              }
              {
                tabName === 'Others'
                ?<></>
                :<></>
              }
        </main>
      </div>
    </>
  )
}

export default BankFileConfiguration;