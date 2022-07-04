import React from 'react';
import { ButtonWithArrow } from '../../component/buttons';
import './Iplan.css';
import { PlanInfo } from './PlanInfo';
import InvestorPlanTable from './InvestorPlanTable';

const InvestorPlan = ({ title ,language}) => {
    return ( <>
        <div className = "adding-investor-overlay"></div> 
        <div className = "adding-investor investorPlan">
            <div className = "investor-add">
                <div className = "header-add">
                    <ButtonWithArrow text = { language.global.back }background = { `var(--primary-color)` }/> 
                    <h1>{title}</h1>
                </div>
                <div className="investorPlanTable">
                    <div className="responsiveFix">
                        <div className="responsiveAuto">
                            {
                                PlanInfo.map((info, i)=>{
                                    return(
                                        <InvestorPlanTable
                                        key={i}
                                        info={info}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default InvestorPlan;