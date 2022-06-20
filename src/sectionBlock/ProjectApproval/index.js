import React, { useReducer } from 'react';
import { Button, ButtonWithArrow } from '../../component/buttons';
import { DownloadIcon } from '../../component/icon/icon';
import './pa.css';
import { VscChevronDown } from "react-icons/vsc";
const initialState = {
    nitValidate: '',
    Projected_date_of_release: '',
    Project_name: '',
    Code: '',
    Committed_capital: '',
    USD_invested: '',
    Description: '',
    Country: '',
    City: '',
    Responsible: '',
    Type_of_contract: ''
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    }
}
const Approval = ({ title, language }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }
    const { nitValidate, Projected_date_of_release, Project_name, Code, Committed_capital, USD_invested, Description, Country, City, Responsible, Type_of_contract } = state;
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor approval">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div> 
                <form className='approvalForm information' action="" method='POST' onSubmit={handleSubmit}>
                    <div className="approval-body">
                        <ul>
                            <li>
                                <label htmlFor="nitValidate">{ language.projectDetails.approvalNit }</label>
                                <input type="text" name='nitValidate' value={nitValidate} onChange={onChange} placeholder='Enter'/>
                            </li>
                            <li>
                                <label htmlFor="Projected_date_of_release">{ language.projectDetails.approvalprojecdate }</label>
                                <input type="text" name='Projected_date_of_release' value={Projected_date_of_release} onChange={onChange} placeholder='MM/DD/YYYY'/>
                            </li>
                        </ul>
                        <p className='approvalInformationHeader'>{ language.projectDetails.approvalprojecinfor }</p>
                        <ul>
                            <li>
                                <label htmlFor="Project_name">{ language.projectDetails.approvalprojectname }</label>
                                <input type="text" name='Project_name' value={Project_name} onChange={onChange} placeholder='Name'/>
                            </li>
                            <li>
                                <label htmlFor="Code">{ language.projectDetails.approvalcode }</label>
                                <input type="text" name='Code' value={Code} onChange={onChange} placeholder='Enter'/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <label htmlFor="Committed_capital">{ language.projectDetails.approvalcommited }</label>
                                <input type="text" name='Committed_capital' value={Committed_capital} onChange={onChange} placeholder='$'/>
                            </li>
                            <li>
                                <label htmlFor="USD_invested">{ language.projectDetails.approvalinvedusd }</label>
                                <input type="text" name='USD_invested' value={USD_invested} onChange={onChange} placeholder='$'/>
                            </li>
                        </ul>
                        <ul>
                            <li><label htmlFor="Description">{ language.projectDetails.approvalporjectdescrip }</label><textarea type="text" name='Description' value={Description} placeholder='Enter' onChange={onChange} rows={8} column={30}></textarea></li>
                            <ul className='inputSelect'>
                                <li>
                                    <label htmlFor="Country">{ language.projectDetails.approvalcountry }</label>
                                    <select className="input_201px" name='Country' value={Country} onChange={onChange} placeholder='Select'>
                                        <option value=""></option>
                                        <option value="Japan">Japan</option>
                                        <option value="USA">USA</option>
                                    </select> 
                                    <input className='selectInput' type="text" name='Country' placeholder='Select' value={Country} onChange={onChange} /> 
                                    <VscChevronDown />
                                </li>
                                <li>
                                    <label htmlFor="City">{ language.projectDetails.approvalcity }</label>
                                    <select className="input_201px" name='City' value={City} onChange={onChange} placeholder='Select'>
                                        <option value=""></option>
                                        <option value="Tokyo">Tokyo</option>
                                        <option value="Newyork">Newyork</option>
                                    </select> 
                                    <input className='selectInput' type="text" name='City' placeholder='Select' value={City} onChange={onChange} /> 
                                    <VscChevronDown />
                                </li>
                            </ul>
                        </ul>
                        <ul>
                            <li>
                                <label htmlFor="Responsible">{ language.projectDetails.approvalresponsa }</label>
                                <input type="text" name='Responsible' value={Responsible} onChange={onChange} placeholder='Enter'/>
                            </li>
                            <li>
                                <label htmlFor="Type_of_contract">{ language.projectDetails.approvaltipocontr }</label>
                                <input type="text" name='Type_of_contract' value={Type_of_contract} onChange={onChange} placeholder='Enter'/>
                            </li>
                        </ul>
                        <Button text={ language.projectDetails.approvalvalidate } background={`var(--tartiary-color)`} types={`submit`}/>
                        <p className='title'>{ language.projectDetails.approvalconsultationresults }</p> 
                        <button>Download PDF <DownloadIcon /></button>
                    </div>
                </form> 
            </div>
        </div>
        </>
    )
}

export default Approval;