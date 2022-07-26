import React from 'react';
import './GOI.css';
import {InvoiceInfo} from '../../../data/InvestorInfo';
import {InvoiceTable} from '../../../component/table';

const GenerationOfInvoices = ({language}) => {
  return (
    <div className="GenerationOfInvoices">
        <p className="inputsTitle">Periodic generation of invoices</p>
        <InvoiceTable language={language} data={InvoiceInfo} />
    </div>
  )
}

export default GenerationOfInvoices;