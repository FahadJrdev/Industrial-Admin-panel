import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Fondos from '../pages/Fondos';
import Investors from '../pages/Investors';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import Revenues from '../pages/Revenues';
import Expenses from '../pages/Expenses';
import GatosFondo from '../pages/GatosFondo';
import Reports from '../pages/Reports';
import Configuration from '../pages/Configuration';
import Help from '../pages/Help';
import InvestorsDetail from '../pages/InvestorsDetail';
import Login from '../authentication/Login';
import ForgetPassword from '../authentication/Forget_Password';
import ChangePassword from '../authentication/Password_change';
import FundDetails from '../pages/FundDetails';
import Profile from '../pages/Profile';
import ContractManagement from '../pages/ContractManagement';
import Leasing from '../pages/Leasing';
import ManageProject from '../pages/ManageProject';
import ManageInvestor from '../pages/ManageInvestor';
import DebtDetail from '../pages/DebtDetail';
import ProjectDetail from '../pages/InvestmentProjectsDetail';
import InvestorDetail from '../pages/InvestmentInvestorsDetail';
import Billing from '../pages/Billing';
import BillingDetail from '../pages/DetalleFacturasFondo';
import BankFileConfiguration from '../pages/BankFileConfiguration';
import BankAccountDetail from '../pages/BankAccountDetail';
import ConfigurationArchivo from '../pages/ConfigurationArchivo';
import {English, Spanish} from '../language/language';

function Routers(){
  if(localStorage.lang === undefined) {
    localStorage.setItem('lang', 'us');
  }
  const [lang, setLang] = useState(localStorage.lang);
  const [width, setWindowWidth] = useState(0);
  useEffect(() => { 
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => 
      window.removeEventListener("resize",updateDimensions);
   },[])
   const updateDimensions = () => {
     const width = window.innerWidth
     setWindowWidth(width)
   }
   const responsive = {
    showTopNavMenu: width < 769,
    responsiveID: width < 769
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element = {<Login lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish}  />}/>
          <Route path='/forget-password' exact element = {<ForgetPassword lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} />}/>
          <Route path='/change-password' exact element = {<ChangePassword lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} />}/>
          <Route path='/Dashboard' exact element = {<Dashboard lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Fondos' exact element = {<Fondos lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Investors' exact element = {<Investors lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/InvestorsDetail' exact element = {<InvestorsDetail lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Revenues' exact element = {<Revenues lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Expenses' exact element = {<Expenses lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/GatosFondo' exact element = {<GatosFondo lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Reports' exact element = {<Reports lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Configuration' exact element = {<Configuration lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/FundDetails' exact element = {<FundDetails lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />} />
          <Route path='/Help' exact element = {<Help lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Projects' exact element = {<Projects lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/ProjectDetails' exact element = {<ProjectDetails lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Profile' exact element = {<Profile lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/ContractManagement' exact element = {<ContractManagement lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Leasing' exact element = {<Leasing lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/ManageProject' exact element = {<ManageProject lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/ManageInvestor' exact element = {<ManageInvestor lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/DebtDetail' exact element = {<DebtDetail lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/ProjectsInvestmentDetail' exact element = {<ProjectDetail lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/InvestorsInvestmentDetail' exact element = {<InvestorDetail lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/Billing' exact element = {<Billing lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/DetalleFacturasFondo' exact element = {<BillingDetail lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/BankFileConfiguration' exact element = {<BankFileConfiguration lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/BankDetail' exact element = {<BankAccountDetail lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
          <Route path='/ConfigureArchivo' exact element = {<ConfigurationArchivo lang={lang} setLang={setLang} language ={lang==='us'?English:Spanish} responsive={responsive} />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routers;