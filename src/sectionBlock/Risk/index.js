import React from 'react';
import {Button} from '../../component/buttons';
import {RiskTable} from '../../component/table';
import './risk.css';

const Risk = ({language,data,refresh}) => {
  return (
    <div className="risk">
        <div className="add-risk">
            <Button text={language.global.add} background={`var(--tartiary-color)`} />
        </div>
        <div className="riskTable">
            <RiskTable header1={language.projectDetails.risk_data} header2={language.projectDetails.risk_description}  header3={language.global.actions} data={data} refreshs={refresh} language={language} />
        </div>
    </div>
  )
}

export default Risk;