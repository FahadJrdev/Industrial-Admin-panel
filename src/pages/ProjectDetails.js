import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import { Button } from '../component/buttons';
import { useNavigate,useLocation } from 'react-router-dom';
import Tab from '../component/tab';
import ProjectGI from '../sectionBlock/Project-General-Information';
import Approval from '../sectionBlock/ProjectApproval';
import ProjectInfo from '../sectionBlock/Project-Information';
import ProjectOwnerInfo from '../sectionBlock/Project-Owner-Information';
import InvestorPlan from '../sectionBlock/Investor-plan';
import FinancialProjection from '../sectionBlock/Financial-Projection';
import Valuation from '../sectionBlock/Valuation';
import Risk from '../sectionBlock/Risk';
import AddRisk from '../sectionBlock/AddRisk';
import UpdatedIrr from '../sectionBlock/UpdatedIrr';
import axios from "../api/axios.js";
import {toast} from "react-toastify";
const prjectOwnerInitial = {
  Names: '',
  Surnames:'',
  Type_of_identification:'',
  Identification: '',
  Department:'',
  Country:'',
  Address_main_office: '',
  City: '',
  Telephone: '',
  Email: ''
}
const ProjectDetails = ({lang, setLang, language, responsive}) => {
  const navigate = useNavigate();
  
  let buscar = useLocation();
  const [isNavigate, setNavigate]=useState(false);
  const [tab,setTab] = useState('General information');
  const [fechinver,setfechainver] = useState('');
  const [paisUbica,setPais] = useState('');
  const [idProjectOwner,setIdProjectOwner] = useState('');
  const [fechaSalida,setSalida] = useState('');
  const [IdProject,setID] = useState(0);
  const [riskProjectAll,setRiskAll] = useState([]);
  const [projecOwnerData,setProjectowner]= useState(prjectOwnerInitial)
  const [valorDeenvio,setValorEnvio] = useState({
    Code: 'Code',
    Project_name:'Project name',
    Description:'Description',
    Contract_type:'Contract type',
    Investment_objective:'Investment objective',
    Capital_commitments: 'Capital commitments',
    USD_Invested:'USD Invested',
    Investment_period:'Investment period',
    Project_status: 'Project status',
    Country: 'Country',
    City: 'City',
    Address: 'Address',
    Date_investment: 'Date investment',
    Approved_investment_amount: 'Approved investment amount',
    Responsible: 'Responsible',
    Projected_departure_date: 'Projected departure date'
  });
  const [attemptToProjectApproval, setAttemptToProjectApproval] = useState('close');
  const [ProjectInfoDisplay, setProjectInfoDisplay] = useState('close');
  const [ProjectOwnerInfoDisplay, setProjectOwnerInfoDisplay] = useState('close');
  const [investorPlan, setInvestorPlan] = useState('close');
  const [attempToAddRisk, setAttemptToAddRisk] = useState('close');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
        setInvestorPlan('close');
        setAttemptToAddRisk("close");
      })
    }
    const backButtonPI = document.querySelector('.adding-investor.PI .header-add button');
    if(backButtonPI){
      backButtonPI.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
        setInvestorPlan('close');
        setAttemptToAddRisk("close");
      })
    }
    const backButtonAp = document.querySelector('.adding-investor.approval .header-add button');
    if(backButtonAp){
      backButtonAp.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
        setInvestorPlan('close');
        setAttemptToAddRisk("close");
      })
    }
    const backButtonAr = document.querySelector('.adding-investor.addRisk .header-add button');
    if(backButtonAr){
      backButtonAr.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
        setInvestorPlan('close');
        setAttemptToAddRisk("close");
      })
    }
    const addingInvestorOverlay = document.querySelectorAll('.adding-investor-overlay');
    if(addingInvestorOverlay[0]){
      addingInvestorOverlay[0].addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
        setInvestorPlan('close');
        setAttemptToAddRisk("close");
      })
    }
    if(addingInvestorOverlay[1]){
      addingInvestorOverlay[1].addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
        setInvestorPlan('close');
        setAttemptToAddRisk("close");
      })
    }
    const addInvestor = document.querySelectorAll('.project.management button');
    if(addInvestor[0]){
      addInvestor[0].addEventListener('click',()=>{
        setAttemptToProjectApproval('open');
      })
    }
    const openInfo = document.querySelectorAll('.project.management .GI .GI-information button');
    if(openInfo[0]){
      openInfo[0].addEventListener('click',()=>{
        setProjectInfoDisplay('open');
      })
    }
    if(openInfo[1]){
      openInfo[1].addEventListener('click',()=>{
        setProjectOwnerInfoDisplay('open');
      })
    }
    if(openInfo[2]){
      openInfo[2].addEventListener('click',()=>{
        setInvestorPlan('open');
      })
    }
    const registerButton = document.querySelector('.ProjectInfo .register');
    if(registerButton){
      registerButton.addEventListener('click',()=>{
          setProjectInfoDisplay('close');
          setProjectOwnerInfoDisplay('open');
        })
    }
  })
  const callProjectOwner=(idProject)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    axios.get("/projectowner/"+idProject, {},bearerToken)
  .then((response) => {
    if(response.status===200){
      if(response.data.length>0){
        setIdProjectOwner(response.data[0]['I_CODIGO'])
        var valorJsonCorporativa=response.data[0]['INFORMACION_COORPORATIVA']
        var valorJsonContacto=response.data[0]['INFORMACION_CONTACTO']
        var valorJsonSociodemo=response.data[0]['INFORMACION_SOCIODEMOGRAFICA']
        setProjectowner({
          Telephone:JSON.parse(valorJsonContacto)['TELEPHONE'],
          Email:JSON.parse(valorJsonContacto)['EMAIL'],
          Names:JSON.parse(valorJsonCorporativa)['NAMES'],
          Surnames:JSON.parse(valorJsonCorporativa)['SURNAMES'],
          Type_of_identification:JSON.parse(valorJsonCorporativa)['TYPE_IDENTIFICATION'],
          Identification:JSON.parse(valorJsonCorporativa)['IDENTIFICATION'],
          Department:JSON.parse(valorJsonSociodemo)['DEPARTAMENT'],
          Country:JSON.parse(valorJsonSociodemo)['COUNTRY'],
          Address_main_office:JSON.parse(valorJsonSociodemo)['ADDRESS'],
          City:JSON.parse(valorJsonSociodemo)['CITY']
        })
      }
     
    }
  }).catch((err)=>{
    setIdProjectOwner('')
    setProjectowner(prjectOwnerInitial)
  })
  }
  const callProjectRisk=(idProject)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    axios.get("/riskprojectid/"+idProject, {},bearerToken)
  .then((response) => {
    setRiskAll([])
    if(response.status===200){
      setRiskAll(response.data)
    }
  }).catch((err)=>{
    setRiskAll([])
  })
  }
  const callProjectID= (id)=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
  axios.get("/project/"+id, {},bearerToken)
  .then((response) => {
    if(response.status===200){
      setValorEnvio({
        Code: response.data[0].I_CODIGO,
        Project_name:response.data[0].C_NOMBRE_PROYECTO,
        Description:response.data[0].C_DESCRIPCION,
        Contract_type:response.data[0].I_TIPO_CONTRATO,
        Investment_objective:response.data[0].I_OBJETIVO_INVERSION,
        Capital_commitments: response.data[0].I_CAPITAL_COMPROMISOS_LP,
        USD_Invested:response.data[0].D_USD_INVERTIDOS?response.data[0].D_USD_INVERTIDOS:0,
        Investment_period:response.data[0].F_PERIODO_INVERSIONISTA,
        Project_status: response.data[0].C_ESTADO_PROYECTO,
        Country: response.data[0].I_PAIS,
        City: response.data[0].I_CIUDAD,
        Address: response.data[0].C_DIRECCION,
        Date_investment: response.data[0].FECHA_INVERSION,
        Approved_investment_amount: response.data[0].C_MONTO_INV_APRO,
        Responsible: response.data[0].C_RESPONSABLE,
        Projected_departure_date: response.data[0].F_FECHA_PROYECTADA_SALIDA
      }
      )
      callProjectRisk(response.data[0].I_CODIGO)
      callProjectOwner(response.data[0].I_CODIGO)
      setPais(response.data[0].I_PAIS)
      setfechainver(response.data[0].FECHA_INVERSION)
      setSalida(response.data[0].F_FECHA_PROYECTADA_SALIDA)
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
      callProjectID(valorBusqueda)
    }

  },[buscar,isNavigate,navigate]);

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
    const Li = Array.from(document.querySelectorAll('.tab ul li'));
    Li.forEach((li)=>{
        li.addEventListener('click',()=>{
          setTab(li.dataset.tab);
        })
    })
  },[isNavigate, navigate]);
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
        navigate(-1);
      }
    }
    const Li = Array.from(document.querySelectorAll('.tab ul li'));
    Li.forEach((li)=>{
        li.addEventListener('click',()=>{
          setResponsiveTab(li.dataset.tab);
        })
    })
    const addRisk = document.querySelector('.add-risk button');
    if(addRisk){
      addRisk.addEventListener('click',()=>{
        setAttemptToAddRisk("open");
      })
    }
  })
  const RefrescarRiesgo= ()=>{
    callProjectRisk(IdProject)
  }
  return (
    <>
      {
        attemptToProjectApproval === 'open'
        ?<Approval language={language} title={language.projectDetails.Approval_title} />
        :<></>
      }
      {
        ProjectInfoDisplay === 'open'
        ?<ProjectInfo language={language} title={language.projectDetails.projectinformation} datInicial={valorDeenvio} id={IdProject}/>
        :<></>
      }
      {
        ProjectOwnerInfoDisplay === 'open'
        ?<ProjectOwnerInfo setIdOwner={setIdProjectOwner} idOwner={idProjectOwner} language={language} title={language.projectDetails.projectowener}  idproject={IdProject}  datoRetorno={projecOwnerData} setOwner={setProjectowner}/>
        :<></>
      }
      {
        investorPlan === 'open'
        ?<InvestorPlan language={language} title={language.projectDetails.investorPlan} />
        :<></>
      }
      {
        attempToAddRisk === 'open'
        ?<AddRisk funcionRefresh={callProjectRisk} language={language} idproject={IdProject} title={language.projectDetails.risk_title} />
        :<></>
      }
      {
        responsive.responsiveID
        ?<>
          <div className="responsiveInvestorDetail">
            <>
            {
              responsiveTab === ""
              ?<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />        
                <Header responsive={responsive} lang={lang} setLang={setLang} language={language} pageTitle={language.projectDetails.title} pageDesc={language.projectDetails.subtitle}  displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} specificClass={`emptyResponsiveTab`} />
                <main className='main projects detail'>
                  <div className="cards grid-container">   
                    <InvestorCard key={1} color={`primary-color`}  title={[language.projectDetails.dateinvestment]} text={fechinver.toString()} />
                    <InvestorCard key={2} color={`secondary-color`}  title={[language.projectDetails.countrylocation]} text={paisUbica} />
                    <InvestorCard key={3} color={`tartiary-color`}  title={language.projectDetails.exputedeparture} text={fechaSalida.toString()} />
                  </div>
                  <div className="project management">
                  <Button text={language.projectDetails.button} background={`var(--primary-color)`} />
                    <Tab tab1={`General information`} tab2={`Financial results and projections`} tab3={`Valuation Methodology`} tab4={`Current risks &mitigation strategies`} tab5={`Updated irr - explanation & assumptions`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} tabs1={language.projectDetails.tab1} tabs2={language.projectDetails.tab2}  tabs3={language.projectDetails.tab3}  tabs4={language.projectDetails.tab4} tabs5={language.projectDetails.tab5} />
                  </div>
                </main>
              </>
              :<></>
            }
            {
              responsiveTab === "General information"
              ?<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />        
                <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.projectDetails.tab1} displayArrowBtn={`show`} />
                <main className='main projects detail'>
                  <div className="project management">
                    <ProjectGI language={language} />
                  </div>
                </main>
              </>
              :<></>
            }
            {
              responsiveTab === "Financial results and projections"
              ?<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />        
                <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.projectDetails.tab2} displayArrowBtn={`show`} />
                <main className='main projects detail'>
                  <div className="project management">
                    <FinancialProjection language={language} />
                  </div>
                </main>
              </>
              :<></>
            }
            {
              responsiveTab === "Valuation Methodology"
              ?<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />        
                <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.projectDetails.tab3} displayArrowBtn={`show`} />
                <main className='main projects detail'>
                  <div className="project management">
                    <Valuation language={language} />
                  </div>
                </main>
              </>
              :<></>
            }
            {
              responsiveTab === "Current risks &mitigation strategies"
              ?<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />        
                <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.projectDetails.tab4} displayArrowBtn={`show`} />
                <main className='main projects detail'>
                  <div className="project management">
                    <Risk language={language} data={riskProjectAll}  refresh={RefrescarRiesgo}/>
                  </div>
                </main>
              </>
              :<></>
            }
            {
              responsiveTab === "Updated irr - explanation & assumptions"
              ?<>
                <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />        
                <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.projectDetails.tab5} displayArrowBtn={`show`} />
                <main className='main projects detail'>
                  <div className="project management">
                    <UpdatedIrr language={language} />
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
              <Header responsive={responsive} lang={lang} setLang={setLang} language={language} pageTitle={language.projectDetails.title} pageDesc={language.projectDetails.subtitle}  displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} specificClass={`emptyResponsiveTab`} />
              <main className='main projects detail'>
                <div className="cards grid-container">   
                <InvestorCard key={1} color={`primary-color`}  title={[language.projectDetails.dateinvestment]} text={fechinver.toString()} />
                    <InvestorCard key={2} color={`secondary-color`}  title={[language.projectDetails.countrylocation]} text={paisUbica} />
                    <InvestorCard key={3} color={`tartiary-color`}  title={language.projectDetails.exputedeparture} text={fechaSalida.toString()} />
                </div>
                <div className="project management">
                <Button text={language.projectDetails.button} background={`var(--primary-color)`} />
                <Tab action={setTab} tab1={`General information`} tab2={`Financial results and projections`} tab3={`Valuation Methodology`} tab4={`Current risks &mitigation strategies`} tab5={`Updated irr - explanation & assumptions`} hideCustomizer={`dn`} tabs1={language.projectDetails.tab1} tabs2={language.projectDetails.tab2}  tabs3={language.projectDetails.tab3}  tabs4={language.projectDetails.tab4} tabs5={language.projectDetails.tab5} />
                  {
                    tab === 'General information'
                    ?<ProjectGI language={language} />
                    :(tab === 'Financial results and projections'
                      ?<FinancialProjection language={language} />
                      :(tab === 'Valuation Methodology'
                        ?<Valuation language={language} />
                        :(tab === 'Current risks &mitigation strategies'
                          ?<Risk language={language} data={riskProjectAll} refresh={RefrescarRiesgo} />
                          :<UpdatedIrr language={language} />
                        )
                      )
                    )
                  }
                </div>
              </main>
        </>
      }
    </>
  )
}

export default ProjectDetails;