import React, {useEffect, useState} from 'react';
import './pageStyle.css';
import { InvestorDetailCard } from '../component/cards';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import GeneralInformation from '../sectionBlock/General-Information';
import { InvestorTable } from '../component/table';
import Reports from '../sectionBlock/Reports';
import InvestorCustomizer from '../sectionBlock/Investor-Sidebar';
import Navbar from '../sectionBlock/Navigation/Navbar';
import { useLocation} from "react-router-dom";
import FundManagement from '../sectionBlock/Fund-Management';
import { useNavigate } from 'react-router-dom';
import GenerateStatement from '../sectionBlock/GenerateStatement';
import axios from "../api/axios.js";
import CreateFund from '../sectionBlock/Create-fund';
import Assign from '../sectionBlock/Assign';
import {toast} from "react-toastify";
const InvestorsDetail = ({lang, setLang, language, responsive}) => {
  const navigate = useNavigate();
  let buscar = useLocation();
  const [isNavigate, setNavigate]=useState(false);
  const [valorUpdate, setUpdateValor]=useState({
    Nit: '',
    Company_name: '',
    Date_of_constitution: '',
    City_of_constitution: '',
    Constitution_Department: '',
    Country_of_Constitution: '',
    Economic_activity: '',
    Company_object: '',
    Sociodemographic_Department: '',
    Sociodemographic_Country: '',
    Address_main_office: '',
    Sociodemographic_City: '',
    Telephone: '',
    Email: '',
    Permit_description_1: '',
    Permit_description_2: '',
    Permit_description_3: '',
    add_special_permits: ''
  });
  const [tab,setTab] = useState('General information');
  const [totalInvest,setTotalInvest] = useState(0);
  const [IDInvestor,setID] = useState(0);
  const [listFondos,setFondos] = useState([]);
  const [ListInvest,setListInvest] = useState([]);
  const [totalProject,setTotalPRoject] = useState(0);
  const [NameInvestor,setNameInvestor] = useState("");
  const [attemptToAddInvestor, setAttemptToAddInvestor] = useState('close');
  const [generate, setGenerate] = useState('off');
  const callApiInvestorIndividual= (id)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
  axios.get("/investors/"+id, {},bearerToken)
  .then((response) => {
    if(response.status===200){
      if(response.data){
       if(response.data.length>0){
          if(response.data[0]['FONDOS'].length>0){
            setTotalInvest(response.data[1]['TOTAL DE FONDOS ASIGNADOS'])
            setFondos(response.data[0]['FONDOS'])
          }else{
            setTotalInvest(response.data[1]['TOTAL DE FONDOS ASIGNADOS'])
            setFondos([])
          }
          if(response.data[0]['INVERSION'].length>0){
            setListInvest(response.data[0]['INVERSION'])

          }else{
            setListInvest([])
          }
          if(response.data[0]['DATOS'].length>0){
            
            var valorJsonCorporativa=response.data[0]['DATOS'][0]['INFORMACION_COORPORATIVA']
            var valorJsonContacto=response.data[0]['DATOS'][0]['INFORMACION_CONTACTO']
            var valorJsonPermission=response.data[0]['DATOS'][0]['INFORMACION_PERMISION']
            var valorJsonSociodemo=response.data[0]['DATOS'][0]['INFORMACION_SOCIODEMOGRAFICA']
            setNameInvestor(JSON.parse(valorJsonCorporativa).COMPANY_NAME)
            setTotalPRoject(response.data[0]['INVERSION'].length)
            setUpdateValor({
              Nit: JSON.parse(valorJsonCorporativa).NIT,
              Company_name: JSON.parse(valorJsonCorporativa).COMPANY_NAME,
              Date_of_constitution:JSON.parse(valorJsonCorporativa).DATE_OF_CONSTITUTION,
              City_of_constitution: JSON.parse(valorJsonCorporativa)['CITY_CONSTITUTION'],
              Constitution_Department: JSON.parse(valorJsonCorporativa)['CONSTITUTION_DEPARTAMENT'],
              Country_of_Constitution: JSON.parse(valorJsonCorporativa)['COUNTRY_OF_CONSTITUTION'],
              Economic_activity: JSON.parse(valorJsonCorporativa)['ECONOMIC_ACTIVITY'],
              Company_object:JSON.parse(valorJsonCorporativa)['COMPANY_OBJECT'],
              Sociodemographic_Department:JSON.parse(valorJsonSociodemo)['DEPARTAMENT'],
              Sociodemographic_Country: JSON.parse(valorJsonSociodemo)['COUNTRY'],
              Address_main_office: JSON.parse(valorJsonSociodemo)['ADDRESS'],
              Sociodemographic_City:JSON.parse(valorJsonSociodemo)['CITY'],
              Telephone:JSON.parse(valorJsonContacto)['TELEPHONE'],
              Email:JSON.parse(valorJsonContacto)['EMAIL'],
              Permit_description_1: JSON.parse(valorJsonPermission)['PERMISION_1'],
              Permit_description_2: JSON.parse(valorJsonPermission)['PERMISION_2'],
              Permit_description_3: JSON.parse(valorJsonPermission)['PERMISION_3'],
              add_special_permits: (JSON.parse(valorJsonPermission)['PERMISION_2'] || JSON.parse(valorJsonPermission)['PERMISION_3'])?true:false
            })
          }else{
            setUpdateValor({
              Nit: '',
              Company_name: '',
              Date_of_constitution: '',
              City_of_constitution: '',
              Constitution_Department: '',
              Country_of_Constitution: '',
              Economic_activity: '',
              Company_object: '',
              Sociodemographic_Department: '',
              Sociodemographic_Country: '',
              Address_main_office: '',
              Sociodemographic_City: '',
              Telephone: '',
              Email: '',
              Permit_description_1: '',
              Permit_description_2: '',
              Permit_description_3: '',
              add_special_permits: ''
            })
            setNameInvestor("NO NAME")
            setTotalPRoject(response.data[0]['INVERSION'].length)
          }
       }
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
const [attemptToCreateFund, setAttemptToCreateFund] = useState('close');
const [assign, setAssign] = useState('off');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToAddInvestor('close');
        setGenerate('off');
        setAttemptToCreateFund('close');
        setAssign('off');
      })
    }
    const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
    if(addingInvestorOverlay){
      addingInvestorOverlay.addEventListener('click',()=>{
        setAttemptToAddInvestor('close');
        setGenerate('off');
        setAttemptToCreateFund('close');
        setAssign('off');
      })
    }
    const CreateFund = document.querySelectorAll('.investor-detail .management button');
    if(CreateFund[0]){
      CreateFund[0].addEventListener('click',()=>{
        setAttemptToCreateFund('open');
      })
    }
    if(CreateFund[1]){
      CreateFund[1].addEventListener('click',()=>{
        setAssign('on');
      })
    }
    const addInvestor = document.querySelectorAll('.information-customizer button');
    if(addInvestor[0]){
      addInvestor[0].addEventListener('click',()=>{
        setAttemptToAddInvestor('open');
      })
    }
    if(addInvestor[1]){
      addInvestor[1].addEventListener('click',()=>{
        setGenerate('on');
      })
    }
  })
  useEffect(()=>{
    if(buscar){
      var valorBusqueda=buscar.search.replace("?","")
      setID(valorBusqueda)
      callApiInvestorIndividual(valorBusqueda)
    }
    const backButton = document.querySelector('.first-part .buttonwitharrow');
    if(backButton){
      backButton.addEventListener('click',() => {
        setNavigate(!isNavigate);
      });
      if(isNavigate){
        navigate(-1);
      }
    }
    const Li = Array.from(document.querySelectorAll('.tab ul li'));
    Li.forEach((li)=>{
        li.addEventListener('click',()=>{
          setTab(li.dataset.tab);
        })
    })
  },[buscar,isNavigate,navigate]);
  const [responsiveTab, setResponsiveTab] = useState("");
  setTimeout(()=>{
    const backResponsiveButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow');
    if(backResponsiveButton){
      backResponsiveButton.addEventListener('click',() => {
        setResponsiveTab("");
      });
    }
    const backButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow.fundsBackTab');
    if(backButton){
      backButton.addEventListener('click',() => {
        setResponsiveTab("");
      });
    }
    const backFundButton = document.querySelector('.responsiveInvestorDetail .first-part .buttonwitharrow.emptyResponsiveTab');
    if(backFundButton){
      backFundButton.addEventListener('click',() => {
        setNavigate(!isNavigate);
      });
      if(isNavigate){
        navigate(-1);
      }
    }
    const Li = Array.from(document.querySelectorAll('.tab ul li'));
    Li.forEach((li)=>{
        li.addEventListener('click',()=>{
          setResponsiveTab(li.dataset.tab);
        })
    })
  })
