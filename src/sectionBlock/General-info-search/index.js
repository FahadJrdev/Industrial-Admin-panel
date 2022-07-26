import React, {useState, useEffect} from 'react';
import './GIS.css';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";

const GeneralInfoSearch = ({language, title,IDS}) => {
    
    const [one] = useState(true);
    const [accountCode,setAccountCode] = useState("");
    const [oppeningDate,setopeningDate] = useState("");
    const [AccountType,setAccountType] = useState("");
    const [Bank,setBank] = useState("");
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [id,setID] = useState("");
    const callBankFileById =(idss)=>{
            let bearerToken={
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
              }
                  axios.get("/bankfileconfiguration/"+idss, {},bearerToken)
                  .then((response) => {
                    if(response.status===200){
                        setAccountCode(response.data.CODE_BANK_FILE)
                        setopeningDate(response.data.created_at)
                        setAccountType(response.data.COMPANY_PAY_CODE_BANK_FILE)
                        setBank(response.data.COMPANY_BANK_FILE)
                        setCountry(response.data.COUNTRY_BANK_FILE)
                        setCity(response.data.CITY_BANK_FILE)
                    }else{
                    
                    }
                  }).catch((err)=>{
                  })
        
       
      }
    useEffect(()=>{
            setID(IDS)
      },[])
      useEffect(()=>{
        callBankFileById(id)
      },[id,setID])
  return (
    <>
        <div className="GIS">
            <p className="GIS-title">{title}</p>
            <ul>
                <li>
                    <label>{language.bankfile_config.account_code}</label>
                    <p>{accountCode}</p>
                </li>
                <li>
                    <label>{language.bankfile_config.oppening}</label>
                    <p>{oppeningDate}</p>
                </li>
                <li>
                    <label>{language.bankfile_config.accounttype}</label>
                    <p>{AccountType}</p>
                </li>
            </ul>
            <ul>
                <li>
                    <label>{language.bankfile_config.bank}</label>
                    <p>{Bank}</p>
                </li>
                <li>
                    <label>{language.bankfile_config.country}</label>
                    <p>{country}</p>
                </li>
                <li>
                    <label>{language.bankfile_config.city}</label>
                    <p>{city}</p>
                </li>
            </ul>
        </div>
    </>
  )
}

export default GeneralInfoSearch;