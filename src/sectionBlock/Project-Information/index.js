import React, {useState, useEffect} from 'react';
import './PI.css';
import { AiFillEdit } from "react-icons/ai";
import { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { VscChevronDown } from "react-icons/vsc";

const initialState = {
  Code: 'Code',
  Project_name:'Project name',
  Description:'Description',
  Contract_type:'Contract type',
  Investment_objective:'Investment objective',
  Capital_commitments: 'Capital commitments',
  USD_Invested:'USD Invested',
  Investment_period:'Investment period',
  Project_status: 'Project status',
  Country: 'Country',
  City: 'City',
  Address: 'Address',
  Date_investment: 'Date investment',
  Approved_investment_amount: 'Approved investment amount',
  Responsible: 'Responsible',
  Projected_departure_date: 'Projected departure date'
}

function reducer(state, {field,value}) {
  return {
    ...state,
    [field]: value
  }
}

const ProjectInfo = ({title,language}) => {
  const [isEditing, setEditing] = useState('no');
  useEffect(()=>{
    const editElement = document.querySelector('.ProjectInfo ul li svg');
    if(editElement){
      editElement.addEventListener('click',()=>{
        setEditing('yes');
      })
    }
    const submitButton = document.querySelector('.ProjectInfo ul li button');
    if(submitButton){
        submitButton.addEventListener('click',()=>{
            setEditing('no');
        })
    }
  },[])
  
  const [state, dispatch] = useReducer(reducer,initialState);
  const onChange =(e)=>{
      dispatch({field: e.target.name, value: e.target.value})
  }
  const {Code, Project_name, Description, Contract_type, Investment_objective, Capital_commitments, USD_Invested, Investment_period, Project_status, Country, City, Address, Date_investment, Approved_investment_amount, Responsible, Projected_departure_date} = state;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  }
  return (
    <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor PI">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { `Back` }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form action="" method='POST' className='ProjectInfo information'  onSubmit={handleSubmit}>
                    <ul>
                    <li style={{order: 2}}>
                        <label htmlFor="Code">Code</label>
                        {
                        isEditing==='no'
                        ?<p>{Code}</p>
                        :<input type="text" name='Code'  value={Code} placeholder='Code' onChange={onChange} />
                        }
                    </li>
                    <li style={{order: 3}}>
                        <label htmlFor="Project_name">Project name</label>
                        {
                        isEditing ==='no'
                        ?<p>{Project_name}</p>
                        :<input type="text" name='Project_name' value={Project_name} placeholder='Project name' onChange={onChange} />
                        }
                    </li>
                    <li  style={{order: 4}}>
                        <label htmlFor="Description">Description</label>
                        {
                        isEditing ==='no'
                        ?<p>{Description}  </p>
                        :<textarea type="text" name='Description' value={Description} onChange={onChange} placeholder='Description' row='8' column='25'></textarea>
                        }
                    </li>
                    <li  style={{order: 5}}>
                        <AiFillEdit />
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Contract_type">Contract type</label>
                        {
                        isEditing==='no'
                        ?<p>{Contract_type}</p>
                        :<>
                        <select className="input_201px" name='Contract_type' value={Contract_type} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Contract_type' placeholder='Select' value={Contract_type} onChange={onChange} /> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    <li>
                        <label htmlFor="Investment_objective">Investment objective</label>
                        {
                        isEditing === 'no'
                        ?<p>{Investment_objective}</p>
                        :<input type="text" name='Investment_objective' value={Investment_objective} placeholder='Enter' onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Capital_commitments">Capital commitments</label>
                        {
                        isEditing==='no'
                        ?<p>{Capital_commitments}</p>
                        :<input type="text" name='Capital_commitments'  value={Capital_commitments} placeholder="$" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="USD_Invested">USD Invested</label>
                        {
                        isEditing==='no'
                        ?<p>{USD_Invested}</p>
                        :<input type="text" name='USD_Invested' value={USD_Invested} placeholder="$" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Investment_period">Investment period</label>
                        {
                        isEditing==='no'
                        ?<p>{Investment_period}</p>
                        :<input type="text" name='Investment_period'  value={Investment_period} placeholder="Enter" onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Project_status">Project status</label>
                        {
                        isEditing==='no'
                        ?<p>{Project_status}</p>
                        :<>
                        <select className="input_201px" name='Project_status' value={Project_status} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="Status 1">Status 1</option>
                            <option value="Status 2">Status 2</option>
                        </select> 
                        <input className='selectInput' type="text" name='Project_status' placeholder='Select' value={Project_status} onChange={onChange} /> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    <li>
                        <label htmlFor="Country">Country</label>
                        {
                        isEditing==='no'
                        ?<p>{Country}</p>
                        :<>
                        <select className="input_201px" name='Country' value={Country} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="Japan">Japan</option>
                            <option value="USA">USA</option>
                        </select> 
                        <input className='selectInput' type="text" name='Country' placeholder='Select' value={Country} onChange={onChange} /> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    <li>
                        <label htmlFor="City">City</label>
                        {
                        isEditing==='no'
                        ?<p>{City}</p>
                        :<>
                        <select className="input_201px" name='City' value={City} onChange={onChange} placeholder='Select'>
                            <option value=""></option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="NewYork">NewYork</option>
                        </select> 
                        <input className='selectInput' type="text" name='City' placeholder='Select' value={City} onChange={onChange} /> 
                        <VscChevronDown />
                        </>
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Address">Address</label>
                        {
                        isEditing==='no'
                        ?<p>{Address}</p>
                        :<input type="text" name='Address'  value={Address} placeholder="Enter" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Date_investment">Date investment</label>
                        {
                        isEditing==='no'
                        ?<p>{Date_investment}</p>
                        :<input type="text" name='Date_investment' value={Date_investment} placeholder="MM/DD/YYYY" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Approved_investment_amount">Approved investment amount</label>
                        {
                        isEditing==='no'
                        ?<p>{Approved_investment_amount}</p>
                        :<input type="text" name='Approved_investment_amount'  value={Approved_investment_amount} placeholder="$" onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <ul>
                    <li>
                        <label htmlFor="Responsible">Responsible</label>
                        {
                        isEditing==='no'
                        ?<p>{Responsible}</p>
                        :<input type="text" name='Responsible'  value={Responsible} placeholder="Enter" onChange={onChange} />
                        }
                    </li>
                    <li>
                        <label htmlFor="Projected_departure_date">Projected departure date</label>
                        {
                        isEditing==='no'
                        ?<p>{Projected_departure_date}</p>
                        :<input type="text" name='Projected_departure_date' value={Projected_departure_date} placeholder="MM/DD/YYYY" onChange={onChange} />
                        }
                    </li>
                    </ul>
                    <div className="submit-button">
                    {
                        isEditing==='no'
                        ?<></>
                        :<Button text={language.global.save} background={`var(--primary-color)`} types={`submit`} />
                    }
                    </div>
                    <div className='register'><Button text={`Register project owners`} background={`var(--primary-color)`} types={`button`} /></div>
                </form>
            </div>
        </div>
    </>
  )
}

export default ProjectInfo;