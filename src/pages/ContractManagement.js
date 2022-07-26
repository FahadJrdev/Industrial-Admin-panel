import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import Tab from '../component/tab';
import {ContractManagementTable} from '../component/table';
import './pageStyle.css';
import axios from "../api/axios.js";

const ContractManagement = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [currentPage3, setCurrentPage3] = useState(1);
    const navigate = useNavigate();
    const [isNavigate, setNavigate] = useState(false);
    const [one] = useState(false);
    const [Proyecdeu, setProyectDeud] = useState([]);
    const [InversorDeu, setInversorDeud] = useState([]);
    const [LeasinDeud, setLeasingDeud] = useState([]);
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
      const callContractManagamentLeasing =()=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/contractmanagement", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                setLeasingDeud(response.data)
              }else{
                setLeasingDeud([])
              }
            }).catch((err)=>{
              setLeasingDeud([])
            })
      }
      const callContractManagamentInversor =()=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/contractinvInversor", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                console.log(response)
                setInversorDeud(response.data)
              }else{
                setInversorDeud([])
              }
            }).catch((err)=>{
                
              setInversorDeud([])
            })
      }
      const callContractManagamentProyect =()=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/contractinvproject", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                setProyectDeud(response.data)
              }else{
                setProyectDeud([])
              }
            }).catch((err)=>{
                
              setProyectDeud([])
            })
      }
      
      useEffect(()=>{
        callContractManagamentInversor()
        callContractManagamentLeasing()
        callContractManagamentProyect()
      },[one]);
  return (
    <>
      <div className="ContractManagement">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.contractMana.title} pageDesc={language.contractMana.desc} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main ContractManagement"> 
              <Tab action={setTabName} tab1={`Debt contracts leasing`} tab2={`Investment contracts to projects`} tab3={`Investment contracts to investor`} hideTab4={`dn`} tabs1={language.contractMana.tab1} tabs2={language.contractMana.tab2} tabs3={language.contractMana.tab3} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} />
              {
                tabName === 'Debt contracts leasing'
                ?<>
                    <ContractManagementTable header1={language.contractMana.tab1header1}  header2={language.contractMana.tab1header2} header3={language.contractMana.tab1header3} header4={language.contractMana.tab1header4} header5={language.contractMana.tab1header5} data={LeasinDeud} link={`/Leasing`} currentPage={currentPage} setCurrentPage={setCurrentPage} opcion={"1"} />
                </>
                :<></>
              }
              {
                tabName === 'Investment contracts to projects'
                ?<>
                    <ContractManagementTable header1={language.contractMana.tab2_3header1}  header2={language.contractMana.tab2_3header2}  header3={language.contractMana.tab2_3header3}  header4={language.contractMana.tab2_3header4} header5={language.contractMana.tab2_3header5} data={Proyecdeu} link={`/ManageProject`} currentPage={currentPage2} setCurrentPage={setCurrentPage2}  opcion={"2"} />
                </>
                :<></>
              }
              {
                tabName === 'Investment contracts to investor'
                ?<>
                  <ContractManagementTable header1={language.contractMana.tab2_3header1}  header2={language.contractMana.tab2_3header2}  header3={language.contractMana.tab2_3header3}  header4={language.contractMana.tab2_3header4} header5={language.contractMana.tab2_3header5} data={InversorDeu} link={`/ManageInvestor`} currentPage={currentPage3} setCurrentPage={setCurrentPage3} />
                </>
                :<></>
              }
        </main>
      </div>
    </>
  )
}

export default ContractManagement;