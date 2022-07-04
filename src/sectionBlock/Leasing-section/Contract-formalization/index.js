import React from 'react';
import './CF.css';
import { FinancialHead } from '../Leasing-Component';
import {Button} from '../../../component/buttons';

const ContractFormalization = ({language}) => {
  return (
    <>
      <div className="Contract-formalization">
        <FinancialHead text={`Sign contract and attach`} hideBtn={`dn`} />
        <div className="Esheet-submit">
            <Button text={`Download contract`} background={`var(--tartiary-color)`} types={`submit`} />
        </div>
      </div>
    </>
  )
}

export default ContractFormalization;