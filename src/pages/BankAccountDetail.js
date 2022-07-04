import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate } from 'react-router-dom';
import GeneralInfoSearch from '../sectionBlock/General-info-search';
import './pageStyle.css';

const BankAccountDetail = ({responsive, lang, setLang, language}) => {
    const navigate = useNavigate();
    const [isNavigate, setNavigate] = useState(false);
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
      },[isNavigate,navigate]);
  return (
    <>
      <div className="BankFileConfiguration">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Account detail`} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main bankfileconfig"> 
            <GeneralInfoSearch language={language} title={`General Information`} />                    
        </main>
      </div>
    </>
  )
}

export default BankAccountDetail;