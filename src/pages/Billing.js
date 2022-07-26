import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import {ConfigCard} from '../component/cards';
import Tab from '../component/tab';
import {BillingTable} from '../component/table';
import axios from "../api/axios.js";
import './pageStyle.css';

const Billing = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [billing, setBillins] = useState([]);
    const [one]  = useState(true);
    const navigate = useNavigate();
    const [isNavigate, setNavigate] = useState(false);
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
     
      const callFondosFacturas =()=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/revenuemanagementBillingFunds", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                setBillins(response.data)
              }else{
                setBillins([])
              }
            }).catch((err)=>{
                
              setBillins([])
            })
      }
      useEffect(()=>{
        callFondosFacturas()
       },[one]);
  return (
    <>
      <div className="Billing">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.billing.title} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main billing">
            <ConfigCard language={language} />
            <div className="bill-title-body">
              <p className="bill-title">{language.billing.selectfon} </p> 
            </div>        
            <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} inactive={`inactive`} hideCustomizer={`flex`} />
            <BillingTable header1={language.billing.header1}   header2={language.billing.header2}   header3={language.billing.header3}   header4={language.billing.header4}  data={billing} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
      </div>
    </>
  )
}

export default Billing;