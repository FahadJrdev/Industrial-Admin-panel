import React from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
const Reports = ({lang, setLang, language, responsive}) => {
  return (
    <>
    <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
    <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Reports`} pageDesc ={language.dashboard.general_indicators} displaySearch={`show`} />
    </>
  )
}

export default Reports;