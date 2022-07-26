import React from 'react';
import { ButtonWithArrow } from '../../../component/buttons';
import './lp.css';
import { PlanTable } from './planTable';
import { PlanInfo } from './planInfo';
const LeasingParameter = ({ title ,language}) => {
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor plan">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <PlanTable language={language} data={PlanInfo} />
            </div>
        </div>
        </>
    )
}

export default LeasingParameter;