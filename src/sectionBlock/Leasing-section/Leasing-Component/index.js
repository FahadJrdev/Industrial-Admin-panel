import React from 'react';
import { VscChevronDown } from "react-icons/vsc";
import { Button } from  '../../../component/buttons';
import './component.css';
import LeasingItem from './LeasingItem';
import {ProjectItem,ProjectItem2} from './ProjectItem';
export const Input = ({label,type,name,value,placeholder,onChange,disa}) => {


   const keydown = (event)=>{
        if(type==="number"){
            if(event.keyCode === 69 || event.keyCode === 101){
                event.preventDefault();
                event.stopPropagation();
        
            }
        }
 
   }
    return(
        <li className="input">
            <label htmlFor={name}>{label}</label>

            {disa?<>
            <input type={type} disabled name={name} placeholder={placeholder}  value={value} onChange={onChange} onKeyDown={keydown}/>
            </>:<>
            <input type={type} name={name} placeholder={placeholder}  value={value} onChange={onChange} onKeyDown={keydown}/>
            </>}
        </li>
    )
}
export const SelectVal = ({label,name,value,placeholder,onChange,array,disa}) => {
    return(
        <li className="select">
            <label htmlFor={name}>{label}</label>
            {disa?<>
            <select name={name} value={value} disabled onChange={onChange} placeholder={placeholder}>
                <option value=""></option>
                {array?array.map((itemValor,i)=>{
                    return(
                        <option key={i} value={itemValor.value}>{itemValor.name}</option>
                        )
                }):<></>}
            </select> 
            </>:<>
            <select name={name} value={value} onChange={onChange} placeholder={placeholder}>
                <option value=""></option>
                {array?array.map((itemValor,i)=>{
                    return(
                        <option key={i} value={itemValor.value}>{itemValor.name}</option>
                        )
                }):<></>}
            </select> 
            </>}
                
            <VscChevronDown />
        </li>
    )
}

export const Select = ({label, name, value, placeholder, onChange, value1, value2, value3, value4, value5, hideValue1, hideValue2, hideValue3, hideValue4, hideValue5}) => {
    return(
        <li className={`select`}>
            <label htmlFor={name}>{label}</label>
            <select name={name} value={value} onChange={onChange} placeholder={placeholder}>
                <option value=""></option>
                <option className={`${hideValue1}`} value={`${value1}`}>{value1}</option>
                <option className={`${hideValue2}`} value={`${value2}`}>{value2}</option>
                <option className={`${hideValue3}`} value={`${value3}`}>{value3}</option>
                <option className={`${hideValue4}`} value={`${value4}`}>{value4}</option>
                <option className={`${hideValue5}`} value={`${value5}`}>{value5}</option>
            </select>
            <input className='selectInput' type="text" name={name} placeholder={placeholder} value={value} onChange={onChange}/> 
            <VscChevronDown />
        </li>
    )
}

export const Checkbox = ({label,name,value,onChange}) => {
    return(
        <li className="checkbox">
            <input type="checkbox" name={name} value={value} onChange={onChange}/>
            <label htmlFor={name}>{label}</label>
        </li>
    )
}
export const Radio = ({label,name,value,onChange}) => {
    return(
        <li className="checkbox radio">
            <input type="radio" name={name} value={value} onChange={onChange}/>
            <label htmlFor={name}>{label}</label>
        </li>
    )
}

export const Textarea = ({label,name,value,placeholder,cols,rows,onChange}) => {
    return(
        <li className="textarea">
            <label htmlFor={name}>{label}</label>
            <textarea name={name} value={value} cols={cols} rows={rows} placeholder={placeholder} onChange={onChange}></textarea>
        </li> 
    )
}

export const FinancialHead = ({text, btntext, hideBtn}) => {
    return(    
        <div className="financial-head">
            <p className="header">{text} </p>
            <div className={`${hideBtn}`}>
                <Button text={btntext} background={`var(--tartiary-color)`} />
            </div>
        </div>
    )
}

export const LeasingTable = ({title,LeasingInfo,language}) => {
    
    
    return(
        <div className="leasing-table base">
            <div className="tableTitle"><p>{title}</p></div>
            <div className="tableBody">
                <div className="responsiveFix">
                    <div className="responsiveAuto">
                        {
                            LeasingInfo.map((info,i)=>{
                                return(
                                    <LeasingItem key={i} info={info} language={language} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ManageProjectTable = ({header1, header2, header3, ProjectInfo}) => {
    return(
        <div className="manage-project-table">
            <div className="tableBody">
                <div className="responsiveFix">
                    <div className="responsiveAuto">
                        <ul>
                            <li className="item itemHeader">{header1}</li>
                            <li className="item itemHeader">{header2}</li>
                            <li className="item itemHeader">{header3}</li>
                        </ul>
                        {
                            ProjectInfo.map((Info, i) => {
                                return(
                                    <ProjectItem key={i} Info={Info} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ManageProjectInvestorTable = ({header1, header2, header3,header4, header5, header6, investorInfo}) => {
    return(
        <div className="manage-project-table">
            <div className="tableBody">
                <div className="responsiveFix">
                    <div className="responsiveAuto">
                        <ul>
                            <li className="item itemHeader">{header1}</li>
                            <li className="item itemHeader">{header2}</li>
                            <li className="item itemHeader">{header3}</li>
                            <li className="item itemHeader">{header4}</li>
                            <li className="item itemHeader">{header5}</li>
                            <li className="item itemHeader">{header6}</li>
                        </ul>
                        {
                            investorInfo.map((Info, i) => {
                                return(
                                    <ProjectItem2 key={i} Info={Info} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}