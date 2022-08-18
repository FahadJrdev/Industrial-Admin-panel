import React,{useState, useEffect} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import ContractCreationInvestor from '../sectionBlock/ManageInvestor/ContractCreationInvestor';
import ApprovalDenalInvestor from '../sectionBlock/ManageInvestor/ApprovalDenalInvestor';
import DocumentGenerate from '../sectionBlock/ManageInvestor/DocumentGenerate';
import './pageStyle.css';
import axios from "../api/axios.js";
import {toast} from "react-toastify";

const InvestorDetail = ({lang, setLang, language, responsive}) => {
    const navigate = useNavigate();
    const [isUpdate, setUpdate]=useState(false);
    const [AprovalInfo, setAprovalInfo]=useState({});
    const [info,funcioGloal]=useState({})
    const [deud,setDeuda]=useState('');
    const [isNavigate, setNavigate]=useState(false);
    const [IDFondo,setFondo]=useState('');
    const [IdInversor,setInversor]=useState('');
    const [ID,setID]=useState('');
    const [valores,setValor]=useState({})
    const [buscar]=useState(useLocation().search);
    const [funcion,setFuncional] = useState(true);
    const [tab2,setTab2] = useState('Contract creation');
    const [tab,setTab] = useState('Contract creation');
    const callIndividualValue= (id)=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      axios.get("/contractinvInversor/"+id, {},bearerToken)
      .then((response) => {
        if(response.data.APPROVAL){
          let retorno2=response.data.APPROVAL
          setAprovalInfo(retorno2)
          setUpdate(true)
        }else{
          setUpdate(false)
        }
        let retorno=response.data.CONTRATO
        setDeuda(retorno.I_CODIGO)
        setFondo(retorno.FONDO_I_CODIGO)
        setInversor(retorno.INVERSIONISTA_I_CODIGO)
        let cambios={
          Perioricity: retorno.PERIORICITY_INV_INVERSIONISTA,
          Start_date:  retorno.START_DATE_INV_INVERSIONISTA,
          Form_of_payment: retorno.FORM_PAYMENT_INV_INVERSIONISTA,
          Number_of_quotas:retorno.NUMBER_FEES_INV_INVERSIONISTA
        }
        setValor(cambios)
      }).catch((err)=>{
        if(err.response){
          if(err.response.data){
            if(err.response.data.message){
              toast(err.response.data.message)
            }
          }
        }
      })
    }
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
    useEffect(()=>{
        if(buscar){
            var valorBusqueda=buscar.replace("?","")
            setID(valorBusqueda)
            callIndividualValue(valorBusqueda)
            
        }
    },[buscar])
    useEffect(()=>{
      if(info.fondoid){        
       setInversor(info.inverid)
       setDeuda(info.codigo)
       setFondo(info.fondoid)
       callIndividualValue(info.codigo)
      }
   },[info,funcioGloal])
   useEffect(()=>{
    if(deud){
      setTab2(tab)
      setTab2(tab)
      setFuncional(false)
     }else{
      setFuncional(true)
     }
  },[tab,setTab])
  return (
    <>
        <div className="ManageInvestor">
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} colorArrowBtn={`var(--primary-color)`} textArrowBtn={language.global.back}  pageTitle={`Detail of investment contract to investors`} pageDesc={`Administration and management`} displaySearch={`show`} />
            <main className='main configuration'>
                <Tab active={funcion} action={setTab2} tab1={`Contract creation`} tab2={`Approval/ Denial`} tab3={`Document Generate`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} tabs1={language.deuda_leasing.tab1} tabs2={language.deuda_leasing.tab2} tabs3={`Document Generate`} />
                {
                    tab2 === 'Contract creation'
                    ?<ContractCreationInvestor  valorExtraido={valores} valorIdFondo={IDFondo} valorIDInversor={IdInversor}  language={language} Deuda={deud}  isUpdates={isUpdate} funcion={funcioGloal} edit={false}/>
                    :<></>
                }
                {
                    tab2 === 'Approval/ Denial'
                    ?<ApprovalDenalInvestor language={language} AprovalInf={AprovalInfo}  idFondos={IDFondo} idInversors={IdInversor} Deuda={deud} edit={false}/>
                    :<></>
                }
                {
                    tab2 === 'Document Generate' 
                    ?<DocumentGenerate language={language} />
                    :<></>
                }
            </main>
        </div>
    </>
  )
}

export default InvestorDetail;