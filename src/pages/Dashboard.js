import React from 'react';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import Navbar from '../sectionBlock/Navigation/Navbar';

const Dashboard = ({lang, setLang, language, responsive}) => {
  return (
    <>
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Dash board`} pageDesc ={language.dashboard.general_indicators} displaySearch={`show`} />
      <main className='main dashboard'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={language.dashboard.Investors} text={`271`} miniText={`+ 0,7% `} miniDisplay={`show`}/>
          <InvestorCard key={2} color={`secondary-color`}  title={language.dashboard.projects} text={`69`} miniText={`- 1,7% `} miniDisplay={`show`} rotateArrowIcon={`down`}/>
          <InvestorCard key={3} color={`tartiary-color`}  title={language.dashboard.montInvers} text={`5`} miniText={`+ 1% `} miniDisplay={`show`}/>
        </div>
      </main>
    </>
  )
}

export default Dashboard;