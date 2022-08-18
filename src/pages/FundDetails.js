import React, {useEffect, useState} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import { useNavigate } from 'react-router-dom';
import { Exporting } from '../component/icon/icon';
import { useLocation} from "react-router-dom";
import FundInfo from '../sectionBlock/Fund-Management/FundInformation';
import axios from "../api/axios.js";
import {toast} from "react-toastify";
import { FundTable, InvestorTable ,FundTable2} from '../component/table';
const FundDetails = ({lang, setLang, language, responsive}) => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [ListInversores,setInversores] = useState([]);
  const [ListProyectos,setProyectos] = useState([]);

  const navigate = useNavigate();
  let buscar = useLocation();
  const [IdFunds,setID] = useState(0);
  const [valorDeenvio,setValorEnvio] = useState({
    Code: '',
    Name_of_fund:'',
  Description:'',
  Start_date:'',
  Final_date:'',
  Fund_value: '',
  Investment_period:'',
  Period_of_disinvestment:'',
  Invested_value: ''
});
  const [isNavigate, setNavigate]=useState(false);
  const [tabName, setTabName] = useState('General parameter');

  const callApiFundsGet= (id)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
  axios.get("/funds/"+id, {},bearerToken)
  .then((response) => {
    if(response.status===200){
      setInversores(response.data.INVERSIONISTA_EN_EL_FONDO)
      setProyectos(response.data.PROYECTOS)
      if(response.data.FONDO){
        let valor={
          Code: response.data.FONDO[0]['CODE_FONDO'],
          Name_of_fund:response.data.FONDO[0]['C_NOMBRE'],
        Description:response.data.FONDO[0]['C_DESCRIPCION'],
        Start_date:response.data.FONDO[0]['F_FECHA_INICIO'],
        Final_date:response.data.FONDO[0]['F_FECHA_FINAL'],
        Fund_value:response.data.FONDO[0]['D_VALOR_FONDO'],
        Investment_period:response.data.FONDO[0]['I_PERIODO_INVERSION'],
        Period_of_disinvestment:response.data.FONDO[0]['I_PERIODO_DESINVERSION'],
        Invested_value: response.data.FONDO[0]['D_VALOR_INVERTIDO']
      }
      setValorEnvio(valor)
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


  useEffect(()=>{
    if(buscar){
      var valorBusqueda=buscar.search.replace("?","")
      setID(valorBusqueda)
      callApiFundsGet(valorBusqueda)
    }
    const backButton = document.querySelector('.webInvestorDetail .first-part .buttonwitharrow');
    if(backButton){
      backButton.addEventListener('click',() => {
        setNavigate(!isNavigate);
      });
      if(isNavigate){
        navigate(-1);
      }
    }
  },[buscar,isNavigate,navigate]);

  
  const [responsiveTab, setResponsiveTab] = useState("");
  setTimeout(()=>{
    const backResponsiveButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow');
    if(backResponsiveButton){
      backResponsiveButton.addEventListener('click',() => {
        setResponsiveTab("");
      });
    }
    const backButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow.emptyResponsiveTab');
    if(backButton){
      backButton.addEventListener('click',() => {
        setNavigate(!isNavigate);
      });
      if(isNavigate){
        navigate('/Fondos');
      }
    }

  },100)
  return (
    <>
      {
        responsive.responsiveID
        ?<>
        <div className="responsiveInvestorDetail">
        {
          responsiveTab === ""
          ?<>
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} pageTitle={language.funds.title+' '+IdFunds} pageDesc ={language.funds.gestion_fondos+` `+IdFunds} displaySearch={`show`} specificClass={`emptyResponsiveTab`} extraClass={`backFundButton`} />
            <main className='main fundDetails'>
              <div className="fundDetail">
                <Tab action={setResponsiveTab} tab1={'General parameter'} tab2={'Fund information'} tab3={`Investors`} tab4={`Projects`} tabs1={language.fundsdetail.tab1} tabs2={language.fundsdetail.tab2} tabs3={language.fundsdetail.tab3} tabs4={language.fundsdetail.tab4} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`}  hideCustomizer={`dn`} />
              </div>
            </main>
          </>
          :<></>
        }
        {
          responsiveTab === "General parameter"
          ?<>
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} pageTitle={`General parameter`}/>
            <main className='main fundDetails'>
              <div className="fundDetail">
                  <div className="management">
                    <ul className="fund-item">
                        <li><p>{language.fundsdetail.background}</p><Exporting /></li>
                        <li><p>{language.fundsdetail.summary}</p><Exporting /></li>
                        <li><p>{language.fundsdetail.fx}</p><Exporting /></li>
                    </ul>
                  </div>
              </div>
            </main>
          </>
          :<></>
        }
        {
          responsiveTab === 'Fund information'
          ?<>
          <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
          <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} pageTitle={`Fund information`}/>
          <main className='main fundDetails'>
            <div className="fundDetail">
              <FundInfo language={language} datInicial={valorDeenvio} id={IdFunds}/>
            </div>
          </main>
          </>
          :<></>
        }
        {
          responsiveTab === 'Investors'
          ?<>
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} pageTitle={`Investors`}/>
            <main className='main fundDetails'>
              <div className="fundDetail">
                <FundTable2 header1={language.investor.header1}  header2={language.investor.header2}  header3={language.investor.header3}  header4={language.investor.header4}  header5={language.investor.header5} data={ListInversores} currentPage={currentPage1} setCurrentPage={setCurrentPage1} opcion={"1"} />    
              </div>
            </main>
          </>
          :<></>
        }
        {
          responsiveTab === 'Projects'
          ?<>
          <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
          <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} pageTitle={`Projects`}/>
          <main className='main fundDetails'>
            <div className="fundDetail">
             <InvestorTable  language={language} header1={language.investordetail.header1}  header2={[language.investordetail.header2_1,<br key={1} />,language.investordetail.header2_2]}  header3={language.investordetail.header3}  header4={language.investordetail.header4} data={ListProyectos} />     
            </div>
          </main>
          </>
          :<></>
        }
        </div>
        </>
        :<>
        <div className="webInvestorDetail">
          <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
          <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} pageTitle={language.funds.title+' '+IdFunds} pageDesc ={language.funds.gestion_fondos+` `+IdFunds} displaySearch={`show`} />
          <main className='main fundDetails'>
            <div className="fundDetail">
              <Tab action={setTabName}  tab1={'General parameter'} tab2={'Fund information'} tab3={`Investors`} tab4={`Projects`} tabs1={language.fundsdetail.tab1} tabs2={language.fundsdetail.tab2} tabs3={language.fundsdetail.tab3} tabs4={language.fundsdetail.tab4} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`}  hideCustomizer={`dn`} />
                {
                  tabName === 'General parameter'
                  ?<div className="management">
                  <ul className="fund-item">
                      <li><p>{language.fundsdetail.background}</p><Exporting /></li>
                      <li><p>{language.fundsdetail.summary}</p><Exporting /></li>
                      <li><p>{language.fundsdetail.fx}</p><Exporting /></li>
                  </ul>
                </div>
                  :<></>
                }
                {
                  tabName === 'Fund information'
                  ?<FundInfo language={language} datInicial={valorDeenvio} id={IdFunds}/>
                  :<></>
                }
                {
                  tabName === 'Investors'
                  ?<FundTable2 header1={language.investor.header1}  header2={language.investor.header2}  header3={language.investor.header3}  header4={language.investor.header4}  header5={language.investor.header5} data={ListInversores} currentPage={currentPage1} setCurrentPage={setCurrentPage1} opcion={"1"} />
                  :<></>
                }
                {
                  tabName === 'Projects'
                  ?<InvestorTable  language={language} header1={language.investordetail.header1}  header2={[language.investordetail.header2_1,<br key={1} />,language.investordetail.header2_2]}  header3={language.investordetail.header3}  header4={language.investordetail.header4} data={ListProyectos} />
                  :<></>
                }
            </div>
          </main>
        </div>
        </>
      }
    </>
  )
}

export default FundDetails;