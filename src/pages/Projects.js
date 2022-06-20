import React, {useState} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard, ProjectCard} from '../component/cards';
import AddProjects from '../sectionBlock/Add-project';
import ProjectManagement from '../sectionBlock/Project-Management';
import Due from '../sectionBlock/Due-diligence';

const Projects = ({lang, setLang, language, responsive}) => {
  const [attemptToAddProject, setAttemptToAddProject] = useState('close');
  const [due, setDue] = useState('off');
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToAddProject('close');
        setDue('off');
      })
    }
    const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
    if(addingInvestorOverlay){
      addingInvestorOverlay.addEventListener('click',()=>{
        setAttemptToAddProject('close');
        setDue('off');
      })
    }
    const addInvestor = document.querySelectorAll('.project .management button');
    if(addInvestor[0]){
      addInvestor[0].addEventListener('click',()=>{
        setAttemptToAddProject('open');
      })
    }
    if(addInvestor[1]){
      addInvestor[1].addEventListener('click',()=>{
        setDue('on');
      })
    }
  })
  return (
    <>
      {
        attemptToAddProject === 'open'
        ?<AddProjects title={language.projects.title} language={language} />
        :<></>
      }
      {
        due === 'on'
        ?<Due language={language} title={`Due diligence`} />
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.projects.title} pageDesc ={language.projects.subtitle}  displaySearch={`show`} />
      <main className='main projects'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={[language.projects.period_invesrt]} text={`5/28/2013 - 5/28/2018`} />
          <InvestorCard key={2} color={`secondary-color`}  title={[language.projects.nototalactive]} text={`26`} />
          <InvestorCard key={3} color={`tartiary-color`}  title={language.projects.nototalout} text={`2`} />
          <ProjectCard language={language} />
        </div>
        <div className="project">
          <ProjectManagement lang={lang} setLang={setLang} language={language} />
        </div>
      </main>
    </>
  )
}

export default Projects;