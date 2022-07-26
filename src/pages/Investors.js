import React, {useState, useEffect} from 'react';
import './pageStyle.css';
import { InvestorCard } from '../component/cards';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import { FundTable2 } from '../component/table';
import InvestorCustomizer from '../sectionBlock/Investor-Sidebar';
import Navbar from '../sectionBlock/Navigation/Navbar';
import axios from "../api/axios.js";

import {toast} from "react-toastify";
import { Button } from '../component/buttons';
const Investors = ({lang,setLang, language, responsive}) => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [NetMontoPerInverstor, setMontNetInvestor] = useState(0);
  const [CallLoadApi] = useState(true);
  const [attemptToAddInvestor, setAttemptToAddInvestor] = useState('close');

  const callApiListInvestor = ()=>{
      let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
    axios.get("/investors", {},bearerToken)
    .then((response) => {
      if(response.status===200){
        if(response.data){
          setListInvestors(response.data.inversores)
          setMontNetInvestor(response.data['TOTAL DE FONDOS ASIGNADOS'])
        }
      }
    }).catch((err)=>{
      if(err.response){
        if(err.response.data){
          if(err.response.data.message){
            toast(err.response.data.message)
          }
        }
      }
    })
  }
  const [listinvestors, setListInvestors] = useState([]);
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToAddInvestor('close');
      })
    }
    const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
    if(addingInvestorOverlay){
      addingInvestorOverlay.addEventListener('click',()=>{
        setAttemptToAddInvestor('close');
      })
    }
  }) 

  useEffect(()=>{ 
      callApiListInvestor()
  },[CallLoadApi])
  useEffect(()=>{ 
    const addInvestor = document.querySelector('.add_investor button');
    if(addInvestor){
      addInvestor.addEventListener('click',()=>{
        setAttemptToAddInvestor('open');
      })
    }
    const containerSearch = document.querySelector('.search-container .searchbox');
    if(containerSearch){     
    }
  },[]);
  
  return (
    <>
      {
        attemptToAddInvestor === 'open'
        ?<InvestorCustomizer title={language.investor.addInves}  language={language}/>
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.investor.title} pageDesc={language.investor.desc} displaySearch={`show`} />
      <main className='main investor'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={[language.investor.net1, <br key={1}/> ,language.investor.net2]} text={NetMontoPerInverstor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} />
          <InvestorCard key={2} color={`secondary-color`}  title={[language.investor.lp1, <br key={2}/> ,language.investor.lp2]} text={`0%`} />
          <InvestorCard key={3} color={`tartiary-color`}  title={language.investor.totalcapital} text={`0%`} />
        </div>
        <div className="add_investor">
          <Button text={language.investor.addInves} background={`var(--primary-color)`} types={`button`} />
        </div>
        <div className="fund-table">
          <Tab hideTab1={`dn`} hideTab2={`dn`} hideTab3={`dn`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} inactive={`inactive`} />
          <FundTable2 header1={language.investor.header1}  header2={language.investor.header2}  header3={language.investor.header3}  header4={language.investor.header4}  header5={language.investor.header5} data={listinvestors} currentPage={currentPage1} setCurrentPage={setCurrentPage1} />
        </div>
      </main>
    </>
  )
}

export default Investors;