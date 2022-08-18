import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../sectionBlock/Navigation/Navbar';
import Header from '../sectionBlock/Header';
import Tab from '../component/tab';
import ContractCreation from '../sectionBlock/Leasing-section/Contract-creation';
import ApprovalDenal from '../sectionBlock/Leasing-section/ApprovalDenal';
import DocumentGenerate from '../sectionBlock/Leasing-section/Document-generate';
import GenerationOfInvoices from '../sectionBlock/Leasing-section/Generation-of-invoices';
import './pageStyle.css';
import { useLocation} from "react-router-dom";
import axios from "../api/axios.js";
import {toast} from "react-toastify";

const Leasing = ({lang, setLang, language, responsive}) => {
    const navigate = useNavigate();
    const [isNavigate, setNavigate]=useState(false);
    const [isUpdate, setUpdate]=useState(false);
    const [AprovalInfo, setAprovalInfo]=useState({});
    const [buscar]=useState(useLocation().search);
    const [idLeasig,setID]=useState('')
    const [idOwner,setOwner]=useState('')
    const [info,funcioGloal]=useState({})
    const [idDeuda,setDeuda]=useState('')
    const [idProject,setProject]=useState('')
    const [valor,setValor]=useState({})
    const [funcion,setFuncional] = useState(true);
    const [tab2,setTab2] = useState('Contract creation');
    const [tab,setTab] = useState('Contract creation');
    const callIndividualValue= (id)=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      axios.get("/contractmanagement/"+id, {},bearerToken)
      .then((response) => {
        if(response.data.APPROVAL){
          let retorno2=response.data.APPROVAL
          setAprovalInfo(retorno2)
          setUpdate(true)
        }else{
          setUpdate(false)
        }
        let retorno=response.data.CONTRATO
        let idproyecto=retorno.PROYECTO_I_CODIGO
        setProject(idproyecto)
        let id_Owner=retorno.OWNER_I_CODIGO
        setOwner(id_Owner)
        setDeuda(retorno.I_CODIGO)
        let valor={
            Date_Of_Reques: retorno.created_at.split("T")[0],
            Debtors_Name_And_Surname: '',
            Document_type: '',
            Document_type2: '',
            Document: '',
            moun_interes:retorno.INTERES_CREDITO,
            Credit_line:retorno.LINEA_CREDITO,
            Credit_quota: retorno.CUPO_CREDITO,
            Maximum_period: retorno.PLAZO_MAXIMO,
            Requested_amount: retorno.MONTO_SOLICITADO,
            Period1: retorno.PLAZO,
            Perioricidad: retorno.PERIOCIDAD,
            Forma_de_pago: retorno.FORMA_PAGO,
            Type_grace: retorno.TIPO_GRACIA,
            Period2: retorno.PERIODO,
            Format: retorno.FORMATO,
            Interest_type: retorno.INTEREST_TYPE,
            Interest_rate_type: retorno.INTEREST_RATE_TYPE,
            Interest_rate_historic: retorno.INTEREST_RATE_HISTORIC,
            Deviation: retorno.DEVIATION,
            Period3: retorno.PERIOD,
            Gradient_type: retorno.GRADIENT_TYPE,
            Gradient_value: retorno.GRADIENT_VALUE,
            Type1: retorno.ATTRIBUTE_TYPE,
            Value: retorno.ATTRIBUTE_VALUE,
            Type2: retorno.ATTRIBUTE_VALUE_DOS,
            Shape: retorno.ATTRIBUTE_SHAPE,
            Fees: retorno.ATTRIBUTE_FEES
          }
          setValor(valor)
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
    useEffect(()=>{
     if(info.projectid){
      setOwner(info.ownerid)
      setDeuda(info.codigo)
      setProject(info.projectid)
      callIndividualValue(info.codigo)
     }
  },[info,funcioGloal])
    useEffect(()=>{
        if(buscar){
            var valorBusqueda=buscar.replace("?","")
            setID(valorBusqueda)
            callIndividualValue(valorBusqueda)
            
        }
    },[buscar])
    useEffect(()=>{
      console.log(idDeuda)
     if(idDeuda){
      setTab2(tab)
      setFuncional(false)
     }else{
      setFuncional(true)
     }
   },[tab,setTab,idDeuda])
  return (
    <>
        <div className="leasingConfig">
            <Navbar responsive={responsive} lang={lang} setLang={setLang} language={language} />
            <Header responsive={responsive} lang={lang} setLang={setLang} displayArrowBtn={`show`} colorArrowBtn={`var(--primary-color)`} textArrowBtn={language.global.back}  pageTitle={language.deuda_leasing.title} pageDesc ={language.deuda_leasing.descrip} displaySearch={`show`} />
            <main className='main configuration'>
                <Tab active={funcion} action={setTab2} tab1={`Contract creation`} tab2={`Approval/ Denial`} tab3={`Document Generate`} hideTab4={`dn`} hideTab5={`dn`} hideTab6={`dn`} hideTab7={`dn`} hideCustomizer={`dn`} tabs1={language.deuda_leasing.tab1} tabs2={language.deuda_leasing.tab2} tabs3={`Document Generate`} />
                {
                    tab2 === 'Contract creation'
                    ?<ContractCreation language={language} valorData={valor} valorIDProyecto={idProject} valorIDOwner={idOwner} isUpdates={isUpdate} Deuda={idDeuda}  funcion={funcioGloal} edit={true}/>
                    :<></>
                }
                {
                    tab2 === 'Approval/ Denial' 
                    ?<ApprovalDenal language={language} Deuda={idDeuda}AprovalInfo={AprovalInfo} id_proyectos={idProject} id_owners={idOwner} edit={true} />
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

export default Leasing;