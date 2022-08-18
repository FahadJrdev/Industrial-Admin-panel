import React from 'react';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import {InvestorCard} from '../component/cards';
import {ExpenseTable} from '../component/table';
import {ExpensesInfo} from '../data/InvestorInfo';
import './pageStyle.css';

const Expenses = ({lang, setLang, language, responsive}) => {
  return (
    <>
      <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
      <Header responsive={responsive} lang={lang} setLang={setLang} pageTitle={`Expenses`} pageDesc ={language.dashboard.general_indicators} displaySearch={`show`} />
      <main className='main Fondos configuration Expenses'>
        <div className="cards grid-container">   
          <InvestorCard key={1} color={`primary-color`}  title={`Annual Expense`} text={`$3,979.92`} />
          <InvestorCard key={2} color={`secondary-color`}  title={`Monthly expense`} text={`$3,979.92`} />
          <InvestorCard key={3} color={`tartiary-color`}  title={`Daily expense`} text={`$3,979.92`} />
        </div>
        <div className="expense">
          <ExpenseTable key={1} language={language} header1={`Nombre`} header2={`N° total de gastos`} header3={`Value`} header4={`Actions`} data={ExpensesInfo}/>
        </div>
      </main>
    </>
  )
}

export default Expenses;