import React, {useReducer} from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import './project.css';
import { VscChevronDown } from "react-icons/vsc";
const initialState = {
    Code: '',
    Project_name: '',
    Contract_type:'',
    Investment_objective:'',
    Capital_commitments:'',
    USD_Invested:'',
    Country:'',
    City:'',
    Address:'',
    Date_investment:'',
    Approved_investment_amount:'',
    Responsible:'',
    Projected_departure_date:'',
    Description:''
  }
  
  function reducer(state, {field,value}) {
    return {
      ...state,
      [field]: value
    }
  }

const AddProjects = ({title,language}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange =(e)=>{
    dispatch({field: e.target.name, value: e.target.value})
  }
  const {Code,Project_name,Contract_type,Investment_objective,Capital_commitments,USD_Invested,Country,City,Address,Date_investment,Approved_investment_amount,Responsible,Projected_departure_date,Description} =state;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  }
  return (
    <>
    <div className="adding-investor-overlay"></div>
    <div className="adding-investor">
        <div className="investor-add aproject">
            <div className="header-add">
                <ButtonWithArrow text={language.global.back} background={`var(--primary-color)`} />
                <h1>{title}</h1>
            </div>
            <form action="/Projects" method='POST' className='add-project information' onSubmit={handleSubmit}>
                <ul>
                    <li><label htmlFor="Code">{language.projects.code}</label><input type="text" name='Code' value={Code} onChange={onChange} /></li>
                    <li><label htmlFor="Project_name">{language.projects.Project_Name}</label><input type="text" name='Project_name' value={Project_name} placeholder='Project name' onChange={onChange} /></li>
                    <li><label htmlFor="Contact_type">{language.projects.Contract_type}</label><input type="text" name='Contract_type' value={Contract_type} placeholder='$' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li><label htmlFor="Investment_objective">{language.projects.Investment_objective}</label><input type="text" name='Investment_objective' value={Investment_objective} placeholder='Enter' onChange={onChange}/></li>
                    <li><label htmlFor="Capital_commitments">{language.projects.Capital_commitments}</label><input type="text" name='Capital_commitments' value={Capital_commitments} placeholder='$' onChange={onChange} /></li>
                    <li><label htmlFor="USD_Invested">{language.projects.USD_Invested}</label><input type="text" name='USD_Invested' value={USD_Invested} placeholder='$' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li>
                        <label htmlFor="Country">{language.projects.Country}</label>
                        <select className="input_201px" name='Country' value={Country} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="Japan">Japan</option>
                            <option value="USA">USA</option>
                        </select> 
                        <input className='selectInput' type="text" name='Country' placeholder='Select' value={Country} onChange={onChange} /> 
                        <VscChevronDown />
                    </li>
                    <li>
                        <label htmlFor="City">{language.projects.City}</label>
                        <select className="input_201px" name='City' value={City} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Newyork">Newyork</option>
                        </select> 
                        <input className='selectInput' type="text" name='City' placeholder='Select' value={City} onChange={onChange} /> 
                        <VscChevronDown />
                    </li>
                    <li><label htmlFor="Address">{language.projects.Address}</label><input type="text" name='Address' value={Address} placeholder='Enter' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li><label htmlFor="Date_investment">{language.projects.Date_investment}</label><input type="date" name='Date_investment' value={Date_investment} placeholder='MM/DD/YYYY' onChange={onChange} /></li>
                    <li><label htmlFor="Approved_investment_amount">{language.projects.Approved_investment_amount}</label><input type="text" name='Approved_investment_amount' value={Approved_investment_amount} placeholder='$' onChange={onChange} /></li>
                    <li><label htmlFor="Responsible">{language.projects.Responsible}</label><input type="text" name='Responsible' value={Responsible} placeholder='Enter' onChange={onChange} /></li>
                </ul>
                <ul>
                    <li><label htmlFor="Projected_departure_date">{language.projects.Projected_departure_date}</label><input type="date" name='Projected_departure_date' value={Projected_departure_date} placeholder='MM/DD/YYYY' onChange={onChange} /></li>
                    <li><label htmlFor="Description">{language.projects.Description}</label><textarea type="text" name='Description' value={Description} placeholder='Fund Description' onChange={onChange} rows={10} column={30}></textarea></li>
                </ul>
                <Button text={language.global.add} background={`var(--primary-color)`} types={`submit`} />
            </form>
        </div>
    </div>
    </>
  )
}

export default AddProjects;