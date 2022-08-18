import React, {useState} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import FundManagement from '../sectionBlock/Fund-Management';
import CreateFund from '../sectionBlock/Create-fund';
import Assign from '../sectionBlock/Assign';
import axios from "../api/axios.js";
import {toast} from "react-toastify";

const Fondos = ({lang, setLang, language, responsive}) => {
  const [attemptToCreateFund, setAttemptToCreateFund] = useState('close');
  const [assign, setAssign] = useState('off');
  const [fondocon, setFondocont] = useState(0);
  const [inversocnt, setINvercont] = useState(0);
  const [proyeccon, setproyecon] = useState(0);
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
    const addInvestor = document.querySelectorAll('.Fondos .management button');
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
  const callGetContadores= ()=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
  axios.get("/contadores", bearerToken)
  .then((response) => {
    if(response.status===200){
      console.log(response)
      setFondocont(response.data.Fondos)
      setINvercont(response.data.Inversionistas)
      setproyecon(response.data.Proyectos)
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
const [inicio] =useState(callGetContadores)
  return (
    <>
      {
        attemptToCreateFund === 'open'
        ?<CreateFund title={language.funds.create_fund} language={language}/>
        :<></>
      }
      {
        assign === 'on'
        ?<Assign title={language.funds.assign} language={language} />
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.funds.title} pageDesc ={language.funds.gestion_fondos}  displaySearch={`show`} />
      <main className='main Fondos configuration'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={[language.funds.funds_create]} text={fondocon} />
          <InvestorCard key={2} color={`secondary-color`}  title={[language.funds.Investors]} text={inversocnt} />
          <InvestorCard key={3} color={`tartiary-color`}  title={language.funds.projects} text={proyeccon} />
        </div>
        <div className="configure">
          <FundManagement lang={lang} setLang={setLang} language={language}/>
        </div>
      </main>
    </>
  )
}

export default Fondos;