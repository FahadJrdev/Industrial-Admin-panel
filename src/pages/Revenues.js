import React, { useState} from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {Button} from '../component/buttons'
import {ConfigCard} from '../component/cards';
import {Link} from 'react-router-dom';
import {RevenueTable1, RevenueTable2} from '../component/table';
import {RevenueInfo1, RevenueInfo2} from '../data/InvestorInfo';
import PagoManual from '../sectionBlock/Pago-Manual';
import './pageStyle.css';

const Revenues = ({lang, setLang, language, responsive}) => {
  const [pagoManual, setPagoManual] = useState("close");
  const [RTable1, setRTable1] = useState(false);
  const [RTable2, setRTable2] = useState("close");
  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setPagoManual("close");
      })
    }
    const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
    if(addingInvestorOverlay){
      addingInvestorOverlay.addEventListener('click',()=>{
        setPagoManual("close");
      })
    }
    const pagoBtn = document.querySelector(".pago-button button");
    if(pagoBtn){
      pagoBtn.addEventListener("click",()=>{
        setRTable2("open");
      })
    }
    const cargarBtn = document.querySelector(".cargar button");
    if(cargarBtn){
      cargarBtn.addEventListener("click",()=>{
        setRTable1(!RTable1);
        setRTable2("close");
      })
    }
  })

  return (
    <>
      {
        pagoManual === "open"
        ?<PagoManual title={language.revenues.payman} language={language} />
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={language.revenues.title} pageDesc ={language.revenues.desc} displaySearch={`show`} />
      <main className='main revenues'>  
        <ConfigCard language={language} /> 
        <div className="Esheet-submit">
          <Link to="/Billing">
            <Button text={language.revenues.invoince} background={`var(--primary-color)`} types={`button`} />
          </Link>
        </div>
        <div className="Esheet-submit cargar">
          <h2>{language.revenues.aplicacioning}</h2>
          <p>{language.revenues.carg_arch}</p>
          <Button text={language.global.carga_arch} background={`var(--primary-color)`} types={`button`} />
        </div>
        <div className="tables">
          {
            RTable1
            ?<>
              <RevenueTable1 data={RevenueInfo1} language={language} />
            </>
            :<></>
          }
          {
            RTable2 === "open"
            ?<>
              <hr />
              <RevenueTable2 data={RevenueInfo2} language={language} setPagoManuals={setPagoManual} />
            </>
            :<></>
          }
        </div>
      </main>
    </>
  )
}

export default Revenues;