return (
    <>
    {
      attemptToAddInvestor === 'open'
      ?<InvestorCustomizer title={language.investordetail.update}  language={language} DataInicial={valorUpdate} id={IDInvestor}/>
      :<></>
    }
    {
      generate === 'on'
      ?<GenerateStatement title={language.investordetail.accountstate} />
      :<></>
    }
    {
      attemptToCreateFund === 'open'
      ?<CreateFund title={language.funds.create_fund} language={language} />
      :<></>
    }
    {
      assign === 'on'
      ?<Assign title={language.funds.assign} language={language} />
      :<></>
    }
      <>
    {
      responsive.responsiveID
      ?<>
        <div className="responsiveInvestorDetail">
          <>
          {
            responsiveTab === ""
            ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.investordetail.title} pageDesc={language.investordetail.desc}  displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} specificClass={`emptyResponsiveTab`} />
              <main className='main investor-detail'>
                <div className="cards grid-container">   
                  <InvestorDetailCard color={`primary-color`} title={language.investordetail.detailcard} text={totalInvest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Ltd ={listFondos} />
                </div>
                <div className="investor-detail-info">
                  <Tab tab1={`General information`} tab2={`Projects`} tab3={`Reports`} hideCustomizer={`dn`} tab4={`Funds`} hideTab5={`dn`} tabs1={language.investordetail.generaltab} tabs2={language.investordetail.prjecttab}  tabs3={language.investordetail.reportstab}  tabs4={language.investordetail.fundtab} />
                </div>
              </main>
            </>
            :<></>
          }
          {
            responsiveTab === "General information"
            ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={"General Information"} displayArrowBtn={`show`} />
              <main className='main investor-detail'>
                <div className="investor-detail-info">
                  <GeneralInformation  language={language} Name={NameInvestor}id={IDInvestor}totalInvestment={totalInvest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} totalProject={totalProject}/>  
                </div>
              </main>
            </>
            :<></>
          }
          {
            responsiveTab === "Projects"
            ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={"Projects"} displayArrowBtn={`show`} />
              <main className='main investor-detail'>
                <div className="investor-detail-info">
                  <InvestorTable  language={language} header1={language.investordetail.header1}  header2={[language.investordetail.header2_1,<br key={1} />,language.investordetail.header2_2]}  header3={language.investordetail.header3}  header4={language.investordetail.header4} data={ListInvest} />
                </div>
              </main>
            </>
            :<></>
          }
          {
            responsiveTab === "Reports"
            ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={"Reports"} displayArrowBtn={`show`} />
              <main className='main investor-detail'>
                <div className="investor-detail-info">
                  <Reports  language={language} />
                </div>
              </main>
            </>
            :<></>
          }
          {
            responsiveTab === "Funds"
            ?<>
              <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
              <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={"Funds"} displayArrowBtn={`show`} specificClass={`fundsBackTab`} />
              <main className='main investor-detail'>
                <div className="investor-detail-info">
                  <FundManagement  language={language} />
                </div>
              </main>
            </>
            :<></>
          }
          </>
        </div>
      </>
      :<>
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.investordetail.title} pageDesc={language.investordetail.desc}  displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
      <main className='main investor-detail'>
        <div className="cards grid-container">   
          <InvestorDetailCard color={`primary-color`} title={language.investordetail.detailcard} text={totalInvest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Ltd ={listFondos} />
        </div>
        <div className="investor-detail-info">
          <Tab tab1={`General information`} tab2={`Projects`} tab3={`Reports`} hideCustomizer={`dn`} tab4={`Funds`} hideTab5={`dn`} tabs1={language.investordetail.generaltab} tabs2={language.investordetail.prjecttab}  tabs3={language.investordetail.reportstab}  tabs4={language.investordetail.fundtab} />
          { tab === 'General information'
            ? <GeneralInformation  language={language} Name={NameInvestor}id={IDInvestor}totalInvestment={totalInvest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} totalProject={totalProject}/>
            :( tab === 'Projects'
            ? <InvestorTable  language={language} header1={language.investordetail.header1}  header2={[language.investordetail.header2_1,<br key={1} />,language.investordetail.header2_2]}  header3={language.investordetail.header3}  header4={language.investordetail.header4} data={ListInvest} />
            : ( tab === 'Reports'
              ?<Reports  language={language} />
              :<FundManagement  language={language} />
              )
            )
          }
        </div>
      </main>
      </>
    }
      </>
    </>
  )
}

export default InvestorsDetail;