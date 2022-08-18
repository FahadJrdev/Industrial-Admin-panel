import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './pageStyle.css';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {Button} from '../component/buttons';
import {InvestorCard} from '../component/cards';
import {BankAccountInput2} from '../sectionBlock/BankAccountInput';
import {GatosTable} from '../component/table';
import {GatosInfo} from '../data/InvestorInfo';
import GatosGenerar from '../sectionBlock/Gatos/Generar';
import GatosAprobar from '../sectionBlock/Gatos/Aprobar';
import GatosAnular from '../sectionBlock/Gatos/Anular';
import GatosOperacion from '../sectionBlock/Gatos/Operacion';

const GatosFondo = ({lang, setLang, language, responsive}) => {
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
      const [generar, setGenerar] = useState('close');
      const [Aprobar, setAprobar] = useState('close');
      const [Anular, setAnular] = useState('close');
      const [operacion, setOperacion] = useState('close');
      setTimeout(()=>{
        const backButton = document.querySelector('.adding-investor .header-add button');
        if(backButton){
          backButton.addEventListener('click',()=>{
            setGenerar('close');
            setAprobar('close');
            setAnular('close');
            setOperacion('close');
          })
        }
        const addingInvestorOverlay = document.querySelector('.adding-investor-overlay');
        if(addingInvestorOverlay){
          addingInvestorOverlay.addEventListener('click',()=>{
            setGenerar('close');
            setAprobar('close');
            setAnular('close');
            setOperacion('close');
          })
        }
      })
  return (
    <>
      {
        generar === 'open'
        ?<>
          <GatosGenerar language={language} title={`Generar orden de pago`} />
        </>
        :<></>
      }
      {
        Aprobar === 'open'
        ?<>
          <GatosAprobar language={language} title={`Registro de la operación`} />
        </>
        :<></>
      }
      {
        Anular === 'open'
        ?<>
          <GatosAnular language={language} title={`Registro de la operación`} />
        </>
        :<></>
      }
      {
        operacion === 'open'
        ?<>
          <GatosOperacion language={language} title={`Información factura`} />
        </>
        :<></>
      }
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Gatos fondo 1`} pageDesc={`Expense information`} displayArrowBtn={`show`} textArrowBtn={language.global.back} colorArrowBtn={`var(--primary-color)`} displaySearch={`show`} />
      <main className='main Fondos configuration Expenses'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={`Annual Expense`} text={`$3,979.92`} />
          <InvestorCard key={2} color={`secondary-color`}  title={`Monthly expense`} text={`$3,979.92`} />
          <InvestorCard key={3} color={`tartiary-color`}  title={`Daily expense`} text={`$3,979.92`} />
        </div>
        <span onClick={()=>{setGenerar('open')}} className="GenerarBtn">
            <Button text={`Generar orden de pago`} background={`var(--tartiary-color)`} types={`button`} />
        </span>
        <BankAccountInput2 language={language} />
        <div className="gatosAction">
          <div className="part1">
            <p>Resultados de búsqueda</p>
          </div>
          <div className="part2">
            <span onClick={()=>{setAprobar('open')}}><Button text={`Aprobar`} background={`var(--secondary-color)`} types={`button`} /></span>
            <span onClick={()=>{setAnular('open')}}><Button text={`Anular`} background={`var(--tartiary-color)`} types={`button`} /></span>
            <span onClick={()=>{setOperacion('open')}}><Button text={`operación`} background={`var(--primary-color)`} types={`button`} /></span>
          </div>
        </div>
        <div className="expense">
          <GatosTable header1={`ID`}  header2={`Country`}  header3={`Concept`}  header4={`Date`} header5={`Value`}  header6={`State`} header7={`Check`} data={GatosInfo} />
        </div>
      </main>
    </>
  )
}

export default GatosFondo;