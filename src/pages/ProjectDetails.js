import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import { Button } from '../component/buttons';
import { useNavigate } from 'react-router-dom';
import Tab from '../component/tab';
import ProjectGI from '../sectionBlock/Project-General-Information';
import Approval from '../sectionBlock/ProjectApproval';
import ProjectInfo from '../sectionBlock/Project-Information';
import ProjectOwnerInfo from '../sectionBlock/Project-Owner-Information';

const ProjectDetails = ({lang, setLang, language, responsive}) => {
  const navigate = useNavigate();
  const [isNavigate, setNavigate]=useState(false);
  const [tab,setTab] = useState('General information');
  const [attemptToProjectApproval, setAttemptToProjectApproval] = useState('close');
  const [ProjectInfoDisplay, setProjectInfoDisplay] = useState('close');
  const [ProjectOwnerInfoDisplay, setProjectOwnerInfoDisplay] = useState('close');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
      })
    }
    const backButtonPI = document.querySelector('.adding-investor.PI .header-add button');
    if(backButtonPI){
      backButtonPI.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
      })
    }
    const backButtonAp = document.querySelector('.adding-investor.approval .header-add button');
    if(backButtonAp){
      backButtonAp.addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
      })
    }
    const addingInvestorOverlay = document.querySelectorAll('.adding-investor-overlay');
    if(addingInvestorOverlay[0]){
      addingInvestorOverlay[0].addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
      })
    }
    if(addingInvestorOverlay[1]){
      addingInvestorOverlay[1].addEventListener('click',()=>{
        setAttemptToProjectApproval('close');
        setProjectInfoDisplay('close');
        setProjectOwnerInfoDisplay('close');
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
    const registerButton = document.querySelector('.ProjectInfo .register');
    if(registerButton){
      registerButton.addEventListener('click',()=>{
          setProjectInfoDisplay('close');
          setProjectOwnerInfoDisplay('open');
        })
    }
  })
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
  })
  return (
    <>
      {
        attemptToProjectApproval === 'open'
        ?<Approval language={language} title={language.projectDetails.Approval_title} />
        :<></>
      }
      {
        ProjectInfoDisplay === 'open'
        ?<ProjectInfo language={language} title={language.projectDetails.projectinformation}/>
        :<></>
      }
      {
        ProjectOwnerInfoDisplay === 'open'
        ?<ProjectOwnerInfo language={language} title={language.projectDetails.projectowener} />
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
                    <InvestorCard key={1} color={`primary-color`}  title={[language.projectDetails.dateinvestment]} text={`7/09/2022`} />
                    <InvestorCard key={2} color={`secondary-color`}  title={[language.projectDetails.countrylocation]} text={`Mexico`} />
                    <InvestorCard key={3} color={`tartiary-color`}  title={language.projectDetails.exputedeparture} text={`September 7`} />
                  </div>
                  <div className="project management">
                  <Button text={language.projectDetails.button} background={`var(--primary-color)`} />
                    <Tab tab1={`General information`} tab2={`Financial results and projections`} tab3={`Valuation Methodology`} tab4={`Current risks &mitigation strategies`} tab5={`Updated irr - explanation & assumptions`} hideCustomizer={`dn`} tabs1={language.projectDetails.tab1} tabs2={language.projectDetails.tab2}  tabs3={language.projectDetails.tab3}  tabs4={language.projectDetails.tab4} tabs5={language.projectDetails.tab5} />
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
                    <></>
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
                    <></>
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
                    <></>
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
                    <></>
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
                  <InvestorCard key={1} color={`primary-color`}  title={[language.projectDetails.dateinvestment]} text={`7/09/2022`} />
                  <InvestorCard key={2} color={`secondary-color`}  title={[language.projectDetails.countrylocation]} text={`Mexico`} />
                  <InvestorCard key={3} color={`tartiary-color`}  title={language.projectDetails.exputedeparture} text={`September 7`} />
                </div>
                <div className="project management">
                <Button text={language.projectDetails.button} background={`var(--primary-color)`} />
                <Tab tab1={`General information`} tab2={`Financial results and projections`} tab3={`Valuation Methodology`} tab4={`Current risks &mitigation strategies`} tab5={`Updated irr - explanation & assumptions`} hideCustomizer={`dn`} tabs1={language.projectDetails.tab1} tabs2={language.projectDetails.tab2}  tabs3={language.projectDetails.tab3}  tabs4={language.projectDetails.tab4} tabs5={language.projectDetails.tab5} />
                  {
                    tab === 'General information'
                    ?<ProjectGI language={language} />
                    :<></>
                  }
                  {
                    tab === 'Financial results and projections'
                    ?<></>
                    :<></>
                  }
                  {
                    tab === 'Valuation Methodology'
                    ?<></>
                    :<></>
                  }
                  {
                    tab === 'Current risks &mitigation strategies'
                    ?<></>
                    :<></>
                  }
                  {
                    tab === 'Updated irr - explanation & assumptions'
                    ?<></>
                    :<></>
                  }
                </div>
              </main>
        </>
      }
    </>
  )
}

export default ProjectDetails;