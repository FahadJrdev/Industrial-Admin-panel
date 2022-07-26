import React, {useState, useEffect} from 'react';
import './Fm.css';
import { AiFillEdit } from "react-icons/ai";
import { useReducer } from 'react';
import { Button } from '../../component/buttons';
import axios from "../../api/axios.js";

const initialState = {
    Code: '',
    Name_of_fund:'',
  Description:'',
  Start_date:'',
  Final_date:'',
  Fund_value: '',
  Investment_period:'',
  Period_of_disinvestment:'',
  Invested_value: ''
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const FundInfo = ({datInicial,id,language}) => {
  const [isEditing, setEditing] = useState('no');
  useEffect(()=>{
    console.log(datInicial)
    const editElement = document.querySelector('.FundInfo ul li svg');
    if(editElement){
      editElement.addEventListener('click',()=>{
        setEditing('yes');
      })
    }
    const submitButton = document.querySelector('.FundInfo ul li button');
    if(submitButton){

      submitButton.addEventListener('click',()=>{
        setEditing('no');
      })
    }
  },[])
  
  const [state, dispatch] = useReducer(reducer, datInicial?datInicial:initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const {Code, Name_of_fund, Description, Start_date, Final_date, Fund_value, Investment_period, Period_of_disinvestment, Invested_value} = state;
  const UpdateFunds = ()=>{
    let bearerToken={
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    }
    let valor={
      CODE_FONDO:Code,
      C_NOMBRE:Name_of_fund,
      C_DESCRIPCION:Description,
      D_VALOR_FONDO:Fund_value,
      I_PERIODO_INVERSION:Investment_period,
      I_PERIODO_DESINVERSION:Period_of_disinvestment,
      D_VALOR_INVERTIDO:Invested_value,
      F_FECHA_INICIO:Start_date,
      F_FECHA_FINAL:Final_date
    } 
    
        axios.put("/funds/"+id, valor,bearerToken)
        .then((response) => {
          
          if(response.status===200){
            window.location.reload()
          }else{
            window.location.reload()
          
          }
        }).catch((err)=>{
          window.location.reload()
        })
  
  }
  return (
    <>
      <form action="" method='POST' className='FundInfo'>
        <ul>
          <li style={{order: 2}}>
            <label htmlFor="Code">{language.funds.code}</label>
            {
              isEditing==='no'
              ?<p>{Code}</p>
              :<input type="text" name='Code'  value={Code} onChange={onChange} />
            }
          </li>
          <li style={{order: 3}}>
            <label htmlFor="Name_of_fund">{language.funds.namefund}</label>
            {
              isEditing ==='no'
              ?<p>{Name_of_fund} </p>
              :<input type="text" name='Name_of_fund' value={Name_of_fund} onChange={onChange} />
            }
          </li>
          <li style={{order: 4}}>
            <label htmlFor="Description">{language.funds.description}</label>
            {
              isEditing ==='no'
              ?<p>{Description}  </p>
              :<input type="text" name='Description' value={Description} onChange={onChange} />
            }
          </li>
          <li style={{order: 5}}>
            <AiFillEdit />
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="Start_date">{language.funds.startdate}</label>
            {
              isEditing==='no'
              ?<p>{Start_date}</p>
              :<input type="date" name='Start_date' value={Start_date} onChange={onChange} />
            }
          </li>
          <li>
            <label htmlFor="Final_date">{language.funds.finaldate}</label>
            {
              isEditing === 'no'
              ?<p>{Final_date}</p>
              :<input type="date" name='Final_date' value={Final_date} onChange={onChange} />
            }
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="Fund_value">{language.funds.fundval}</label>
            {
              isEditing==='no'
              ?<p>{Fund_value}</p>
              :<input type="text" name='Fund_value'  value={Fund_value} onChange={onChange} />
            }
          </li>
          <li>
            <label htmlFor="Investment_period">{language.funds.investperio}</label>
            {
              isEditing==='no'
              ?<p>{Investment_period}</p>
              :<input type="date" name='Investment_period' value={Investment_period} onChange={onChange} />
            }
          </li>
          <li>
            <label htmlFor="Period_of_disinvestment">{language.funds.perioddeinves}</label>
            {
              isEditing==='no'
              ?<p>{Period_of_disinvestment}</p>
              :<input type="date" name='Period_of_disinvestment'  value={Period_of_disinvestment} onChange={onChange} />
            }
          </li>
          <li>
            <label htmlFor="Invested_value">{language.funds.investedval}</label>
            {
              isEditing==='no'
              ?<p>{Invested_value}</p>
              :<input type="text" name='Invested_value'  value={Invested_value} onChange={onChange} />
            }
          </li>
        </ul>
        <div className="submit-button">
          {
            isEditing==='no'
            ?<></>
            :<Button text={language.global.save} background={`var(--primary-color)`} types={`button`} click={UpdateFunds} />
          }
        </div>
      </form>
    </>
  )
}

export default FundInfo;