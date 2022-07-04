import React from 'react';
import { FinancialHead } from '../Leasing-section/Leasing-Component';
import {Button} from '../../component/buttons';

const ContractFormalizationInvestor = ({language}) => {
  return (
    <div className="ContractFormalization">
      <div className="Contract-formalization">
        <FinancialHead text={`Sign contract and attach`} hideBtn={`dn`} />
        <div className="Esheet-submit">
            <Button text={`Download contract`} background={`var(--tartiary-color)`} types={`submit`} />
        </div>
      </div>
      <div className="Esheet-submit">
          <Button text={`Send`}  background={`var(--primary-color)`} types={`button`}/>
      </div>
    </div>
  )
}

export default ContractFormalizationInvestor;