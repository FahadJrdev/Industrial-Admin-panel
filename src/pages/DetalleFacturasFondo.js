import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import {ConfigCard} from '../component/cards';
import Tab from '../component/tab';
import {BillingDetailTable} from '../component/table';
import {BillingDetailInfo} from '../data/InvestorInfo';
import './pageStyle.css';

const BillingDetail = ({responsive, lang, setLang, language}) => {
    const [currentPage, setCurrentPage] = useState(1);
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
  return (
    <>
      <div className="Billing">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Detalle facturas fondo 1`} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main billing billing-deatil">
            <ConfigCard language={language} />       
            <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} inactive={`inactive`} hideCustomizer={`flex`} />
            <BillingDetailTable header1={`Nombre`}  header2={`N° de facturas`}  header3={`Monto total de focturas`}  header4={`Actions`} data={BillingDetailInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
      </div>
    </>
  )
}

export default BillingDetail;