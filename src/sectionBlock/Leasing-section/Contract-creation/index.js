import React, {useState, useReducer,useEffect} from 'react';
import './CC.css';
import { FinancialHead, Input, SelectVal } from '../Leasing-Component';
import {Button, Pill} from '../../../component/buttons';
import LeasingParameter from '../Leasing-Parameter';
import Select from 'react-select' ;

import { useNavigate} from 'react-router-dom';
import axios from "../../../api/axios.js";
import {toast} from "react-toastify";
const ContractCreation = ({language}) => {
  const navigates = useNavigate();
  const initialState = {
    Date_Of_Reques: '',
    Debtors_Name_And_Surname: '',
    Document_type: '',
    Document_type2: '',
    Document: '',
    Credit_line: '',
    Credit_quota: '',
    Maximum_period: '',
    Requested_amount: '',
    Period1: '',
    Perioricidad: '',
    Forma_de_pago: '',
    Type_grace: '',
    Period2: '',
    Format: '',
    Interest_type: '',
    Interest_rate_type: '',
    Interest_rate_historic: '',
    Deviation: '',
    Period3: '',
    Gradient_type: '',
    Gradient_value: '',
    Type1: '',
    Value: '',
    Type2: '',
    Shape: '',
    Fees: '',
    Tipo_identificion1: '',
    Identity1: '',
    name1: '',
    Telephone1: '',
    city1: '',
    address1: '',
    Tipo_identificion2: '',
    Identity2: '',
    name2: '',
    Telephone2: '',
    city2: '',
    address2: '',
    Tipo_identificion3: '',
    Identity3: '',
    name3: '',
    Telephone3: '',
    city3: '',
    address3: '',
    Tipo_identificion4: '',
    Identity4: '',
    name4: '',
    Telephone4: '',
    city4: '',
    address4: ''
  }
  
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }
  

  const [projects,SetAllProject] = useState([]);
  const [openExtraConcept, setOpenExtraConcept] = useState(false);
  const [one]=useState('')
  const [id_proyecto,setIdProyecto]=useState('')
  const [document_type_array]=useState([{name:'Cedula',value:1},{name:'NIT',value:2}])
  const [line_cre]=useState([{name:'Credio 1',value:1},{name:'Credio 2',value:2}])
  const [max_perio]=useState([{name:'Max 1',value:1},{name:'Max 2',value:2}])
  const [perio]=useState([{name:'Perio 1',value:1},{name:'Perio2',value:2}])
  const [periooci]=useState([{name:'Periocidad 1',value:1},{name:'Periocidad 2',value:2}])
  const [formpay]=useState([{name:'Pago Efectivo',value:1},{name:'Transfer',value:2}])
  const [typgra]=useState([{name:'Gracia 1',value:1},{name:'Gracia 2',value:2}])
  const [format]=useState([{name:'Formato 1',value:1},{name:'Formato 2',value:2}])
  const [tip1]=useState([{name:'Tipo 1',value:1},{name:' Tipo 2',value:2}])
  const [tip2]=useState([{name:'Tipos 1',value:1},{name:'Tipos 2',value:2}])
  const [tip2forma]=useState([{name:'formato tipo 1',value:1},{name:'formato tipo 2',value:2}])
  const [tipointer]=useState([{name:'tipo interes 1',value:1},{name:'tipo interes 2',value:2}])
  const [tipotasainter]=useState([{name:'Tasa 1',value:1},{name:'Tasa 2',value:2}])
  const [tasaintehist]=useState([{name:'Historico 1',value:1},{name:'Historico 2',value:2}])
  const [tipodegrada]=useState([{name:'Tipo Degra 1',value:1},{name:'Tipo Degra 2',value:2}])
  const [id_Owner,setIdOwner]=useState('')
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const {  Date_Of_Reques, Debtors_Name_And_Surname, Document_type,Document_type2, Document,Document2, Credit_line, Credit_quota, Maximum_period, Requested_amount, Period1, Perioricidad, Forma_de_pago, Type_grace, Period2, Format, Interest_type, Interest_rate_type, Interest_rate_historic, Deviation, Period3, Gradient_type, Gradient_value, 
    Type1, Value, Type2, Shape, Fees, Tipo_identificion1, Identity1, name1, Telephone1, city1, address1, Tipo_identificion2, Identity2, name2, Telephone2, city2, address2, Tipo_identificion3, Identity3, name3, Telephone3, city3, address3, Tipo_identificion4, Identity4, name4, Telephone4, city4, address4 } = state;
  const handleSubmit = (event) => {
      event.preventDefault();
  }
  const [attemptToAddParameter, setAttemptToAddParameter] = useState('close');

  setTimeout(()=>{
    const backButton = document.querySelector('.adding-investor .header-add button');
    if(backButton){
      backButton.addEventListener('click',()=>{
        setAttemptToAddParameter('close');
      })
    }
    const addingParamrOverlay = document.querySelector('.adding-investor-overlay');
    if(addingParamrOverlay){
      addingParamrOverlay.addEventListener('click',()=>{
        setAttemptToAddParameter('close');
      })
    }
    const addParam = document.querySelector('.financial-head button');
    if(addParam){
      addParam.addEventListener('click',()=>{
        setAttemptToAddParameter('open');
      })
    }
    const pill = document.querySelector(".graceParam .switch");
    if(pill){
        pill.addEventListener('click',()=>{
            setOpenExtraConcept(!openExtraConcept);
        })
    }
  })


  const callApiCreationDeb = ()=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
  let valor={
    LINEA_CREDITO:Credit_line,
    CUPO_CREDITO:Credit_quota,
    PLAZO_MAXIMO:Maximum_period,
    MONTO_SOLICITADO:Requested_amount,
    PLAZO:Period1,
    PERIOCIDAD:Perioricidad,
    FORMA_PAGO:Forma_de_pago,
    TIPO_GRACIA:Type_grace,
    PERIODO:Period2,
    FORMATO:Format,
    INTEREST_TYPE:openExtraConcept?Interest_type:'',

    INTEREST_RATE_TYPE:openExtraConcept?Interest_rate_type:'',
    INTEREST_RATE_HISTORIC:openExtraConcept?Interest_rate_historic:'',
    DEVIATION:openExtraConcept?Deviation:'',
    PERIOD:openExtraConcept?Period3:'',
    GRADIENT_TYPE:openExtraConcept?Gradient_type:'',
    GRADIENT_VALUE:openExtraConcept?Gradient_value:'',
    ATTRIBUTE_TYPE:openExtraConcept?'':Type1,
    ATTRIBUTE_VALUE:openExtraConcept?'':Value,
    ATTRIBUTE_VALUE_DOS:openExtraConcept?'':Type2,
    ATTRIBUTE_SHAPE:openExtraConcept?'':Shape,
    ATTRIBUTE_FEES:openExtraConcept?'':Fees,
  }
        axios.post("/contractmanagement/"+id_Owner+"/"+id_proyecto,valor,bearerToken)
        .then((response) => {
          toast("Created Succes");
          navigates(-1)
        }).catch((err)=>{
          if(err.response){
            if(err.response.data){
              if(err.response.status===401){
                navigates('/')
              }else{
                if(err.response.data.message){
                  toast(err.response.data.message)
                }else{
                  let message="";
                  let valorKeys=Object.keys(err.response.data.error)
                  valorKeys.forEach(element => {
                    err.response.data.error[element].forEach((mensaje)=>{
                      message+=mensaje+" ,"
                    })
                  });
                  
                  toast(message);
                }
              }
              
            }
          }
        })
      }

      const callListProjects = ()=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/project", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                SetAllProject(response.data.map((valor)=>{
                  return {
                    value:valor.I_CODIGO,
                    label:valor.C_NOMBRE_PROYECTO,
                    data:valor
                  }
               
              }))
              }else{
                SetAllProject([])
              }
            }).catch((err)=>{
                
              SetAllProject([])
            })
    
    }
    const callProjectOwner=(idProject)=>{
      let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
      axios.get("/projectowner/"+idProject, {},bearerToken)
    .then((response) => {
      if(response.status===200){
        if(response.data.length>0){
          var valorJsonCorporativa=response.data[0]['INFORMACION_COORPORATIVA']
          setIdOwner(response.data[0].I_CODIGO)
          dispatch({ field: 'Debtors_Name_And_Surname', value: JSON.parse(valorJsonCorporativa)['NAMES']+" "+  JSON.parse(valorJsonCorporativa)['SURNAMES']})
          dispatch({ field: 'Document_type', value: JSON.parse(valorJsonCorporativa)['TYPE_IDENTIFICATION']})
          dispatch({ field: 'Document', value: JSON.parse(valorJsonCorporativa)['IDENTIFICATION']})
        }else{
          toast("No owner in the project")
        }
       
      }
    }).catch((err)=>{  
      if(err.response){
      if(err.response.data){
        if(err.response.status===401){
          navigates('/')
        }else{
          if(err.response.data.message){
            toast(err.response.data.message)
          }else{
            let message="";
            let valorKeys=Object.keys(err.response.data.error)
            valorKeys.forEach(element => {
              err.response.data.error[element].forEach((mensaje)=>{
                message+=mensaje+" ,"
              })
            });
            
            toast(message);
          }
        }
        
      }
    }
    })
    }

    const SelecProject = (event) => {
      if(event){
       setIdProyecto(event.data.I_CODIGO)
       callProjectOwner(event.data.I_CODIGO)
      }
    }
      useEffect(()=>{
        callListProjects()
      },[one]);
  return (
    <>
      {
        attemptToAddParameter === `open`
        ?<LeasingParameter title={language.deuda_leasing.payment_plan} language={language} />
        :<></>
      }

      <div className="Contract-creation">
        <FinancialHead text={language.deuda_leasing.debtor_info} btntext={language.deuda_leasing.payment_plan} />
        <form action="" method="post" onSubmit={handleSubmit}>
            <ul className="Esheet">
                    <li>
                      <label htmlFor="Code">{language.deuda_leasing.project_id}</label>  
                      <Select options={projects} onChange={SelecProject} />
                    </li>
                <Input label={language.deuda_leasing.date_reques} type={`date`} name={`Date_Of_Reques`} value={Date_Of_Reques} placeholder={`DD/MM/YYYY`} onChange={onChange} />
                               </ul>
            <ul className="Esheet"> 
            <Input label={language.deuda_leasing.debtor_name_surname} disa={true} type={`text`} name={`Debtors_Name_And_Surname`} value={Debtors_Name_And_Surname} placeholder={`Enter Name`} onChange={onChange} />
            <SelectVal label={language.deuda_leasing.debtor_document_type} disa={true}  name={`Document_type`} value={Document_type} placeholder={`Select`} onChange={onChange} value1={`Document_type-1`} array={document_type_array}/>
            <Input label={language.deuda_leasing.debtor_document_} disa={true} type={`text`} name={`Document`} value={Document } placeholder={`Enter`} onChange={onChange} />
      

                     </ul>
           {false?<>
            <div className="leasing-info-table">
                <div className="title">{`Co-debtor(s) information`}</div>
                <div className="tableBody">
                    <div className="responsiveFix">
                        <div className="responsiveAuto">
                            <ul>
                                <div className="list-header list-item">Tipo identifición</div>
                                <div className="list-header list-item">Identity</div>
                                <div className="list-header list-item">Full names and surnames </div>
                                <div className="list-header list-item">Telephone</div>
                                <div className="list-header list-item">City</div>
                                <div className="list-header list-item">Address</div>
                            </ul>
                            <ul>
                                <div className="list-item">
                                  <SelectVal label={``} name={`Tipo_identificion1`} value={Tipo_identificion1} placeholder={`Select`} onChange={onChange} value1={`A.A`} value2={`B.B`} value3={`C.C`} value4={`D.D`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item list-color-item">
                                  <Input label={``} type={`text`} name={`Identity1`} value={Identity1} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`name1`} value={name1} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`number`} name={`Telephone1`} value={Telephone1} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <SelectVal label={``} name={`city1`} value={city1} placeholder={`Select`} onChange={onChange} value1={`Tokyo`} value2={`Barcelona`} value3={`NewYork`} value4={`Torento`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`address1`} value={address1} placeholder={`Enter`} onChange={onChange} />
                                </div>
                            </ul>
                            <ul>
                                <div className="list-item">
                                  <SelectVal label={``} name={`Tipo_identificion2`} value={Tipo_identificion2} placeholder={`Select`} onChange={onChange} value1={`A.A`} value2={`B.B`} value3={`C.C`} value4={`D.D`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item list-color-item">
                                  <Input label={``} type={`text`} name={`Identity2`} value={Identity2} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`name2`} value={name2} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`number`} name={`Telephone2`} value={Telephone2} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <SelectVal label={``} name={`city2`} value={city2} placeholder={`Select`} onChange={onChange} value1={`Tokyo`} value2={`Barcelona`} value3={`NewYork`} value4={`Torento`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`address2`} value={address2} placeholder={`Enter`} onChange={onChange} />
                                </div>
                            </ul>
                            <ul>
                                <div className="list-item">
                                  <SelectVal label={``} name={`Tipo_identificion3`} value={Tipo_identificion3} placeholder={`Select`} onChange={onChange} value1={`A.A`} value2={`B.B`} value3={`C.C`} value4={`D.D`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item list-color-item">
                                  <Input label={``} type={`text`} name={`Identity3`} value={Identity3} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`name3`} value={name3} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`number`} name={`Telephone3`} value={Telephone3} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <SelectVal label={``} name={`city3`} value={city3} placeholder={`Select`} onChange={onChange} value1={`Tokyo`} value2={`Barcelona`} value3={`NewYork`} value4={`Torento`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`address3`} value={address3} placeholder={`Enter`} onChange={onChange} />
                                </div>
                            </ul>
                            <ul>
                                <div className="list-item">
                                  <SelectVal label={``} name={`Tipo_identificion4`} value={Tipo_identificion4} placeholder={`Select`} onChange={onChange} value1={`A.A`} value2={`B.B`} value3={`C.C`} value4={`D.D`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item list-color-item">
                                  <Input label={``} type={`text`} name={`Identity4`} value={Identity4} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`name4`} value={name4} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`number`} name={`Telephone4`} value={Telephone4} placeholder={`Enter`} onChange={onChange} />
                                </div>
                                <div className="list-item">
                                  <SelectVal label={``} name={`city4`} value={city4} placeholder={`Select`} onChange={onChange} value1={`Tokyo`} value2={`Barcelona`} value3={`NewYork`} value4={`Torento`} hideValue5={`dn`}/>
                                </div>
                                <div className="list-item">
                                  <Input label={``} type={`text`} name={`address4`} value={address4} placeholder={`Enter`} onChange={onChange} />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
           
           </>:<></>} 
            <p className="inputsTitle">{language.deuda_leasing.credit_Information}</p>
            <ul className="Esheet">
                <SelectVal label={language.deuda_leasing.credit_line} name={`Credit_line`} value={Credit_line} placeholder={`Select`} onChange={onChange} array={line_cre}/>
                <Input label={language.deuda_leasing.credit_quota} type={`number`} name={`Credit_quota`} value={Credit_quota} placeholder={`Enter`} onChange={onChange} />
                <SelectVal label={language.deuda_leasing.credit_maximum_period} name={`Maximum_period`} value={Maximum_period} placeholder={`Select`} onChange={onChange} array={max_perio}/>
                <Input label={language.deuda_leasing.credit_requesamount} type={`number`} name={`Requested_amount`} value={Requested_amount} placeholder={`Enter`} onChange={onChange} />
                <SelectVal label={language.deuda_leasing.credit_period} name={`Period1`} value={Period1} placeholder={`Select`} onChange={onChange} array={perio}/>
            </ul>
            <ul className="Esheet">
                <SelectVal label={language.deuda_leasing.credit_periodicity} name={`Perioricidad`} value={Perioricidad} placeholder={`Select`} onChange={onChange} array={periooci}/>
                <SelectVal label={language.deuda_leasing.credit_waypay} name={`Forma_de_pago`} value={Forma_de_pago} placeholder={`Select`} onChange={onChange} array={formpay}/>
            </ul>
            <p className="inputsTitle">{language.deuda_leasing.grace_parameters}</p>
            <ul className="Esheet">
                <SelectVal label={language.deuda_leasing.grace_typegrace} name={`Type_grace`} value={Type_grace} placeholder={`Select`} onChange={onChange} array={typgra}/>
                <SelectVal label={language.deuda_leasing.grace_Period} name={`Period2`} value={Period2} placeholder={`Select`} onChange={onChange} array={perio}/>
                <SelectVal label={language.deuda_leasing.grace_Format} name={`Format`} value={Format} placeholder={`Select`} onChange={onChange} array={format}/>
            </ul>
            <ul className="Esheet">
                <SelectVal label={language.deuda_leasing.grace_document_type} name={`Document_type2`} value={Document_type2} placeholder={`Select`} onChange={onChange} array={document_type_array}/>
                <Input label={language.deuda_leasing.grace_document} type={`text`} name={`Document2`} value={Document2} placeholder={`Enter`} onChange={onChange} />
            </ul>
            <div className="graceParam">
                <p className="inputsTitle">{language.deuda_leasing.concept}</p>
                <p className="small-text">{language.deuda_leasing.concept_financed}</p>
                <Pill />
                <p className="small-text">{language.deuda_leasing.concept_discounted}</p>
            </div>
            {
              openExtraConcept?<>
               <div className={`extraConcept`}>
                <p className="small-text">{language.deuda_leasing.financed_atribute}</p>
                <ul className="Esheet">
                    <SelectVal label={language.deuda_leasing.financed_type_interested} name={`Interest_type`} value={Interest_type} placeholder={`Select`} onChange={onChange} array={tipointer}/>
                    <SelectVal label={language.deuda_leasing.financed_Interested_rate} name={`Interest_rate_type`} value={Interest_rate_type} placeholder={`Select`} onChange={onChange} array={tipotasainter}/>
                    <SelectVal label={language.deuda_leasing.financed_rate_historic} name={`Interest_rate_historic`} value={Interest_rate_historic} placeholder={`Select`} onChange={onChange} array={tasaintehist}/>
                    <Input type={`number`} label={language.deuda_leasing.financed_deviation} name={`Deviation`} value={Deviation} placeholder={`Select`} onChange={onChange} />
                    <Input type={`number`} label={language.deuda_leasing.financed_period} name={`Period3`} value={Period3} placeholder={`Select`} onChange={onChange} />
                    <SelectVal label={language.deuda_leasing.financed_gradient} name={`Gradient_type`} value={Gradient_type} placeholder={`Select`} onChange={onChange} array={tipodegrada}/>
                </ul>
                <ul className="Esheet">
                    <Input type={`number`} label={language.deuda_leasing.financed_gradientvalue} name={`Gradient_value`} value={Gradient_value} placeholder={`Enter`} onChange={onChange} />
                </ul>
             </div>
              </>:<>
              <div className={`extraConcept `}>
                <p className="small-text">{language.deuda_leasing.disconted_attribute}</p>
                <ul className="Esheet">
                    <SelectVal label={language.deuda_leasing.disconted_type} name={`Type1`} value={Type1} placeholder={`Select`} onChange={onChange} array={tip1}/>
                    <Input type={`number`} label={language.deuda_leasing.disconted_value} name={`Value`} value={Value} placeholder={`Enter`} onChange={onChange} />
                </ul>
                <ul className="Esheet">
                    <SelectVal label={language.deuda_leasing.disconted_type} name={`Type2`} value={Type2} placeholder={`Select`} onChange={onChange} array={tip2}/>
                    <SelectVal label={language.deuda_leasing.disconted_shape} name={`Shape`} value={Shape} placeholder={`Select`} onChange={onChange} array={tip2forma}/>
                    <Input type={`number`} label={language.deuda_leasing.disconted_fees} name={`Fees`} value={Fees} placeholder={`Enter`} onChange={onChange} />
                </ul>
           
                </div>
              
              </>
            }
           
           
            <div className="Esheet-submit">
                <Button text={language.global.save} background={`var(--primary-color)`} types={`button`} click={callApiCreationDeb} />
            </div>
        </form>
      </div>
    </>
  )
}

export default ContractCreation;