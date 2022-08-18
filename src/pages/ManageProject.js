import React,{useState, useEffect} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import ContractCreationProject from '../sectionBlock/ManageProject/ContractCreationProject';
import ApprovalDenalProject from '../sectionBlock/ManageProject/ApprovalDenalProject';
import DocumentGenerate from '../sectionBlock/ManageProject/DocumentGenerate';
import './pageStyle.css';
import axios from "../api/axios.js";
import {toast} from "react-toastify";

const ManageProject = ({lang, setLang, language, responsive}) => {
    const navigate = useNavigate();
    const [isNavigate, setNavigate]=useState(false);
    const [isUpdate, setUpdate]=useState(false);
    const [AprovalInfo, setAprovalInfo]=useState({});
    const [info,funcioGloal]=useState({})
    const [deud,setDeuda]=useState('');
    const [idProjectDeu,setID]=useState('');
    const [idFondo,setIdFondo]=useState('');
    const [idOwner,setIdOwner]=useState('');
    const [valores,setValor]=useState({})
    const [buscar]=useState(useLocation().search);
    const [funcion,setFuncional] = useState(true);
    const [tab2,setTab2] = useState('Contract creation');
    const [tab,setTab] = useState('Contract creation');
    const callIndividualValue= (id)=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      axios.get("/contractinvproject/"+id, {},bearerToken)
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
        setIdFondo(retorno.FONDO_I_CODIGO)
        setIdOwner(retorno.OWNER_I_CODIGO)
        setID(retorno.PROYECTO_I_CODIGO)
        let cambios={
          Perioricity: retorno.PERIORICITY_INV_PROJECT,
          Start_date:  retorno.START_DATE_INV_PROJECT,
          Form_of_payment: retorno.FORM_PAYMENT_INV_PROJECT,
          Number_of_fees:retorno.NUMBER_FEES_INV_PROJECT
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
        const backButton = document.querySelector('.ManageProject .first-part .buttonwitharrow');
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
       setDeuda(info.codigo)
       setIdFondo(info.fondoid)
       setIdOwner(info.ownerid)
       setID(info.proyectoid)
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
        <div className="ManageProject">
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} colorArrowBtn={`var(--primary-color)`} textArrowBtn={language.global.back}  pageTitle={language.contract_inver_proyec.title} displaySearch={`show`} />
            <main className='main configuration'>
                <Tab active={funcion} action={setTab2} tab1={`Contract creation`} tab2={`Approval/ Denial`} tab3={`Document Generate`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} tabs1={language.deuda_leasing.tab1} tabs2={language.deuda_leasing.tab2} tabs3={`Document Generate`} />
                {
                    tab2 === 'Contract creation' 
                    ?<ContractCreationProject language={language} valorExtraido={valores} valorIdProyecto={idProjectDeu} valorIdFondo={idFondo} valorIdOwner={idOwner} Deuda={deud}  isUpdates={isUpdate} funcion={funcioGloal} edit={true} />
                    :<></>
                }
                {
                    tab2 === 'Approval/ Denial' 
                    ?<ApprovalDenalProject language={language} AprovalInf={AprovalInfo} idFondos={idFondo} idproyecto={idProjectDeu} valoridOwner={idOwner} Deuda={deud} edit={true} />
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

export default ManageProject;