import React from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {Button} from '../component/buttons'
import {ConfigCard} from '../component/cards';
import {Link} from 'react-router-dom';
import './pageStyle.css';

const Revenues = ({lang, setLang, language, responsive}) => {
  return (
    <>
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Revenues`} pageDesc ={`Revenue management`} displaySearch={`show`} />
      <main className='main revenues'>  
        <ConfigCard language={language} /> 
        <div className="Esheet-submit">
          <Link to="/Billing">
            <Button text={`Invoicing`} background={`var(--primary-color)`} types={`button`} />
          </Link>
        </div>
      </main>
    </>
  )
}

export default Revenues;