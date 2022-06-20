import React, {useReducer} from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './createFund.css';
import axios from "../../api/axios.js";
import {toast} from "react-toastify";
const initialState = {
    Code: '',
    Name_of_fund: '',
    Description:'',
    Start_date:'',
    Final_date:'',
    Fund_value:'',
    Investment_period:'',
    Period_of_disinvestment:'',
    Invested_value:''
  }
  
  function reducer(state, {field,value}) {
    return {
      ...state,
      [field]: value
    }
  }

const CreateFund = ({title,language}) => {

  const CallRegisterApiFunds = ()=>{
    let valor={
      C_NOMBRE:Name_of_fund,
      C_DESCRIPCION:Description,
      D_VALOR_FONDO:Fund_value,
      I_PERIODO_INVERSION:Investment_period,
      I_PERIODO_DESINVERSION:Period_of_disinvestment,
      D_VALOR_INVERTIDO:Invested_value,
      F_FECHA_INICIO:Start_date,
      F_FECHA_FINAL:Final_date
    } 
    
    let bearerToken={
        headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` }
      }
    axios.post("/funds", valor,bearerToken)
    .then((response) => {
      if(response.status===200){
        if(response.data){
            const backButton = document.querySelector('.investor-add .header-add button');
            backButton.click()
        }
      }
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange =(e)=>{
    dispatch({field: e.target.name, value: e.target.value})
  }
  const {Code,Name_of_fund,Description,Start_date,Final_date,Fund_value,Investment_period,Period_of_disinvestment,Invested_value} =state;
  return (
    <>
    <div className="adding-investor-overlay"></div>
    <div className="adding-investor">
        <div className="investor-add cfund">
            <div className="header-add">
                <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} />
                <h1>{title}</h1>
            </div>
            <form action="" method='post' className='create-fund'>
                <ul>
                    <li><label htmlFor="Code">{language.funds.code}</label><input type="text" name='Code' value={Code} onChange={onChange} /></li>
                    <li><label htmlFor="Name_of_fund">{language.funds.namefund}</label><input type="text" name='Name_of_fund' value={Name_of_fund} placeholder='Fund 3' onChange={onChange} /></li>
                    <li><label htmlFor="Description">{language.funds.description}</label><textarea type="text" name='Description' value={Description} placeholder='Brief' onChange={onChange} rows={10} column={30}></textarea></li>
                </ul>
                <ul className='positioned_input'>
                    <li className='dateInput'><label htmlFor="Start_date">{language.funds.startdate}</label><input type="date" name='Start_date' value={Start_date} placeholder='DD/MM/YYYY' onChange={onChange} /></li>
                    <li className='dateInput'><label htmlFor="Final_date">{language.funds.finaldate}</label><input type="date" name='Final_date' value={Final_date} placeholder='DD/MM/YYYY' onChange={onChange} /></li>
                </ul>
                <ul className='lastUl'>
                    <li><label htmlFor="Fund_value">{language.funds.fundval}</label><input type="text" name='Fund_value' value={Fund_value} placeholder='$' onChange={onChange}/></li>
                    <li className='dateInput'><label htmlFor="Investment_period">{language.funds.investperio}</label><input type="date" name='Investment_period' value={Investment_period} placeholder='Enter' onChange={onChange} /></li>
                    <li className='dateInput'><label htmlFor="Period_of_disinvestment">{language.funds.perioddeinves}</label><input type="date" name='Period_of_disinvestment' value={Period_of_disinvestment} placeholder='Enter' onChange={onChange} /></li>
                    <li><label htmlFor="Invested_value">{language.funds.investedval}</label><input type="text" name='Invested_value' value={Invested_value} placeholder='$' onChange={onChange} /></li>
                </ul>
                <Button text={language.global.add} background={`var(--primary-color)`} types={`button`} click={CallRegisterApiFunds} />
            </form>
        </div>
    </div>
    </>
  )
}

export default CreateFund;