import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import ContractCreation from '../sectionBlock/Leasing-section/Contract-creation';
import ApprovalDenal from '../sectionBlock/Leasing-section/ApprovalDenal';
import ContractFormalization from '../sectionBlock/Leasing-section/Contract-formalization';
import './pageStyle.css';

const Leasing = ({lang, setLang, language, responsive}) => {
    const navigate = useNavigate();
    const [isNavigate, setNavigate]=useState(false);
    const [tab,setTab] = useState('Contract creation');
    useEffect(()=>{
        const backButton = document.querySelector('.leasingConfig .first-part .buttonwitharrow');
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
        <div className="leasingConfig">
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} colorArrowBtn={`var(--primary-color)`} textArrowBtn={language.global.back}  pageTitle={language.deuda_leasing.title} pageDesc ={language.deuda_leasing.descrip} displaySearch={`show`} />
            <main className='main configuration'>
                <Tab action={setTab} tab1={`Contract creation`} tab2={`Approval/ Denial`} tab3={`Contract formalization`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} tabs1={language.deuda_leasing.tab1} tabs2={language.deuda_leasing.tab2} tabs3={language.deuda_leasing.tab3} />
                {
                    tab === 'Contract creation'
                    ?<ContractCreation language={language} />
                    :<></>
                }
                {
                    tab === 'Approval/ Denial'
                    ?<ApprovalDenal language={language} />
                    :<></>
                }
                {
                    tab === 'Contract formalization'
                    ?<ContractFormalization language={language} />
                    :<></>
                }
            </main>
        </div>
    </>
  )
}

export default Leasing;