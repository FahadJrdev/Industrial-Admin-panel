import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import ContractCreationInvestor from '../sectionBlock/ManageInvestor/ContractCreationInvestor';
import ApprovalDenalInvestor from '../sectionBlock/ManageInvestor/ApprovalDenalInvestor';
import ContractFormalizationInvestor from '../sectionBlock/ManageInvestor/ContractFormalizationInvestor';
import './pageStyle.css';

const ManageInvestor = ({lang, setLang, language, responsive}) => {
    const navigate = useNavigate();
    const [isNavigate, setNavigate]=useState(false);
    const [tab,setTab] = useState('Contract creation');
    useEffect(()=>{
        const backButton = document.querySelector('.ManageInvestor .first-part .buttonwitharrow');
        if(backButton){
        backButton.addEventListener('click',() => {
            setNavigate(!isNavigate);
        });
        if(isNavigate){
            navigate(-1);
        }
        }
    },[navigate,isNavigate,setNavigate])
  return (
    <>
        <div className="ManageInvestor">
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} colorArrowBtn={`var(--primary-color)`} textArrowBtn={language.global.back}  pageTitle={language.contract_inver_invest.title} displaySearch={`show`} />
            <main className='main configuration'>
                <Tab action={setTab} tab1={`Contract creation`} tab2={`Approval/ Denial`} tab3={`Contract formalization`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} tabs1={language.deuda_leasing.tab1} tabs2={language.deuda_leasing.tab2} tabs3={language.deuda_leasing.tab3} />
                {
                    tab === 'Contract creation'
                    ?<ContractCreationInvestor language={language} />
                    :<></>
                }
                {
                    tab === 'Approval/ Denial'
                    ?<ApprovalDenalInvestor language={language} />
                    :<></>
                }
                {
                    tab === 'Contract formalization'
                    ?<ContractFormalizationInvestor language={language} />
                    :<></>
                }
            </main>
        </div>
    </>
  )
}

export default ManageInvestor;