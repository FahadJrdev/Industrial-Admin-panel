import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import Tab from '../component/tab';
import {BankConfigTable} from '../component/table';
import {BankAccountInput} from '../sectionBlock/BankAccountInput';
import GeneralInfoSearch from '../sectionBlock/General-info-search';
import PayOffice from '../sectionBlock/Pay-Office';
import ConfigurationSettings from '../sectionBlock/Configuration-setting';
import './pageStyle.css';
import axios from "../api/axios.js";

const BankFileConfiguration = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allBank, setBankAll] = useState([]);
    const [allfilebank, setBankFile] = useState([]);
    const [idInfo, setIdInfo] = useState("");
    const navigate = useNavigate();
    const [isNavigate, setNavigate] = useState(false);
    const [one] = useState(true);
    const [tabName, setTabName] = useState('Account configuration');
    const [search, setSearch] = useState ("no");
    const callBankFileConfigAll =()=>{
      let bearerToken={
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      }
          axios.get("/bankfileconfiguration", {},bearerToken)
          .then((response) => {
            if(response.status===200){
              setBankAll(response.data)
            }else{
              setBankAll([])
            }
          }).catch((err)=>{
              
            setBankAll([])
          })
    }
    
    const callConfigArchivo =()=>{
      let bearerToken={
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      }
          axios.get("/plantillaconfigbanck", {},bearerToken)
          .then((response) => {
            if(response.status===200){
              setBankFile(response.data)
            }else{
              setBankFile([])
            }
          }).catch((err)=>{
              
            setBankFile([])
          })
    }
    useEffect(()=>{
      callConfigArchivo()
      callBankFileConfigAll()
    },[one])
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
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.bankfile_config.title} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main bankfileconfig"> 
              <Tab action={setTabName} tab1={`Account configuration`} tab2={`Pay office`} tab3={`Configuration setting`} hideTab4={`dn`} tabs1={language.bankfile_config.tab1}  tabs2={language.bankfile_config.tab2}  tabs3={language.bankfile_config.tab3}  hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} />
              {
                tabName === 'Account configuration'
                ?<>
                    <BankAccountInput language={language} setSearch={setSearch} array={allBank} funcion={setIdInfo} />
                    {
                      search === 'yes'
                      ?<GeneralInfoSearch language={language} title={language.bankfile_config.searchresult} IDS={idInfo}   />
                      :<>
                        <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} inactive={`inactive`} hideCustomizer={`flex`} />
                        <BankConfigTable header1={language.bankfile_config.header1}   header2={language.bankfile_config.header2}   header3={language.bankfile_config.header3}   header4={language.bankfile_config.header4}  header5={language.bankfile_config.header5}  data={allBank} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
                tabName === 'Configuration setting'
                ?<ConfigurationSettings language={language} allfilebanks={allfilebank} />
                :<></>
              }
        </main>
      </div>
    </>
  )
}

export default BankFileConfiguration;