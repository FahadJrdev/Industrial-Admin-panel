import React, {useReducer,useEffect,useState} from 'react';
import { Input, SelectVal,Textarea } from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';
import './PO.css';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const initialState = {
  Code: '',
  Pay_office_status: '',
  Company: '',
  Name: '',
  Total_amount: '',
  Country: '',
  City: '',
  Telephone: '',
  Responsible: '',
  Company_pay_office_code: '',
  Reference1: '',
  Reference2: '',
  Description: ''
}
function reducer(state, { field, value }) {
  return {
      ...state,
      [field]: value
  }
}

const PayOffice = ({language}) => {
  const navigates=useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ciudad,setCiudad] = useState([]);
  
  const [una] = useState('');
  const [countrys,CountrySet] = useState([]);
  const onChange = (e) => {
      dispatch({ field: e.target.name, value: e.target.value })
  }
  const { Code, Pay_office_status, Company, Name, Country,surname, City, Telephone, Responsible, Company_pay_office_code, Reference1, Reference2, Description} = state;
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
  }
  const callApiGetCountry = ()=>{
    let bearerToken={
      headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
    }
    axios.get("/countries", {},bearerToken)
        .then((response) => {
          
          CountrySet( [])
          if(response.status===200){
            if(response.data){
            CountrySet( response.data.map((valor,u)=>{
              return {
                value:valor.I_CODIGO,
                name:valor.C_NOMBRE
              }
            }))
            }
          }
        }).catch((err)=>{
          CountrySet( [])
        })
      }

      const callApiGetCitys = (id,funcon)=>{
        let bearerToken={
          headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
        }
        axios.get("/citys/"+id, {},bearerToken)
            .then((response) => {
              
              funcon( [])
              if(response.status===200){
                if(response.data){
                  funcon( response.data.map((valor,u)=>{
                    return {
                      value:valor.I_CODIGO,
                      name:valor.C_NOMBRE
                    }
                  }))
                }
              }
            }).catch((err)=>{
              funcon( [])
            })
          }
          useEffect(()=>{
            callApiGetCountry()
          },[una])
          useEffect(()=>{
            callApiGetCitys(Country,setCiudad)
          },[Country])
          const callRegisterBank = ()=>{
            let valor={
              CODE_BANK_FILE:Code,
              PAY_OFFICE_BANK_FILE:Pay_office_status,
              COMPANY_BANK_FILE:Company,
              NAME_BANK_FILE:Name,
              APELLIDO_BANK_FILE:surname,
              COUNTRY_BANK_FILE:Country,
              CITY_BANK_FILE:City,
              TELEPHONE_BANK_FILE:Telephone,
              RESPONSIBLE_BANK_FILE:Responsible,
              COMPANY_PAY_CODE_BANK_FILE:Company_pay_office_code,
              REFERENCE_UNO_BANK_FILE:Reference1,
              REFERENCE_DOS_BANK_FILE:Reference2,
              DESCRIPTION_BANK_FILE:Description
            } 
            
            let bearerToken={
                headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
              }
            axios.post("/bankfileconfiguration", valor,bearerToken)
            .then((response) => {
              if(response.status===200){
                if(response.data){
                  toast("Created Succes")
                    navigates("/BankFileConfiguration")
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
  return (
    <>
      <div className="Approval-denal pay-office">
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-part">
              <ul className="Esheet">
                  <Input label={language.bankfile_config.code} type={`text`} name={`Code`} value={Code} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.bankfile_config.payofficestat} type={`text`} name={`Pay_office_status`} value={Pay_office_status} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.bankfile_config.company} type={`text`} name={`Company`} value={Company} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.bankfile_config.name} type={`text`} name={`Name`} value={Name} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Input label={language.bankfile_config.surname} type={`text`} name={`surname`} value={surname} placeholder={`Enter`} onChange={onChange} />
                  <SelectVal label={language.bankfile_config.country}  name={`Country`} value={Country} placeholder={`select`} array={countrys} onChange={onChange} />
                  <SelectVal label={language.bankfile_config.city}  name={`City`} value={City} placeholder={`select`} array={ciudad} onChange={onChange} />
                  <Input label={language.bankfile_config.telef} type={`tel`} name={`Telephone`} value={Telephone} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Input label={language.bankfile_config.respon} type={`text`} name={`Responsible`} value={Responsible} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.bankfile_config.companypay} type={`text`} name={`Company_pay_office_code`} value={Company_pay_office_code} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.bankfile_config.refer+` 1`} type={`text`} name={`Reference1`} value={Reference1} placeholder={`Enter`} onChange={onChange} />
                  <Input label={language.bankfile_config.refer+` 2`} type={`text`} name={`Reference2`} value={Reference2} placeholder={`Enter`} onChange={onChange} />
              </ul>
              <ul className="Esheet">
                  <Textarea label={language.bankfile_config.descrip} name={`Description`} value={Description} cols={20} rows={6} placeholder={`Enter`} onChange={onChange} />
              </ul>
            </div>
            <div className="Esheet-submit">
                <Button text={language.bankfile_config.managepay} background={`var(--primary-color)`} types={`button`} click={callRegisterBank}/>
            </div>
        </form>
      </div>
    </>
  )
}

export default PayOffice;