import React, {useState, useEffect} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import { useNavigate ,useLocation} from 'react-router-dom';
import GeneralInfoSearch from '../sectionBlock/General-info-search';
import './pageStyle.css';

const BankAccountDetail = ({responsive, lang, setLang, language}) => {
    const navigate = useNavigate();
    let buscar = useLocation();
    const [isNavigate, setNavigate] = useState(false);
    const [idss, Setvalor] = useState("");
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
        if(buscar){
          var valorBusqueda=buscar.search.replace("?","")
          Setvalor(valorBusqueda)
        }
      },[isNavigate,navigate]);

  return (
    <>
      <div className="BankFileConfiguration">
        <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
        <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.bankfile_config.bankTitledet} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
        <main className="main bankfileconfig"> 
          {idss?<> <GeneralInfoSearch language={language} title={language.bankfile_config.bankTitledetinfo} IDS={idss}/> </>:<></>}                    
        </main>
      </div>
    </>
  )
}

export default BankAccountDetail;