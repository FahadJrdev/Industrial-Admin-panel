import React, {useReducer,useEffect,useState} from 'react';
import { Input, SelectVal, ManageProjectTable} from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import { AiFillEdit } from "react-icons/ai";
import { useNavigate} from 'react-router-dom';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import Select from 'react-select' ;

const initialState = {
    Investment_objective: '',
    Country1: '',
    City1: '',
    Investment_amount: '',
    Date_of_request: '',
    Investors_first_and_last_names: '',
    Type_of_document: '',
    Document: '',
    Country2: '',
    City2: '',
    Perioricity: '',
    Start_date: '',
    Form_of_payment: '',
    Number_of_quotas: ''
  }
  
  function reducer(state, { field, value }) {
      return {
          ...state,
          [field]: value
      }
  }

const ContractCreationInvestor = ({ language ,valorExtraido,valorIdFondo,valorIDInversor,isUpdates,funcion,Deuda,edit}) => {
    const navigates = useNavigate();
    const [facturas,SeFacturas] = useState([]);
    const [allFund,setAllFund]=useState([])
    const [fondoSelec,setFondoSel]=useState({})
    const [InverSele,setInvrsorSel]=useState({})
    const [IDFondo,setFondoID]=useState('')
    const [IdInversor,setInversorID]=useState('')
    const [allInversors,setAllInversors]=useState([])
    
    const [periooci]=useState([{name:'Mensual',value:1}])
    const [tarif]=useState([{name:'2 dias',value:1},{name:'4 dias',value:2},{name:'8 dias',value:3},{name:'10 dias',value:4}])
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const {  Investment_objective,  Country1, City1, Investment_amount, Date_of_request, Investors_first_and_last_names, Type_of_document, Document, Country2 , City2, Perioricity, Start_date, Form_of_payment, Number_of_quotas} = state;
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const callListFundsWithInvestor = ()=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/fundsWithInvestor", {},bearerToken)
            .then((response) => {
              if(response.status===200){
                if(valorIdFondo){
                  let valorRetornoSelec=response.data.fundsByFundsToInversor.find((element)=> element.I_CODIGO===valorIdFondo)
                  setFondoSel( {
                    value:valorRetornoSelec.I_CODIGO,
                    label:valorRetornoSelec.C_NOMBRE,
                    data:valorRetornoSelec
                  })
                  setFondoID(valorRetornoSelec.I_CODIGO)
                  dispatch({ field: "Investment_objective", value: valorRetornoSelec.D_VALOR_FONDO })
                  dispatch({ field: "Investment_amount", value: valorRetornoSelec.D_VALOR_INVERTIDO })
                  callListInversorInFunds(valorRetornoSelec.I_CODIGO)
                }
                setAllFund(response.data.fundsByFundsToInversor.map((valor)=>{
                    return {
                      value:valor.I_CODIGO,
                      label:valor.C_NOMBRE,
                      data:valor
                    }
                 
                }))
              }else{
                setAllFund([])
              }
            }).catch((err)=>{
                setAllFund([])  
            })
    
    }
    const callListInversorInFunds = (id)=>{
        let bearerToken={
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
            axios.get("/contractinvInversorFundWithInversionista/"+id, {},bearerToken)
            .then((response) => {
              if(response.status===200){
                if(valorIDInversor){
                  let valorRetornoSelec=response.data.showByFundWithInversionista.find((element)=> element.ID===valorIDInversor)
                  let valorCorporativa=valorRetornoSelec.INFORMACION_COORPORATIVA
                  setInvrsorSel( {
                    value:valorRetornoSelec.ID,
                    label:JSON.parse(valorCorporativa)['COMPANY_NAME'],
                    data:valorRetornoSelec
                  }) 
                  setInversorID(valorRetornoSelec.ID)
                  dispatch({ field: "Investors_first_and_last_names", value: JSON.parse(valorCorporativa)['COMPANY_NAME'] })
                  dispatch({ field: "Document", value: JSON.parse(valorCorporativa)['NIT'] })
                  dispatch({ field: "Country2", value: valorRetornoSelec.COUNTRY })
                  dispatch({ field: "City2", value: valorRetornoSelec.CITY })
                }
                setAllInversors(response.data.showByFundWithInversionista.map((valor)=>{
                    let valorCorporativa=valor.INFORMACION_COORPORATIVA
                    return {
                      value:valor.ID,
                      label:JSON.parse(valorCorporativa)['COMPANY_NAME'],
                      data:valor
                    }
                }))
              }else{
                setAllInversors([])
              }
            }).catch((err)=>{
                setAllInversors([])  
            })
    
    }
    const selectInversor = (event) => {
        if(event){
          setInvrsorSel(event)
          setInversorID(event.data.ID)
            let valorCorporativa=event.data.INFORMACION_COORPORATIVA
            dispatch({ field: "Investors_first_and_last_names", value: JSON.parse(valorCorporativa)['COMPANY_NAME'] })
            dispatch({ field: "Document", value: JSON.parse(valorCorporativa)['NIT'] })
            dispatch({ field: "Country2", value: event.data.COUNTRY })
            dispatch({ field: "City2", value: event.data.CITY })
        }
      }
    const selectFund = (event) => {
      
        if(event){
          
          setInvrsorSel({})
          setInversorID('')
          setFondoSel(event)
          setFondoID(event.data.I_CODIGO)
            dispatch({ field: "Investment_objective", value: event.data.D_VALOR_FONDO })
            dispatch({ field: "Investment_amount", value: event.data.D_VALOR_INVERTIDO })
            callListInversorInFunds(event.data.I_CODIGO)
        }
      }
      const callApiCreationProjectContact = ()=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
      let valor={
        PERIORICITY_INV_INVERSIONISTA:Perioricity,
        START_DATE_INV_INVERSIONISTA:Start_date,
        FORM_PAYMENT_INV_INVERSIONISTA:Form_of_payment,
        NUMBER_FEES_INV_INVERSIONISTA:Number_of_quotas
      }
      axios.post("/contractinvInversor/"+IdInversor+"/"+IDFondo,valor,bearerToken)
            .then((response) => {
              funcion({
                inverid:response.data.DATA.INVERSIONISTA_I_CODIGO,
                codigo:response.data.DATA.id,
                fondoid:response.data.DATA.FONDO_I_CODIGO
              })
              toast("Created Succes")
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
              callApiUpdateInveContr()
            }else{
              callApiCreationProjectContact()
            }
          }
          const callApiUpdateInveContr = ()=>{
            let bearerToken={
              headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
            }
          let valor={
            PERIORICITY_INV_INVERSIONISTA:Perioricity,
            START_DATE_INV_INVERSIONISTA:Start_date,
            FORM_PAYMENT_INV_INVERSIONISTA:Form_of_payment,
            NUMBER_FEES_INV_INVERSIONISTA:Number_of_quotas
          }
          axios.put("/contractinvInversor/"+Deuda+"/"+IdInversor+"/"+IDFondo,valor,bearerToken)
                .then((response) => {
                  funcion({
                    inverid:IdInversor,
                    codigo:Deuda,
                    fondoid:IDFondo
                  })
                  toast("Created Succes")
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
                  if(Number_of_quotas){
                    if(Investment_objective){
                      let bearerToken={
                        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
                      }
                          axios.get("/revenuemanagementCuotas/"+Perioricity+"/"+Start_date+"/"+Number_of_quotas+"/"+Investment_objective+"/"+Form_of_payment, {},bearerToken)
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
                      toast("Seleccione un Fondo");

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
          if(valorIdFondo){
            
          setTimeout(()=>{
            callListInversorInFunds(valorIdFondo)
            callListFundsWithInvestor()
          })
          callListInversorInFunds(valorIdFondo)
          }
          callListFundsWithInvestor()
        },[valorIdFondo]);
        const [editing, isEditing] = useState(edit);
    return ( 
        <div className="Contract-creation">
            <div className="editing"><span onClick={()=>{isEditing(!editing)}} ><AiFillEdit /></span></div>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_invest.information_proejct}</p>
                    <ul className="Esheet">
                      {
                        editing
                        ?<>
                          <li className="select">
                            <label htmlFor="Fund_to_invest">{language.contract_inver_invest.funt_invest}</label>  
                            <Select isDisabled={isUpdates} value={fondoSelec} options={allFund} onChange={selectFund} />
                          </li>
                        </>
                        :<>
                          <li className="savedInfo">
                            <label>{language.contract_inver_invest.funt_invest}</label>
                            {/* <p>{fondoSelec}</p> */}
                          </li>
                        </>
                      }
                        {
                          editing
                          ?<>
                            <Input  disa={true} label={language.contract_inver_invest.inverment_object} type={`text`} name={`Investment_objective`} value={Investment_objective} placeholder={`Enter`} onChange={onChange} />
                            <SelectVal disa={true} label={language.contract_inver_invest.country} name={`Country1`} value={Country1} placeholder={`select`}  array={[]} onChange={onChange} />
                            <SelectVal  disa={true} label={language.contract_inver_invest.city} name={`City1`} value={City1} placeholder={`select`}  array={[]} onChange={onChange} />
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.inverment_object}</label>
                              <p>{Investment_objective}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.country}</label>
                              <p>{Country1}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.city}</label>
                              <p>{City1}</p>
                            </li>
                          </>
                        }
                    </ul>
                    <ul className="Esheet"> 
                        {
                          editing
                          ?<>
                            <Input  disa={true} label={language.contract_inver_invest.investment_amount} type={`number`} name={`Investment_amount`} value={Investment_amount} placeholder={`$`} onChange={onChange} />
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.investment_amount}</label>
                              <p>{Investment_amount}</p>
                            </li>
                          </>
                        }
                     </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_inver_invest.investorinfo}</p>
                   
                    <ul className="Esheet">
                        {
                          editing
                          ?<>
                            <li className="select">
                              <label htmlFor="Fund_to_invest">{language.contract_inver_invest.inversor}</label>  
                              <Select isDisabled={isUpdates} value={InverSele} options={allInversors} onChange={selectInversor} />
                            </li>
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.inversor}</label>
                              {/* <p>{InverSele}</p> */}
                            </li>
                          </>
                        }
                        {
                          editing
                          ?<>
                            <Input disa={true} label={language.contract_inver_invest.datereque} type={`date`} name={`Date_of_request`} value={Date_of_request} placeholder={`select`}  onChange={onChange} />
                            <Input disa={true} label={language.contract_inver_invest.invertorfirstlast} type={`text`} name={`Investors_first_and_last_names`} value={Investors_first_and_last_names} placeholder={`Enter`} onChange={onChange} />
                            <SelectVal disa={true} label={language.contract_inver_invest.document_type} name={`Type_of_document`} value={Type_of_document} placeholder={`select`} array={[]} onChange={onChange} />
                          </>
                          :<>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.datereque}</label>
                              <p>{Date_of_request}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.invertorfirstlast}</label>
                              <p>{Investors_first_and_last_names}</p>
                            </li>
                            <li className="savedInfo">
                              <label>{language.contract_inver_invest.document_type}</label>
                              <p>{Type_of_document}</p>
                            </li>
                          </>
                        }
                    </ul>
                    <ul className="Esheet">
                      {
                        editing
                        ?<>
                          <Input disa={true} label={language.contract_inver_invest.document} type={`text`} name={`Document`} value={Document} placeholder={`Enter`} onChange={onChange} />
                          <Input disa={true} label={language.contract_inver_invest.country} name={`Country2`} value={Country2} placeholder={`select`}  array={[]} onChange={onChange} />
                          <Input disa={true} label={language.contract_inver_invest.city} name={`City2`} value={City2} placeholder={`select`}  array={[]} onChange={onChange} />
                        </>
                        :<>
                          <li className="savedInfo">
                            <label>{language.contract_inver_invest.document}</label>
                            <p>{Document}</p>
                          </li>
                          <li className="savedInfo">
                            <label>{language.contract_inver_invest.country}</label>
                            <p>{Country2}</p>
                          </li>
                          <li className="savedInfo">
                            <label>{language.contract_inver_invest.city}</label>
                            <p>{City2}</p>
                          </li>
                        </>
                      }
                    </ul>
                </div>
                <div className="inputs-part">
                    <p className="inputsTitle">{language.contract_global.inver_terms}</p>
                    <ul className="Esheet">
                      {
                        editing
                        ?<>
                          <SelectVal  disa={ isUpdates} label={language.contract_global.periocity} name={`Perioricity`} value={Perioricity} placeholder={`select`} array={periooci} onChange={onChange} />
                          <Input  disa={ isUpdates}   label={language.contract_global.start_date} type={`date`} name={`Start_date`} value={Start_date} placeholder={`Enter`} onChange={onChange} />
                          <Input disa={ isUpdates}  label={language.contract_global.form_payment} type={`text`} name={`Form_of_payment`} value={Form_of_payment} placeholder={`Enter`} onChange={onChange} />
                          <SelectVal  disa={ isUpdates} label={language.contract_global.number_fee} name={`Number_of_quotas`} value={Number_of_quotas} placeholder={`select`} array={tarif} onChange={onChange} />
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
                            <p>{Number_of_quotas}</p>
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
                    {isUpdates?<></>:<> <Button text={language.contract_global.create_cont} background={`var(--primary-color)`} types={`button`}  click={opcionBoton} />
                  </>}
                </>
                :<></>
              }
               </div>
        </div>
    )
}

export default ContractCreationInvestor;