import React, {useReducer,useState,useEffect} from 'react';
import { Input,SelectVal, ManageProjectTable,ManageProjectInvestorTable} from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import './MP.css';
import { AiFillEdit } from "react-icons/ai";
import { useNavigate} from 'react-router-dom';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import Select from 'react-select' ;

const initialState = {
    Code: '',
    Project_name: '',
    Investment_objective: '',
    Country1: '',
    City1: '',
    Responsible: '',
    Perioricity: '',
    Start_date: '',
    Form_of_payment: '',
    Number_of_fees: ''
  }
  
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }

const ContractCreationProject = ({ language ,valorExtraido,valorIdProyecto,valorIdFondo,valorIdOwner,isUpdates,funcion,Deuda,edit}) => {
    const navigates = useNavigate();
    const [projects,SetAllProject] = useState([]);
    const [facturas,SeFacturas] = useState([]);
    const [IdOwner,setIdOwner] = useState('');
    const [IdFondo,setIdFondo] = useState('');
    const [selected,setSelected] = useState();
    
    const [periooci]=useState([{name:'Mensual',value:1}])
    const [tarif]=useState([{name:'2 dias',value:1},{name:'4 dias',value:2},{name:'8 dias',value:3},{name:'10 dias',value:4}])
    const [Inversionista,setAllInversionista] = useState([]);
    const [state, dispatch] = useReducer(reducer,valorExtraido?valorExtraido:initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const callListProjects = (valorIDProyectos)=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/contractinvprojectProjectWithFund", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                if(valorIDProyectos){
                  let agregado=response.data.showProjectWithFund.find((element)=> element.I_CODIGO===valorIDProyectos)
                  dispatch({ field: "Investment_objective", value: agregado.I_OBJETIVO_INVERSION })
                  dispatch({ field: "Project_name", value: agregado.C_NOMBRE_PROYECTO })
                  dispatch({ field: "Code", value: agregado.I_CODIGO })
                  dispatch({ field: "Country1", value: agregado.I_PAIS })
                  dispatch({ field: "City1", value: agregado.I_CIUDAD })
                  dispatch({ field: "Responsible", value: agregado.C_RESPONSABLE })
                    setSelected({
                      value:agregado.I_CODIGO,
                      label:agregado.C_NOMBRE_PROYECTO,
                      data:agregado
                    })
                }
              
                SetAllProject(response.data.showProjectWithFund.map((valor)=>{
                
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
            setIdOwner(response.data[0].I_CODIGO)
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
    const callApiFundsGet= (id,fondo)=>{

        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      axios.get("/fundsByFundsToInversor/"+id, {},bearerToken)
      .then((response) => {
        setAllInversionista([])
        if(response.status===200){
            setIdFondo(fondo)
            setAllInversionista(response.data.INVERSIONISTAS)
          }
      }).catch((err)=>{
        setAllInversionista([])
        setIdFondo('')
        if(err.response){
          if(err.response.data){
            if(err.response.data.message){
              toast(err.response.data.message)
            }
          }
        }
      })
    }
    const { Code, Project_name, Investment_objective,  Country1, City1, Responsible,  Perioricity, Start_date, Form_of_payment, Number_of_fees} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const SelecProject = (event) => {
        if(event){
          setSelected(event)
            dispatch({ field: "Investment_objective", value: event.data.I_OBJETIVO_INVERSION })
            dispatch({ field: "Project_name", value: event.data.C_NOMBRE_PROYECTO })
            dispatch({ field: "Code", value: event.data.I_CODIGO })
            dispatch({ field: "Country1", value: event.data.I_PAIS })
            dispatch({ field: "City1", value: event.data.I_CIUDAD })
            dispatch({ field: "Responsible", value: event.data.C_RESPONSABLE })
            callApiFundsGet(event.data.I_CODIGO,event.data.FONDO_I_CODIGO)
            callProjectOwner(event.data.I_CODIGO)
        }
      }

      const callApiCreationProjectContact = ()=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      let valor={
        PERIORICITY_INV_PROJECT:Perioricity,
        START_DATE_INV_PROJECT:Start_date,
        FORM_PAYMENT_INV_PROJECT:Form_of_payment,
        NUMBER_FEES_INV_PROJECT:Number_of_fees
      }
            axios.post("/contractinvproject/"+IdOwner+"/"+IdFondo+"/"+Code,valor,bearerToken)
            .then((response) => {
              funcion({
                ownerid:response.data.DATA.OWNER_I_CODIGO,
                codigo:response.data.DATA.id,
                fondoid:response.data.DATA.FONDO_I_CODIGO,
                proyectoid:response.data.PROYECTO_I_CODIGO
              })
              toast("Created Succes");
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

          const opcionBoton=()=>{
            if(Deuda){
              callApiUpdateProjectContr()
            }else{
              callApiCreationProjectContact()
            }
          }
          const callApiUpdateProjectContr = ()=>{
            let bearerToken={
            headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
          }
        let valor={
          PERIORICITY_INV_PROJECT:Perioricity,
          START_DATE_INV_PROJECT:Start_date,
          FORM_PAYMENT_INV_PROJECT:Form_of_payment,
          NUMBER_FEES_INV_PROJECT:Number_of_fees
        }
              axios.put("/contractinvproject/"+Deuda+"/"+IdOwner+"/"+IdFondo+"/"+Code,valor,bearerToken)
              .then((response) => {
                funcion({
                  ownerid:IdOwner,
                  codigo:Deuda,
                  fondoid:IdFondo,
                  proyectoid:Code
                })
                toast("Created Succes");
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



          const callFacturas = ()=>{
            if(Perioricity){
              if(Start_date){
                if(Form_of_payment){
                  if(Number_of_fees){
                    if(Investment_objective){
                      let bearerToken={
                        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
                      }
                          axios.get("/revenuemanagementCuotas/"+Perioricity+"/"+Start_date+"/"+Number_of_fees+"/"+Investment_objective+"/"+Form_of_payment, {},bearerToken)
                          .then((response) => {
                            if(response.status===200){
                              SeFacturas(response.data)
                            }else{
                              SeFacturas([])
                            }
                          }).catch((err)=>{
                              
                            SeFacturas([])
                          })
                    }else{
                      toast("Seleccione un proyecto");

                    }
                    
                  }else{
                    toast("Numero de cuotas necesarias");
                  }
                }else{
                  toast("forma de pago necesarias");
                }
              }else{
                toast("fecha de inicio necesarias");
              }
            }else{
              toast("Periocidad necesarias");
            }
           
        
        }
      useEffect(()=>{
        if(valorExtraido){
          Object.keys(valorExtraido).forEach((valor)=>{
            dispatch({ field: valor, value: valorExtraido[valor]?valorExtraido[valor]:''})
          })
        }
      },[valorExtraido])

      useEffect(()=>{
        if(valorIdProyecto){
          
        setTimeout(()=>{
          callListProjects(valorIdProyecto)
        })
        }
        callListProjects(valorIdProyecto)
      },[valorIdProyecto]);
      useEffect(()=>{
      if(valorIdOwner){
        
      setTimeout(()=>{
        callProjectOwner(valorIdOwner)
      })
      }
    },[valorIdOwner]);
    useEffect(()=>{
      if(valorIdFondo){
      setTimeout(()=>{
        if(valorIdProyecto){
          callApiFundsGet(valorIdProyecto,valorIdFondo)

        }
      })
      }
    },[valorIdFondo]);

    
    const [editing, isEditing] = useState(edit);
    return ( 
        <div className="Contract-creation">
            <div className="editing"><span onClick={()=>{isEditing(!editing)}} ><AiFillEdit /></span></div>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_proyec.information_proejct}</p>
                   
                    <ul className="Esheet">
                      {
                        editing
                        ?<>
                          <li className="select">
                            <label htmlFor="Code">{language.deuda_leasing.project_id}</label>  
                            <Select  isDisabled={isUpdates}  value={selected} options={projects} onChange={SelecProject} />
                          </li>
                        </>
                        :<>
                          <li className="savedInfo">
                            <label>{language.deuda_leasing.project_id}</label>
                            <p>{selected}</p>
                          </li>
                        </>
                      }
                      {
                        editing
                        ?<>
                          <Input  disa={true} label={language.contract_inver_proyec.code} type={`text`} name={`Code`} value={Code} placeholder={``} onChange={onChange} />
                          <Input  disa={true} label={language.contract_inver_proyec.Project_Name} type={`text`} name={`Project_name`} value={Project_name} placeholder={`Enter`} onChange={onChange} />
                          <Input  disa={true} label={language.contract_inver_proyec.inverment_object} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                        </>
                        :<>
                          
                          <li className="savedInfo">
                            <label>{language.contract_inver_proyec.code}</label>
                            <p>{Code}</p>
                          </li>
                          <li className="savedInfo">
                            <label>{language.contract_inver_proyec.Project_Name}</label>
                            <p>{Project_name}</p>
                          </li>
                          <li className="savedInfo">
                            <label>{language.contract_inver_proyec.inverment_object}</label>
                            <p>{Investment_objective}</p>
                          </li>
                        </>
                      }
                    </ul>
                    <ul className="Esheet"> 
                      {
                        editing
                        ?<>
                          <SelectVal  disa={true} label={language.contract_inver_proyec.country} name={`Country1`} value={Country1} onChange={onChange} array={[]} />
                          <SelectVal  disa={true} label={language.contract_inver_proyec.city} name={`City1`} value={City1} placeholder={`select`} onChange={onChange}  array={[]}/>
                          <Input  disa={true} label={language.contract_inver_proyec.responsi} type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
                        </>
                        :<>
                          <li className="savedInfo">
                            <label>{language.contract_inver_proyec.country}</label>
                            <p>{Country1}</p>
                          </li>
                          <li className="savedInfo">
                            <label>{language.contract_inver_proyec.city}</label>
                            <p>{City1}</p>
                          </li>
                          <li className="savedInfo">
                            <label>{language.contract_inver_proyec.responsi}</label>
                            <p>{Responsible}</p>
                          </li>
                        </>
                      }
                    </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_proyec.investorinfo}</p>
                    <ManageProjectInvestorTable header1={language.contract_inver_proyec.datereque} header2={language.contract_inver_proyec.invertorfirstlast} header3={language.contract_inver_proyec.document} header4={language.contract_inver_proyec.country}  header5={language.contract_inver_proyec.city}  header6={language.contract_inver_proyec.investment_amount} investorInfo={Inversionista} />
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_global.inver_terms}</p>
                    <ul className="Esheet">
                        {
                          editing
                          ?<>
                            <SelectVal  disa={ isUpdates} label={language.contract_global.periocity} name={`Perioricity`} value={Perioricity} placeholder={`select`} onChange={onChange} array={periooci}/>
                            <Input  disa={ isUpdates} label={language.contract_global.start_date} type={`date`} name={`Start_date`} value={Start_date} placeholder={`Enter`} onChange={onChange} />
                            <Input  disa={ isUpdates} label={language.contract_global.form_payment} type={`text`} name={`Form_of_payment`} value={Form_of_payment} placeholder={`Enter`} onChange={onChange} />
                            <SelectVal  disa={ isUpdates} label={language.contract_global.number_fee} name={`Number_of_fees`} value={Number_of_fees} placeholder={`select`} onChange={onChange} array={tarif}/>
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_global.periocity}</label>
                              <p>{Perioricity}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_global.start_date}</label>
                              <p>{Start_date}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_global.form_payment}</label>
                              <p>{Form_of_payment}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_global.number_fee}</label>
                              <p>{Number_of_fees}</p>
                            </li>
                          </>
                        }
                    </ul>
                </div>
                <div className="project-submit">
                    <Button text={language.contract_global.generate} background={`var(--tartiary-color)`} types={`button`} click={callFacturas} />
                </div>
            </form>
            <ManageProjectTable header1={language.contract_global.payment_date} header2={language.contract_global.form_payment} header3={`Value`} ProjectInfo={facturas} />
            <div className="Esheet-submit">
              {
                editing
                ?<>
                  {isUpdates?<></>:<><Button text={language.contract_global.create_cont} background={`var(--primary-color)`} types={`button`}  click={opcionBoton}/>
                  </>}
                </>
                :<></>
              }
            </div>
        </div>
    )
}

export default ContractCreationProject;